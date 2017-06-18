( function($) {
// Activate Next Step

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

} ) ( jQuery );