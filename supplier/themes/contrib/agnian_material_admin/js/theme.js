var DOMReady = function(a, b, c) {b=document, c='addEventListener'; b[c]?b[c]('DOMContentLoaded', a):window.attachEvent('onload', a)},
 EventHandler = window.EventHandler || {
  bind: function(el, e, fn, useCapture) {
      // modern browsers including IE9+
      if(window.addEventListener) el.addEventListener(e, fn, !!useCapture);
      // IE8 and below
      else if(window.attachEvent) el.attachEvent('on' + e, function(e) { return fn.apply(el, arguments); });
      // traditional fallback
      else el['on' + e] = fn;
  },
  unbind: function(el, e, fn, useCapture) {
      // modern browsers including IE9+
      if(window.removeEventListener) el.removeEventListener(e, fn, !!useCapture);
      // IE8 and below
      else if(window.detachEvent) el.detachEvent('on' + e, fn);
      // traditional fallback
      else elem['on' + e] = null;
  },
  stop: function(e) {
      e = e || window.event;
      e.cancelBubble = true;// IE8
      if(e.stopPropagation) e.stopPropagation();
  },
  delegatedBind: function(el, e, selector, fn, useCapture) {
      var handler = function(ev) {
          var args = arguments;
          [].some.call(document.body.querySelectorAll(selector), function(elem, idx, arr) {
              if(ev.target == elem) {
                  fn.apply(elem, args);
                  // if desired element is found, we need to break the loop
                  // so we use "some" with "return true;" (for break) instead of forEach.
                  return true;
              }
          });
      };
      // modern browsers including IE9+
      if(window.addEventListener) el.addEventListener(e, handler, !!useCapture);
      // IE8 and below
      else if(window.attachEvent) el.attachEvent('on' + e, handler);
      // traditional fallback
      else el['on' + e] = handler;
  }
},
timers = {};// a stack for identifying the last event

// function for choosing only the last event
function waitForFinalEvent(callback, ms, uniqueId) {
	if(!uniqueId) uniqueId = "Don't call this twice without a uniqueId";
	if(timers[uniqueId]) clearTimeout(timers[uniqueId]);
	timers[uniqueId] = setTimeout(callback, ms);
}

// check if the element is in viewport
function isInViewport(el, visibleHgtInPrc) {
	if(jQuery != undefined && el instanceof jQuery) el = el[0];
	var rect = el.getBoundingClientRect(),
	extraHeight = 0;
	if(visibleHgtInPrc) extraHeight = el.offsetHeight*(100-visibleHgtInPrc)/100; // this is the extra height which will be added to viewport to make element partially visible in viewport
	return (rect.top >= (0-extraHeight) && rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) + extraHeight) /*or $(window).height() */ &&
		rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ );
};

