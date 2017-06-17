( function($) {
// $('#circle-progress').circleProgress('value', 0.25);
let circleProgressValue = ($(".checklist-elem-checkbox:checked").length/$(".checklist-elem-checkbox").length);


  $('#circle-progress').circleProgress({
    value: circleProgressValue,
    size: 250,
    fill: {
      gradient: ["#4F88C2"]
    }
  });

    $( ".list-group" ).sortable({
        connectWith: ".list-group"
    }).disableSelection();
    $('[data-target="#checklistModal"]').on("click",function(e){
            let values = $(this).attr('data-values');
            if(values.length > 0){
                values = JSON.parse(values);
                $("[name='checklist-name']").val(values.title);
                $("[name='checklist-category'][value=" + values.category + "]").attr('checked', 'checked');
                $("[name='checklist-date']").val(values.date);
                $("[name='checklist-description']").val(values.description);
                $("[name='checklist-id']").val(values.id);
            } else {
                $("[name='checklist-name']").val("");
                $("[name='checklist-category']").removeAttr('checked');
                $("[name='checklist-date']").val("");
                $("[name='checklist-description']").val("");
                $("[name='checklist-id']").val("");
            }

    });

$(".checklist-elem-checkbox").on("click", function(){
        let id = $(this).attr("id");
        id = id.replace("checklist-box-","");
        let value = ($(this).is(':checked'))?1:0;
        $.ajax({
            url: $("#savedone-url").val(), 
            type: 'POST',
            data: "id="+id+"&value="+value,
            success: function(data)   
            {
            },
            error: function(data)
            {
                console.error("error: "+data);
            },
        });


circleProgressValue = ($(".checklist-elem-checkbox:checked").length/$(".checklist-elem-checkbox").length);
$('#circle-progress').circleProgress('value', circleProgressValue);
})
//   $('[data-target="#checklistModal"]').on('click', function (e) {
//     console.log($(this));
//   });

$("#save-checklist").on( "click", function(){
        $.ajax({
            url: $("#checklist-form").attr("action"), 
            type: 'POST',
            data: $("#checklist-form").serialize(),
            success: function(data)   
            {
                console.log("budget added");
                let elemTitle = data.title;
                let elemDate = data.date;
                let elemDescription = data.description;
                let elemCategory = data.category;
                let elemId= data.id;
                if( data.new === 1){
                    let elem = 
                    `
                        <li class="list-group-item list-${elemCategory}">
                            <div class="checkbox">
                                <label><input id="checklist-box-{{ chk.id }}" class="checklist-elem-checkbox" type="checkbox" value=""><span class="checklist-elem-title">${elemTitle}</span></label>
                            </div>
                            <div class="checklist-list-button-group">
                                <button data-toggle="modal" data-values='{"title":"${elemTitle}","description":"${elemDescription}","category":"${elemDate}","date":"${elemDate}","id":"${elemId}"}' data-target="#checklistModal"><span class="fa fa-edit" ></span></button>
                                <button><span class="fa fa-remove"></span></button>
                            </div>  
                        </li>                
                    `;
                    $("[id='checklist-sectionid-"+elemDate+"']").append(elem);
                    $(".checklist-elem-checkbox").on("click", function(){
circleProgressValue = ($(".checklist-elem-checkbox:checked").length/$(".checklist-elem-checkbox").length)*100;
$('#circle-progress').circleProgress('value', circleProgressValue);
})
                } else { 
                    $("#checklist-elem-"+elemId).attr("class", "list-group-item list-"+elemCategory);
                    $("#checklist-elem-"+elemId).find(".checklist-elem-title").text(elemTitle);
                    $("#checklist-elem-"+elemId).find(".checklist-modal-button").attr("data-values", '{"title":"'+elemTitle+'","description":"'+elemDescription+'","category":"'+elemDate+'","date":"'+elemDate+'","id":"'+elemId+'}');
                }

            },
            error: function(data)
            {
                console.error("error: "+data);
            },
        });
});


} ) ( jQuery );