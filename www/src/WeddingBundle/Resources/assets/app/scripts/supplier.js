$(document).ready(function() {

    $('#supplier-products-list').DataTable({
        "paging":   false,
        "ordering": false,
        "info":     false
    });

  
 $('.slider-supplier-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-supplier-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
  centerMode: true,
  focusOnSelect: true
});


});