DOMReady(function() {
    var overlay = document.getElementById('overlay'),
        add_btn = document.getElementById('content-add-btn'),
        add_content_cont = document.getElementById('node-types-list-cont');

    if(add_content_cont) {
        var window_scroll_Y = 0;
        EventHandler.bind(add_content_cont.getElementsByClassName('close-btn')[0], 'click', function(e) {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.display = 'inherit';
            add_content_cont.classList.remove('actv');
            window.scrollTo(0, window_scroll_Y);
        });
		EventHandler.bind(overlay, 'click', function(e) {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.display = 'inherit';
            add_content_cont.classList.remove('actv');
            window.scrollTo(0, window_scroll_Y);
        });

   EventHandler.bind(add_btn, 'click', function(e) {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.display = 'block';
            add_content_cont.classList.add('actv');
            window_scroll_Y = window.scrollY;
            window.scrollTo(0, 0);
        });
		
	/*	EventHandler.bind(window, 'scroll', function(e) {
			waitForFinalEvent(function(e) {
				if(isInViewport(add_content_cont, -1)) {
					add_btn.style.display = 'none';
				}
				else add_btn.style.display = 'block';
			}, 100, 'toggle_add_btn');
		}); */      
  jQuery(window).scroll(function() {
      if (jQuery(window).scrollTop() > 150) {
         add_btn.style.display = 'block';
    }
   else {
         add_btn.style.display = 'none';
    }
  });     
}
	var buttons = document.getElementsByClassName("field-add-more-submit");
		for(var i=0; i < buttons.length; i++) {
			if (buttons[i].parentElement.classList.contains("paragraphs-dropbutton-wrapper")) {				
				buttons[i].parentElement.classList.add("new-btn");
			}
		}
	jQuery(document).ajaxComplete(function() {
		var buttons = document.getElementsByClassName("field-add-more-submit");
		for(var i=0; i < buttons.length; i++) {
			if (buttons[i].parentElement.classList.contains("paragraphs-dropbutton-wrapper")) {				
				buttons[i].parentElement.classList.add("new-btn");
			}
		}
	});
	var buttons = document.getElementsByClassName("field-add-more-submit");
		for(var i=0; i < buttons.length; i++) {
			if (buttons[i].parentElement.classList.contains("clearfix")) {				
				buttons[i].parentElement.classList.add("new-btn1");
			}
		}
	jQuery(document).ajaxComplete(function() {
		var buttons = document.getElementsByClassName("field-add-more-submit");
		for(var i=0; i < buttons.length; i++) {
			if (buttons[i].parentElement.classList.contains("clearfix")) {				
				buttons[i].parentElement.classList.add("new-btn1");
			}
		}
	});
});

 /* adding color focus line why input is focused */ 
function doline() {     
   jQuery( '.form-text, .form-url, .form-search, .form-textarea, .form-email' ).focusin(function() {
    jQuery(this).after('<div class="focus-line"></div>'); 
     jQuery(this).css({'margin-bottom' : '1px'});
       var width = jQuery(this).width();
       var parentWidth =  20 ;
       jQuery('.focus-line').animate({ 'width': width + parentWidth + 'px', 'left':'0' }, 300);       
    })   
  .blur(function() {      
     jQuery('.focus-line').animate({'width':'10px', 'left':'45%'}, 300,function(){      
       jQuery(this).siblings('.form-text').css({'margin-bottom' : '1px'});
       jQuery(this).remove();
       
     });      
   });   
};

jQuery(document).ready(doline);
jQuery(document).ajaxComplete(doline);

