( function($) {
// Activate Next Step
var originalEvents = [];
        var isEventOverDiv = function(x, y) {

            var external_events = $( '#external-events' );
            var offset = external_events.offset();
            // offset.top = offset.top - 300;
            offset.right = external_events.width() + offset.left;
            offset.bottom = external_events.height() + offset.top;

            // Compare
            if (/*x >= offset.left
                && y >= offset.top*/
                /*&&*/ x <= offset.right
               /* && y <= offset .bottom*/) { return true; }
            return false;

        }


$.ajax({
    url: $("#getEvents").val(), 
    type: 'GET',
    success: function(data)   
    {
        
        // $("#getEvents").val("");
        // id,start,title,end
        $.each(data.data,function(k,v){
            console.log(v);
            if(v.startDate)
            {
                var  event = {
                    id: v.id, title: v.title, start:moment(v.startDate).format('YYYY-MM-DD'),end:(v.endDate)?moment(v.endDate).format('YYYY-MM-DD'):0
                };
                originalEvents.push(event);
            }else{

            $("#external-events-listing").append('<div class="fc-event" id="'+v.id+'">' + v.title + '<span class="fc-event-remove fa fa-remove"></span></div>');
            }
   console.log(originalEvents);
        
            

        });







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
        // eventRender: function(event, element) {
        //     element.append( "<span class='fc-event-remove fa fa-remove'></span>" );
        //     bindEventsUI();
        // },
        
            droppable: true, // this allows things to be dropped onto the calendar
            dragRevertDuration: 0,
            drop: function(date, jsEvent, ui, resourceId) {
                // is the "remove after drop" checkbox checked?
                // if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
       
    // retrieve the dropped element's stored Event Object
    var eventObject = {
        id: $(this).attr('id'),
        title: $(this).text(),
        date: date
    };
    originalEvents.push(eventObject);

   $('#calendar').fullCalendar( 'removeEvents' );
$('#calendar').fullCalendar( 'addEventSource', originalEvents );

                // }
// console.log(resourceId);
// console.log($(this));
updateEvent($(this).attr('id'),date.format('X'),0);
            },

//             eventRender: function ( event, element ) {
//     element.attr( 'id', event.id );
// },
eventDrop : function(event,revertFunc)
{

   if(event.end){
    updateEvent(event.id,event.start.format('X'),event.end.format('X'));
   }else{
    updateEvent(event.id,event.start.vformat('X'),0);
   }
 
},
            eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
   if(event.end){
    updateEvent(event.id,event.start.format('X'),event.end.format('X'));
   }else{
    updateEvent(event.id,event.start.format('X'),0);
   }

             },
            eventDragStop: function( event, jsEvent, ui, view ) {

                if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
                    $('#calendar').fullCalendar('removeEvents', event._id);
                    // var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
                    $('#external-events-listing').append('<div class="fc-event" id="'+event.id+'">' + event.title + '<span class="fc-event-remove fa fa-remove"></span></div>');
                    $("#"+event.id).draggable({
                      zIndex: 999,
                      revert: true, 
                      revertDuration: 0 
                    });
                    $("#"+event.id).data('event', { title: event.title, id :event.id, stick: true });
                }
            },



		events: originalEvents
	});

setTimeout(function(){$('#calendar').fullCalendar('option', 'aspectRatio', 1.8);},500);








bindEventsUI();



    },
    error: function(data)
    {
    },
});



function updateEvent(id,start,end)
{
    $.ajax({
        url: $("#saveEvent").val(), 
        type: 'POST',
        data: "id="+id+"&start="+start+"&end="+end,
        success: function(data)   
        {
            
        },
        error: function(data)
        {
        },
    });

}


function bindEventsUI(){
            $('#external-events .fc-event').each(function() {

            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });


        $(".fc-event-remove").on("click", function(e){

            $.ajax({
                url: $("#deleteEvent").val(), 
                type: 'POST',
                data: "id="+$(e.target).parent().attr('id'),
                success: function(data)   
                {
                    $("#"+data.data[0].id).remove();
                },
                error: function(data)
                {
                },
            });

        });


}






$("#addEventButton").on("click", function(e){
    e.preventDefault();
    $.ajax({
        url: $("#createEventForm").attr('action'), 
        type: 'POST',
        data: "title="+$("#eventTitle").val(),
        success: function(data)   
        {
            $("#external-events-listing").append('<div id="'+data.data[0]+'"class="fc-event">' + $("#eventTitle").val() + '<span class="fc-event-remove fa fa-remove"></span></div>');
            bindEventsUI();
     },
        error: function(data)
        {
        },
    });
});









} ) ( jQuery );





