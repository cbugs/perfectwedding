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
  dots: false,
  asNavFor: '.slider-supplier-nav'
});
$('.slider-supplier-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: '.slider-supplier-for',
  dots: false,
  centerMode: true,
  focusOnSelect: true
});


});