// Tabs styling
Drupal.behaviors.epf = {
  attach: function (context, settings) { 
    jQuery(document).ready(function(){
     var big_carousel_options = {
            items: 1,
            nav: true,
            navText: false,
            dots: false,
            lazyLoad: true,
            onInitialized: function() {
                var carousel = this.$element,
                first = this._items[0],
                last = this._items[this._items.length-1],
                arr_prev = carousel.find('.owl-prev'),
                arr_next = carousel.find('.owl-next');  

              if(first.hasClass('active')) arr_prev.addClass('disabled');
              if(last.hasClass('active')) arr_next.addClass('disabled');
                },
            onResized: function() {
                var carousel = this.$element,
                    first = this._items[0],
                    last = this._items[this._items.length-1],
                    arr_prev = carousel.find('.owl-prev'),
                    arr_next = carousel.find('.owl-next');

                if(first.hasClass('active')) arr_prev.addClass('disabled');
                else arr_prev.removeClass('disabled');

                if(last.hasClass('active')) arr_next.addClass('disabled');
                else arr_next.removeClass('disabled');
            },
           onTranslated: function() {
              var carousel = this.$element,
                  first = this._items[0],
                  last = this._items[this._items.length-1],
                  arr_prev = carousel.find('.owl-prev').removeClass('disabled'),
                  arr_next = carousel.find('.owl-next').removeClass('disabled');

              if(first.hasClass('active')) arr_prev.addClass('disabled');
              if(last.hasClass('active')) arr_next.addClass('disabled');
           }
        },
     items_to_responsive_mapping = {
            1: {
                0: {items: 1}
            },
            2: {
                0: {items: 1},
                620: {items: 2, margin: 20}
            },
            3: {
                0: {items: 1},
                620: {items: 2, margin: 33},
                768: {items: 3, margin: 33}
            },
            4: {
                0: {items: 1},
                620: {items: 2, margin: 33},
                768: {items: 3, margin: 33},
                1200: {items: 4, margin: 33}
            },
            5: {
                0: {items: 2,  margin: 0, nav: true},
                480: {items: 2,  margin: 10},
                620: {items: 3,  margin :10},
                768: {items: 4, margin: 10},
                1220: {items: 6,  margin : 0, nav : false }
            }
   }; 

  jQuery('nav.tabs').once('tabs').each( function(idx, el) {

     /* count each tabs length and add class to a*/ 
    var tabs = jQuery('nav.tabs').find('nav.is-horizontal').find('li').children('a');      
     tabs.each(function(){ 
                 
         /* add class to a , depends on width */
         var thisjq = jQuery(this);
         if (thisjq.clone().children().remove().end().text().length < 14){

         } else if (thisjq.clone().children().remove().end().text().length < 18 ){
           jQuery(this).addClass('textwrp');

         } else if (thisjq.clone().children().remove().end().text().length >= 18){
            jQuery(this).addClass('textover');           
        };
       
       /* add width to li equal to child a, it is for Safari */
         var a_width = jQuery(this).outerWidth( true);
         jQuery(this).parents('li').css({'width' : a_width + 'px' }); 
       
     });
    
    /* count total li width */
    var width = 0;
    var second_width = 0;
    jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').find('li').each(function() {                      
        width += jQuery(this).width(); 
     });
    
   jQuery('nav.tabs').find('nav.is-horizontal').eq(1).find('ul.tabs').find('li').each(function() {         
        second_width += jQuery(this).width(); 
    }); 
    
   //jQuery('body').append('<p>Width:' + width + '</p>');   
   
  /* Secondary tabs */  
  if(jQuery('nav.tabs').children('nav.is-horizontal').eq(1).length > 0){
      jQuery('nav.tabs').find('nav.is-horizontal:first').find('li.is-active').before('<div class="visible-tab"></div>');
      jQuery('nav.tabs').find('nav.is-horizontal:first').find('li.is-active a').addClass('onetab');
      jQuery('nav.tabs').find('nav.is-horizontal:first').find('li.is-active') .css({'display' : 'inline-block'}); 
      jQuery('nav.tabs').find('nav.is-horizontal:first').find("li:not('.is-active')").hide();
      jQuery('nav.tabs').find('nav.is-horizontal:first').find('.visible-tab').parent('ul.tabs').addClass('removehr');
    
      if(second_width > jQuery('nav.tabs').find('nav.is-horizontal').eq(1).find('ul.tabs').width() ){
        jQuery('nav.tabs').find('nav.is-horizontal').eq(1).find('ul.tabs').each(function(idx, el) {
           el = jQuery(el);
           jQuery.extend(big_carousel_options, {  nav : true, margin: 10, responsive: items_to_responsive_mapping[5] });
           el.owlCarousel(big_carousel_options);
          });
      };
      /* show first tab */
     jQuery('nav.tabs').find('nav.is-horizontal:first').find('.visible-tab').click(function(){
        jQuery('nav.tabs').find('nav.is-horizontal:first').find('li').show();
        jQuery('nav.tabs').find('nav.is-horizontal:first').find('.visible-tab').parent('ul.tabs').removeClass('removehr');
        jQuery('nav.tabs').find('nav.is-horizontal:first').find('.visible-tab').remove();
        jQuery('nav.tabs').find('nav.is-horizontal').eq(1).hide();           
        jQuery('nav.tabs').find('nav.is-horizontal:first').find('li.is-active a').removeClass('onetab');
        jQuery('nav.tabs').find('nav.is-horizontal:first').find('li.is-active') .css({'display' : 'inline-block'});

       if(width > jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').width() ){
          jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').find('li').css({'display' : 'block', margin : '0 auto'});
          jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').each(function(idx, el) {
             el = jQuery(el);
             jQuery.extend(big_carousel_options, {  nav : true, margin: 10, responsive: items_to_responsive_mapping[5] });
             el.owlCarousel(big_carousel_options);      
          });
         };
      });
    };
    
  /* Carousel for first tabs */  
  if(jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').find("li:not('.is-active')").is(':visible') ){ 
     if(width > jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').width() ){
      jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').find('li').css({'display' : 'block', margin : '0 auto'});
       jQuery('nav.tabs').find('nav.is-horizontal:first').find('ul.tabs').each(function(idx, el) {
           el = jQuery(el);
           jQuery.extend(big_carousel_options, {  nav : true, margin: 10, responsive: items_to_responsive_mapping[5] });
            el.owlCarousel(big_carousel_options);      
       });
      }
    };      
   }); 
  }); 
 }
}; 

