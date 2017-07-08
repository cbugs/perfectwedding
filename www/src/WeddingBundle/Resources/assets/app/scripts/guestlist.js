( function($) {
// Activate Next Step


var todayDate = moment().startOf('day');
	var YM = todayDate.format('YYYY-MM');
	var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
	var TODAY = todayDate.format('YYYY-MM-DD');
	var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
        aspectRatio: 2,
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		navLinks: true,
		events: [
			{
				title: 'All Day Event',
				start: YM + '-01'
			},
			{
				title: 'Long Event',
				start: YM + '-07',
				end: YM + '-10'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-09T16:00:00'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-16T16:00:00'
			},
			{
				title: 'Conference',
				start: YESTERDAY,
				end: TOMORROW
			},
			{
				title: 'Meeting',
				start: TODAY + 'T10:30:00',
				end: TODAY + 'T12:30:00'
			},
			{
				title: 'Lunch',
				start: TODAY + 'T12:00:00'
			},
			{
				title: 'Meeting',
				start: TODAY + 'T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: TODAY + 'T17:30:00'
			},
			{
				title: 'Dinner',
				start: TODAY + 'T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: TOMORROW + 'T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: YM + '-28'
			}
		]
	});

setTimeout(function(){$('#calendar').fullCalendar('option', 'aspectRatio', 1.8);},500);
    var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

    allWells.hide();
    $($('.setup-content')[0]).show();
    navListItems.click(function(e)
    {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');
        
        if ($item.hasClass('unactive')) {
            navListItems.closest('li').removeClass('active');
            navListItems.closest('li').addClass('unactive');
            $item.addClass('active');
            $item.removeClass('unactive');
            allWells.hide();
            $target.show();
        }
    });
    
    // /$('ul.setup-panel li.active a').trigger('click');
    
        $.ajax({
            url: $('#guestlist-get').val(), 
            type: 'GET',
            success: function(response)   
            {
                console.warn(response);        
                  
         $.each(response.data, function(k,v){console.error(v);
                    if(v.child){
                        var child_meal = '<button value="1" class="btn-child-meal btn-meal btn btn-success">Yes</button>';
                    } else {
                        var child_meal = '<button value="0" class="btn-child-meal btn-meal btn btn-danger">No</button>';
                    }
                    if(v.meal){
                        var special_meal = '<button class="btn-special-meal btn-meal btn btn-success">Yes</button>';
                    } else {
                        var special_meal = '<button class="btn-special-meal btn-meal btn btn-danger">No</button>';
                    }      
             

                t.row.add( [
                    '<input type="checkbox"/>',
                    v.name,
                    v.contact_number,
                    v.email,
                    // v.category,
                    // child_meal,
                    // special_meal,
                    '<span class="fa fa-edit"></span>&nbsp;<span class="fa fa-remove"></span>',
                ] ).draw( false );                
            });              

            },
            error: function(response)
            {
                console.error("error: "+response);
            },
        });


    var t = $('#table-guestlist').DataTable({"lengthChange": false,"paginate":false, "info":false, "language": {"search": ""}});
    var counter = 1;
 
    $("#table-guestlist_filter").append("<button id='addGuest' data-toggle='modal' data-target='#myModal'>+ Add Guest</button>");
    


    $('#add-guest-row').on( 'click', function (e) {
        e.preventDefault();
        var formData =  "name="+$("#new-guest-name").val()+"&"+
                    "contact_number="+$("#new-guest-contact-number").val()+"&"+
                    "email="+$("#new-guest-email").val()+"&"+
                    "category="+$("#new-guest-category").val()+"&"+
                    "child_meal="+$("#new-guest-child-meal").val()+"&"+
                    "special_meal="+$("#new-guest-special-meal").val();
        $.ajax({
            url: $('#guestlist-save-form').attr('action'), 
            type: 'POST',
            data: formData,
            success: function(data)   
            {
                console.log(data);
                if($("#new-guest-child-meal").val()){
                    var child_meal = '<button value="1" class="btn-child-meal btn-meal btn btn-success">Yes</button>';
                } else {
                    var child_meal = '<button value="0" class="btn-child-meal btn-meal btn btn-danger">No</button>';
                }
                if($("#new-guest-special-meal").val()){
                    var special_meal = '<button class="btn-special-meal btn-meal btn btn-success">Yes</button>';
                } else {
                    var special_meal = '<button class="btn-special-meal btn-meal btn btn-danger">No</button>';
                }                
                t.row.add( [
                    '<input type="checkbox"/>',
                    $("#new-guest-name").val(),
                    $("#new-guest-contact-number").val(),
                    $("#new-guest-email").val(),
                    $("#new-guest-category").val(),
                    child_meal,
                    special_meal,
                    '<span class="fa fa-edit"></span>&nbsp;<span class="fa fa-remove"></span>',
                ] ).draw( false );                


                $("#new-guest-name").val("");
                $("#new-guest-contact-number").val("");
                $("#new-guest-email").val("");
                $("#new-guest-category").val("");
                $("#new-guest-child-meal").addClass('btn-danger').text('No').val(0);
                $("#new-guest-special-meal").addClass('btn-danger').text('No').val(0);

            },
            error: function(data)
            {
                console.error("error: "+data);
            },
        });    





    } );

    $(document).on('click','.btn-meal',function(e){
        e.preventDefault();
        if($(this).hasClass('btn-success')) {
            $(this).removeClass('btn-success').addClass('btn-danger').text('No').val(0);
        } else {
            $(this).removeClass('btn-danger').addClass('btn-success').text('Yes').val(1);
        }
    });

    $('#addGuest').on( 'click', function (e) {
    e.preventDefault();
    });
        var panelList = $('#draggableGuestPanelList');

        panelList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.panel-heading', 
            update: function() {
                $('.panel', panelList).each(function(index, elem) {
                     var $listItem = $(elem),
                         newIndex = $listItem.index();

                     // Persist the new indices.
                });
            }
        });


    // $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
    //     $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    // } );
     
    // $('table.table').DataTable( {
    //     ajax:           '../ajax/data/arrays.txt',
    //     scrollY:        200,
    //     scrollCollapse: true,
    //     paging:         false
    // } );
 
    // // Apply a search to the second table for the demo
    // $('#myTable2').DataTable().search( 'New York' ).draw();

    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
    var start_drag = function(){
    $( "#sortable, .snap_target" ).sortable({
      revert: true
    });
    $( "#draggable, #sortable li, .snap_target li" ).draggable({
      appendTo: "body",
      connectToSortable: ".snap_target",
      revert: "invalid",
      cursor: "move"
    });
  $('.snap_target').droppable(
    {accept: "li"},{
     hoverClass: "hover", 
     drop: function( event, ui ) {
       var count = $(this).find('li').length - 1;
       $('.snap_target').removeClass('hover');
       if(count > 0){ 
         $( this )
            .addClass( "highlight" )
            .find( "p" )
          .html( count );
         start_drag();
       }else{
         $( this )
            .addClass( "highlight" )
            .find( "p" )
          .html( '0' );
       }
     }
    });
    };
    
  var table = $('.sortable'),
      z = 1;
  
  $('#table').on("click", function(){
      z++;
      $('#tables').append('<ul id="table_'+z+'" class="snap_target guests"><p></p><span class="table_number" contenteditable="true">'+z+'</span></ul>');
      start_drag();
  });
  
  
  $('#fix').on("click", function(){
    start_drag();
  });
    
  
  $("#add_guests").on("click", function(){
    var temp = $("#guest_names").val();
    var guests = [];
    guests = temp.split(",");
    
    for (var i = 0; i < guests.length; i++) {
      if (guests[i]!==" " ){
        $("#sortable").append("<li><div contenteditable='true'>"+guests[i]+"</div><span>x</span></li>");
      }
    }
    start_drag();
  });
  
  $("#export").on("click", function(){
  var export_val = $('#tables').html(); 
  $("#export_text").val(export_val);
    $("#tables ul").each(function(){
      var table_no = "\(" + $(this).find(".table_number").text()+"\)",
      guest_na = "" + $(this).find('li div').text();
      console.log(table_no + guest_na[0]); 
     });
   
  });
  $('body').on("click", "li span", function(){
    $(this).parent().remove();
  })
} ) ( jQuery );

