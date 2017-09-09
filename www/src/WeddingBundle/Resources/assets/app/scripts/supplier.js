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
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: '.slider-supplier-for',
  dots: false,
  centerMode: true,
  focusOnSelect: true
});


$('#supplier-calendar').fullCalendar({
        header: {
        left: 'prev,next',
        center: 'title',
        right: ''
        },
        allDayDefault: false,
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
   });







    




});