// contnet page , more button  on overlay
jQuery('#node-types-list-cont').once('content-page').each( function(idx, el) {
       var div_body = jQuery('.holder').find('.node-types-list');         
       if(div_body.height() >= 30) {          
					var info_cont = jQuery('.holder').find('.region-content'),
						info_btn = jQuery('.holder').find('.more-btn'),
						info_btn_text;
				
					info_btn.on('click', function(e) {						
					jQuery(this).siblings('.node-types-list').toggleClass('cut');
					info_btn_text = jQuery(this).text();
					jQuery(this).text(info_btn.attr('data-text')).attr('data-text', info_btn_text).toggleClass('less');
            if(jQuery(this).hasClass('less')){
               jQuery(this).parents('.actv').css({'overflow-y' : 'scroll'});
            }else{
              jQuery(this).parents('.actv').css({'overflow-y' : 'visible'});
            }
				});					
		  };  
   if(div_body.children('li').length < 1 ) {
         div_body.closest('#node-types-list-cont').hide();
     
      } else if(div_body.children('li').length <= 6 ) {
           div_body.siblings('.more-btn').hide();           
           div_body.closest('#node-types-list-cont').css({'margin-top' : '0'});
      }
   });

 function doStuff(){   
   /* Select buttons style */
   jQuery('.form-type-checkbox').find('input.form-checkbox:checked').parent('.form-type-checkbox').addClass('checkboxed');
   jQuery('.form-type-checkbox').find('input[disabled="disabled"].form-checkbox').closest('.form-type-checkbox').addClass('dischbox');          
   jQuery('.form-type-checkbox').change(function() {
    if(jQuery('.form-type-checkbox').children('input.form-checkbox:checked')){
          jQuery(this).closest('.form-type-checkbox').toggleClass('checkboxed');
      }
    });   
  
  /* Radio buttons style */
 jQuery('.form-radios').find('input:checked').closest('.form-type-radio').addClass('radioboxed');
  jQuery('.form-radios').find('input[disabled="disabled"]').closest('.form-type-radio').addClass('disradio');          
  jQuery('.form-radios').find('.form-type-radio').click(function() {
     if(jQuery(this).find('input[type="radio"]').is(':checked')){           
           jQuery(this).closest('.form-radios').find('.form-type-radio').removeClass('radioboxed');
           jQuery(this).closest('.form-type-radio').addClass('radioboxed');            
      }     
    });
   
  /* Collapse on paragraphs */
  jQuery('.field--name-field-paragraphs').find('.field-label').once('paragraph-slide').each( function(idx, el){     
    if(jQuery(this).closest('table').find('.paragraph-type-top').length > 0){    
      if(!jQuery(this).closest('table').hasClass('collapsed')){
          jQuery(this).append('<span  class="expand">(collapse all)</span>');
        } 
      }else{
         jQuery(this).closest('table').addClass('inline-table');
      }    
    });     
   
  jQuery('.field--name-field-paragraphs').find('table').not('.inline-table').find('input[type="text"]').keyup(function() {
      var value = jQuery(this).val();
      jQuery(this).attr('value', value );
   });
   
  };

