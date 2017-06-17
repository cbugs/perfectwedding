$(document).ready(function() {

    $('#supplier-products-list').DataTable({
        "paging":   false,
        "ordering": false,
        "info":     false
    });

    $("img.b-lazy").lazyload();

});