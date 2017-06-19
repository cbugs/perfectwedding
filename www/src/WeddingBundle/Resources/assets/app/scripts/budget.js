/* Formatting function for row details - modify as you need */
// function format ( d ) {
//     // `d` is the original data object for the row
//     return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
//         '<tr>'+
//             '<td>Full name:</td>'+
//             '<td>'+d.name+'</td>'+
//         '</tr>'+
//         '<tr>'+
//             '<td>Extension number:</td>'+
//             '<td>'+d.extn+'</td>'+
//         '</tr>'+
//         '<tr>'+
//             '<td>Extra info:</td>'+
//             '<td>And any further details here (images etc)...</td>'+
//         '</tr>'+
//     '</table>';
// }
 
$(document).ready(function() {
    var table = $('#budget-table').DataTable( {
        "ajax": $("#table-ajax-path-budget-index").val(),
        "rowId": "id",
        "columns": [
            { "data": "name", "orderable": false, className: "col-name" },
            { "data": "estimated_cost", "orderable": false, className: "col-estimated_cost" },
            { "data": "actual", "orderable": false, className: "col-actual" },
            { "data": "paid", "orderable": false, className: "col-paid" },
            { "data": "due", "orderable": false, className: "col-due" },
            {
                "orderable":      false,
                "data":           null,
                "defaultContent": '<span class="fa fa-save budget-table-row-save" style="display:none;">&nbsp;</span><span class="fa fa-edit budget-table-row-edit"></span>'
            },
            {
                "orderable":      false,
                "data":           null,
                "defaultContent": '<span class="fa fa-trash-o budget-table-row-edit"></span>'
            },
        ],
        "order": [],
        "paging": false,
        "filter": false,
        "orderable": false,
        "initComplete": function(settings, json) {calculateSums();},
    } );

    $("#budget-table").on("click", ".budget-table-row-edit", function(){
        if($(this).hasClass('fa-remove')){
            $(this).removeClass('fa-remove').addClass('fa-edit');
            $(this).siblings(".budget-table-row-save").hide();
        }else{
            $(this).removeClass('fa-edit').addClass('fa-remove');
            $(this).siblings(".budget-table-row-save").show();
        }
        $(this).parent().parent().find('td').each (function(i,e) {
            if(i < 5){
                if($(this).has('input').length){
                    $(this).text($(this).find('input').attr('data-prev-value'));
                } else {
                    $(this).html('<input type="text"'+(i>0?" class='budget-edit-text' ":"")+' value="'+$(this).text()+'" data-prev-value="'+$(this).text()+'"/>');
$(".budget-edit-text").on("propertychange change keyup paste input", function(){
    calculateSums();
}); 
                }
            }
            calculateSums();
        });             
        
    });

    //save budget changes
    $("#budget-table").on("click", ".budget-table-row-save", function(){
        var budgetData = "id="+$(this).parent().parent().attr('id')+"&";
        var saveBudgetRoute = $("#budget-save-form").attr("action");
        $(this).parent().parent().find('td').each (function(i,e) {
            if(i < 5){
                budgetData += $(this).attr('class').replace('col-','').trim()+"="+$(this).find('input').val()+"&";
                $(this).text($(this).find('input').val());
            }
            console.log(budgetData);
        });             

      //  if($(this).hasClass('fa-remove')){
            $(this).hide();
            $(this).siblings(".budget-table-row-edit").removeClass('fa-remove').addClass('fa-edit');
       // }else{
        //    $(this).removeClass('fa-edit').addClass('fa-remove');
       //     $(this).siblings(".budget-table-row-save").show();
       // }
        console.log("saving....");
        calculateSums();
        $.ajax({
            url: saveBudgetRoute, 
            type: 'POST',
            data: budgetData,
            success: function(data)   
            {
                console.log("budget saved");
                // calculateSums();
            },
            error: function(data)
            {
                console.error("error: "+data);
                // calculateSums();
            },
        });

    });
     
    // Add event listener for opening and closing details
    // $('#example tbody').on('click', 'td.details-control', function () {
    //     var tr = $(this).closest('tr');
    //     var row = table.row( tr );
 
    //     if ( row.child.isShown() ) {
    //         // This row is already open - close it
    //         row.child.hide();
    //         tr.removeClass('shown');
    //     }
    //     else {
    //         // Open this row
    //         row.child( format(row.data()) ).show();
    //         tr.addClass('shown');
    //     }
    // } );


    $('#add-row').on( 'click', function () {
        let newBudgetName = $("#new-budget-name").val();
        if(newBudgetName === ""){return;}
        var addBudgetRoute = $("#budget-new-form").attr("action");
        var budgetData = 'name='+$("#new-budget-name").val()+'&estimated_cost=0&actual=0&paid=0&due=0';
        $.ajax({
            url: addBudgetRoute, 
            type: 'POST',
            data: budgetData,
            success: function(data)   
            {
                console.log("budget added");
                var str = '{"name": "'+$("#new-budget-name").val()+'","estimated_cost": "0","actual": "0","paid": "0","due": "0"}';
                table.row.add($.parseJSON(str)).draw();
                $('#budget-table tr:last').attr('id', data.id);
            },
            error: function(data)
            {
                console.error("error: "+data);
            },
        });

    } );
 
    // Automatically add a first row of data
   // $('#addRow').click();

   //calculate sums
   function calculateSums(){
       console.log('calculating');
       $("#b1col").text('0');
       $("#b2col").text('0');
       $("#b3col").text('0');
       $("#b4col").text('0');
    $("#budget-table").find("tbody").find("tr").each(
        function(){
            $("#b1col").text(parseInt($("#b1col").text()) + parseInt(
                ($(this).find('td:eq(1)').children('input').length > 0)?
                $(this).find('td:eq(1)').children('input').val():
                 $(this).find('td:eq(1)').text()
                ));
            $("#b2col").text(parseInt($("#b2col").text()) + parseInt(
                ($(this).find('td:eq(2)').children('input').length > 0)?
                $(this).find('td:eq(2)').children('input').val():
                $(this).find('td:eq(2)').text()
            ));
            $("#b3col").text(parseInt($("#b3col").text()) + parseInt(
                ($(this).find('td:eq(3)').children('input').length > 0)?
                $(this).find('td:eq(3)').children('input').val():
                 $(this).find('td:eq(3)').text()
            ));
            $("#b4col").text(parseInt($("#b4col").text()) + parseInt(
                ($(this).find('td:eq(4)').children('input').length > 0)?
                $(this).find('td:eq(4)').children('input').val():
                 $(this).find('td:eq(4)').text()
            ));
            }
        );
   }


} );