jQuery(document).ready(doStuff);
jQuery(document).ajaxComplete(doStuff);

jQuery(document).ready(function(){  
  jQuery('.permissions thead th.checkbox').click(function() {
    jQuery(this).toggleClass('checkboxed');
      var tdindex=jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')');    
    
     jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')').children('.form-type-checkbox').removeClass('checkboxed');
    
     jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')').children('.form-type-checkbox').find('input.form-checkbox').prop('checked', false);
        
     jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')').children('.form-type-checkbox').toggleClass('checkboxed');
    
     jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')').children('.form-type-checkbox').find('input.form-checkbox').prop('checked', true);
     
    if(!jQuery(this).hasClass('checkboxed')){
         jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')').find('input.form-checkbox:not(:disabled)').closest('.form-type-checkbox').removeClass('checkboxed');
      
        jQuery('.permissions tbody td.checkbox:nth-child(' + (jQuery(this).index() + 1) + ')').children('.form-type-checkbox').find('input.form-checkbox:not(:disabled)').prop('checked', false);
       }   
   });
  
   /* Dropbuttons on paragraphs */   
 jQuery('.field--name-field-paragraphs').find('.dropbutton').find('.dropbutton-action').once('paragraph-page').each( function(idx, el){
    if(jQuery(this).children('input').length < 1){
        jQuery(this).hide();
    }else{
      jQuery(this).show();
    } 
   });   
   /* Collapse on paragraphs */
  jQuery('.field--name-field-paragraphs').on('click', '.paragraph-type-title', function(e){
      e.preventDefault();
      if(!jQuery(this).parent('.paragraph-type-top').hasClass('collapsed')){
        jQuery(this).parent('.paragraph-type-top').addClass('collapsed');
        jQuery(this).parent('.paragraph-type-top').closest('td').find('.paragraphs-subform').find('input[type="text"]:not([value=""]):first').addClass('open-text');
       
        jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('table').not('.inline-table').addClass('collapsed');
        jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('table').not('.inline-table').children('thead').find('.field-label').find('.expand').remove();
        jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('table').not('.inline-table').children('thead').find('.field-label').append('<span  class="expand">(expand all)</span>');
        jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('.paragraph-type-top').addClass('collapsed');
        
         if(jQuery(this).closest('table').find('.paragraph-type-top.collapsed').length === jQuery(this).closest('table').find('.paragraph-type-top').length) {         
             jQuery(this).closest('table').addClass('collapsed');
             jQuery(this).closest('table').children('thead').find('.field-label').find('.expand').remove();
             jQuery(this).closest('table').children('thead').find('.field-label').append('<span  class="expand">(expand all)</span>');
          };
        
         jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').each( function(){  
         if(jQuery(this).find('input[type="text"]:not([value=""])').length === 0){        
              jQuery(this).find('img:first').addClass('open-text');
           }
         });
         
         jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('.open-text').parentsUntil('.paragraphs-subform').addClass('open-text');
      }else{
         jQuery(this).parent('.paragraph-type-top').removeClass('collapsed');
         jQuery(this).closest('table').removeClass('collapsed');
         jQuery(this).closest('table').children('thead').find('.field-label').find('.expand').remove();
         jQuery(this).closest('table').children('thead').find('.field-label').append('<span  class="expand">(collapse all)</span>');
         jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('.field--type-entity-reference-revisions').first().siblings().find('.open-text').removeClass('open-text');
         jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('.field--type-entity-reference-revisions').first().siblings().removeClass('open-text');
         if(jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('.field--type-entity-reference-revisions').length === 0){
            jQuery(this).parent('.paragraph-type-top').siblings('.paragraphs-subform').find('.open-text').removeClass('open-text');
         }
       }    
    });
   
    jQuery('.field--name-field-paragraphs').on('click', 'table:not(".inline-table") >thead', function(e){
      e.preventDefault();
      jQuery(this).find('.expand').remove();    
      if(!jQuery(this).parent('table').hasClass('collapsed')){
         jQuery(this).parent('table').addClass('collapsed');
         jQuery(this).siblings('tbody').find('.paragraph-type-top').addClass('collapsed');
         jQuery(this).siblings('tbody').find('thead').parent().addClass('collapsed');    
         jQuery(this).find('.field-label').append('<span  class="expand">(expand all)</span>');    
         jQuery(this).siblings('tbody').find('.paragraphs-subform').find('input[type="text"]:not([value=""]):first').addClass('open-text');

         jQuery(this).siblings('tbody').find('.paragraphs-subform').each( function(){  
           if(jQuery(this).find('input[type="text"]:not([value=""])').length === 0){        
                jQuery(this).find('img:first').addClass('open-text');
             }
           });
         jQuery(this).siblings('tbody').find('.paragraphs-subform').find('.open-text').parentsUntil('.paragraphs-subform').addClass('open-text');

       }else{
          jQuery(this).parent('table').removeClass('collapsed');
          jQuery(this).siblings('tbody').find('.paragraph-type-top').removeClass('collapsed');  
          jQuery(this).siblings('tbody').find('thead').parent().removeClass('collapsed');
          jQuery(this).find('.field-label').append('<span  class="expand">(collapse all)</span>'); 
          jQuery(this).siblings('tbody').find('.paragraphs-subform').find('.open-text').removeClass('open-text');
        }    
    });   
}); 

