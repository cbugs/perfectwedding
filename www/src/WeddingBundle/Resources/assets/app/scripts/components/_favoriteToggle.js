document.addEventListener('DOMContentLoaded', handleFavoriteToggle( jQuery ));

function saveFavourite(id) {
          var favouriteData = 'product_id='+id;
          $.ajax({
            url: $("#favourite_save_path").val(), 
            type: 'POST',
            data: favouriteData,
            success: function(data)   
            {
                console.log("favourite saved");
            },
            error: function(data)
            {
                console.error("error: "+data);
            },
        }); 
}

function handleFavoriteToggle($) {
  
  const $btnFav = $('.js-favorite-btn');
  const $icoFav = $('.js-favorite-icon');
  
  if ($btnFav !== undefined) {
    
    $(document).on('click', '.js-favorite-btn, .js-favorite-icon', function (e) {
      
      let target = e.target || window.event.srcElement;
      
     // if ($(target).hasClass('js-favorite-btn')) {
        if ($(target).find('i').attr('aria-selected') === 'true') {
          $(target).find('i').attr('aria-selected', false);
          $(target).find('i').removeClass('fa-heart-o').addClass('fa-heart');
        } else {
          $(target).find('i').attr('aria-selected', true);
          $(target).find('i').removeClass('fa-heart').addClass('fa-heart-o');
        }
      //s}
      
      // saveFavourite(1);
      saveFavourite($(target).attr('data-nid'));
      
      
    });
    
    // $(document).on('click', '.js-favorite-icon', function (e) {

    //   e.stopPropagation();

    //   let target = e.target || window.event.srcElement;
  
    //   if ($(target).hasClass('js-favorite-icon')){
    //     if ($(target).attr('aria-selected') === 'true') {
    //       $(target).attr('aria-selected', false);
    //       $(target).removeClass('fa-heart-o').addClass('fa-heart');
    //     } else {
    //       $(target).attr('aria-selected', true);
    //       $(target).removeClass('fa-heart').addClass('fa-heart-o');
    //     }
    //     saveFavourite($(target).parent('.js-favorite-btn').id);
    //   }
      
    // });

  }
  
}