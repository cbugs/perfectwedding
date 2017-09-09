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






console.log("maping");


        var myLatlng = new google.maps.LatLng(40.713956, -74.006653);
        var myOptions = {
            zoom: 8,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        var marker = new google.maps.Marker({
            draggable: true,
            position: myLatlng,
            map: map,
            title: "Your location"
        });
        google.maps.event.addListener(marker, 'dragend', function (event) {
            document.getElementById("lat").value = event.latLng.lat();
            document.getElementById("long").value = event.latLng.lng();
            infoWindow.open(map, marker);
        });
    
    




});