jQuery(document).ajaxComplete(function(){
    jQuery('div.vertical-tabs').find('.form-type-checkbox').change(function() {
    if(jQuery('.form-type-checkbox').children('input.form-checkbox:checked')){
          jQuery(this).closest('.form-type-checkbox').toggleClass('checkboxed');
        }
    });
  jQuery('.field--name-field-paragraphs').find('table').find('.paragraph-type-top').not('.ajax-new-content .paragraph-type-top').each(function() {
    if(jQuery(this).siblings('.paragraphs-subform').find('.ajax-new-content').length === 0){
         //jQuery(this).addClass('collapsed');
      }
   });
 /*jQuery('.field--name-field-paragraphs').find('table').find('.paragraph-type-top.collapsed').siblings('.paragraphs-subform').find('table').addClass('collapsed');
  jQuery('.field--name-field-paragraphs').find('.paragraphs-subform').find('input[type="text"]:not([value=""]):first').addClass('open-text');
      
  jQuery('.field--name-field-paragraphs').find('.paragraphs-subform').each( function(){  
       if(jQuery(this).find('input[type="text"]:not([value=""])').length === 0){        
            //jQuery(this).find('img:first').addClass('open-text');
         }
     });
  jQuery('.field--name-field-paragraphs').find('.paragraphs-subform').find('.open-text').parentsUntil('.paragraphs-subform').addClass('open-text'); */

});

