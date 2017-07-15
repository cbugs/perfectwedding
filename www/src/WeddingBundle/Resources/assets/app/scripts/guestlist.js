( function($) {
// Activate Next Step

        var isEventOverDiv = function(x, y) {

            var external_events = $( '#external-events' );
            var offset = external_events.offset();
            offset.top = offset.top - external_events.height();
            offset.right = external_events.width() + offset.left;
            offset.bottom = external_events.height() + offset.top;

            // Compare
            if (x >= offset.left
                && y >= offset.top
                && x <= offset.right
                && y <= offset .bottom) { return true; }
            return false;

        }




var todayDate = moment().startOf('day');
	var YM = todayDate.format('YYYY-MM');
	var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
	var TODAY = todayDate.format('YYYY-MM-DD');
	var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

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
                console.log(date);
                // is the "remove after drop" checkbox checked?
                // if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                // }



            },
            eventDragStop: function( event, jsEvent, ui, view ) {
                
console.log(jsEvent.clientX);console.log(jsEvent.clientY);
                if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
                    $('#calendar').fullCalendar('removeEvents', event._id);
                    var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
                    el.draggable({
                      zIndex: 999,
                      revert: true, 
                      revertDuration: 0 
                    });
                    el.data('event', { title: event.title, id :event.id, stick: true });
                }
            },



		events: [
			{
				title: 'All Day Event',
				start: YM + '-01'
			},
			{
				title: 'Long Event',
				start: YM + '-07',
				end: YM + '-10'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-09T16:00:00'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-16T16:00:00'
			},
			{
				title: 'Conference',
				start: YESTERDAY,
				end: TOMORROW
			},
			{
				title: 'Meeting',
				start: TODAY + 'T10:30:00',
				end: TODAY + 'T12:30:00'
			},
			{
				title: 'Lunch',
				start: TODAY + 'T12:00:00'
			},
			{
				title: 'Meeting',
				start: TODAY + 'T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: TODAY + 'T17:30:00'
			},
			{
				title: 'Dinner',
				start: TODAY + 'T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: TOMORROW + 'T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: YM + '-28'
			}
		]
	});

setTimeout(function(){$('#calendar').fullCalendar('option', 'aspectRatio', 1.8);},500);



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

$.ajax({
    url: $("#getEvents").val(), 
    type: 'GET',
    success: function(data)   
    {
        $("#getEvents").val("");
        $.each(data.data,function(k,v){
            $("#external-events-listing").append('<div class="fc-event" id="'+v.id+'">' + v.title + '<span class="fc-event-remove fa fa-remove"></span></div>');
        })


bindEventsUI();



    },
    error: function(data)
    {
    },
});







} ) ( jQuery );