/* Dropdown button hide when course leave */
jQuery(document).ready(function() {
  if(jQuery('body').css('padding-top') == '0px'){
        jQuery(this).addClass('pahar');
     } ;
   jQuery('body').find('.dropbutton').not('.field--name-field-paragraphs .dropbutton').find('li').find('a').each( function() {
   if( jQuery(this).text().length > 6 ){ 
          jQuery(this).addClass('linktwrp');  
    }
      });
  jQuery('body').find('.dropbutton').not('.field--name-field-paragraphs .dropbutton').mouseleave(function() {  
    jQuery(this).children('.secondary-action').css("display", "none");     
    jQuery(this).parents('.dropbutton-wrapper.dropbutton-multiple').removeClass('open');
  });
  
   jQuery('body').find('.dropbutton-toggle').not('.field--name-field-paragraphs .dropbutton-toggle').click(function() { 
    if(jQuery(this).siblings('.secondary-action').is(':visible')){
      jQuery(this).siblings('.secondary-action').css("display", "none");     
      jQuery(this).parent('.dropbutton-wrapper.dropbutton-multiple').removeClass('open');
    }else{
      jQuery(this).siblings('.secondary-action').css("display", "block");     
      jQuery(this).parent('.dropbutton-wrapper.dropbutton-multiple').addClass('open');
    }
  });   
    
     // date form
   jQuery(".form-date").val(new Date().toISOString().substring(0, 10));
   
   //Structure page 
  jQuery('.admin-list').closest('.block-system-main-block').addClass('trnsp');
  
  jQuery('.trnsp').parents('#main-content').siblings('#structure-types-list-cont').hide();  
  
  jQuery('.menu-item.menu-item--expanded.menu-item--active-trail.display_modes').parents('#structure-types-list-cont').show();
  
  if (jQuery('#structure-types-list-cont').find('.menu').length < 1){
    
       jQuery('#structure-types-list-cont').hide();
    
   }else if (jQuery('#structure-types-list-cont').is(':visible') ){
     
      jQuery('#structure-types-list-cont').siblings('#main-content').addClass('strcmain');
  };  
   
  //Content page , hide add content button
  jQuery('#node-types-list-cont').siblings('#main-content').find('#block-agnian-material-admin-local-actions').hide(); 
  
  // Module page switch buttons, library switch
 jQuery.fn.bootstrapSwitch.defaults.size = 'mini';
 jQuery('.system-modules, .update-manager-update-form').find('input[type="checkbox"]').bootstrapSwitch();
  
   jQuery.fn.bootstrapSwitch.defaults.inverse = true;
  jQuery(".system-modules-uninstall").find('input[type="checkbox"]').bootstrapSwitch();
  
  jQuery('.bootstrap-switch').not(".bootstrap-switch-disabled").find('span').mousedown(function(){
      jQuery(this).parents('tr').css({'background-color' : '#ffd'});
      if(jQuery('.region.region-content').find(".switch-changed").length < 1 ){
          setTimeout(function() {
            jQuery('.block-system-main-block').prepend('<div class="switch-changed messages messages--warning js-form-wrapper form-wrapper" data-drupal-selector="edit-changed" id="edit-changed">You have unsaved changes.</div>')}, 1000);
      }
  });
 /* jQuery('.update-manager-update-form .select-all').find('.bootstrap-switch-label').mousedown(function() {      
    if(jQuery(this).siblings('input').is(':checked')){
					eventFire(jQuery(this), 'click');
       }
 }); */
        
   // Table add class for mobile
  jQuery('table').find('thead').children('tr').children('th').not(':first-child').not(':nth-child(2)').not(':last-child').addClass('priority-medium');
  
  jQuery('table').find('tbody').children('tr').children('td').not(':first-child').not(':last-child').not(':nth-child(2)').addClass('priority-medium');
  
  jQuery('.admin-dblog').find('tbody').children('tr').children('td:nth-child(4)').removeClass('priority-medium');
  
  jQuery('.link.tableresponsive-toggle').click(function() { 
      jQuery('body').toggleClass('inlblock');
    });
});
    
 /* Table , select all button on thead */
 jQuery('.select-all').change(function() {  
     if(jQuery(this).children('input[type="checkbox"]:checked')){
					jQuery(this).closest('.select-all').toggleClass('checkboxed');	
      }
});

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

/* ripple effect */
jQuery(function(){
	var ink, d, x, y;
	jQuery(".tabs__tab, .vertical-tabs__menu-item, li.pager__item a").click(function(e){
    if(jQuery(this).find(".ink").length === 0){
        jQuery(this).prepend("<span class='ink'></span>");
    }
         
    ink = jQuery(this).find(".ink");
    ink.removeClass("animate");
     
    if(!ink.height() && !ink.width()){
        d = Math.max(jQuery(this).outerWidth(), jQuery(this).outerHeight());
        ink.css({height: d, width: d});
    }
     
    x = e.pageX - jQuery(this).offset().left - ink.width()/2;
    y = e.pageY - jQuery(this).offset().top - ink.height()/2;
     
    ink.css({top: y+'px', left: x+'px'}).addClass("animate");
  });
 });     
     
 