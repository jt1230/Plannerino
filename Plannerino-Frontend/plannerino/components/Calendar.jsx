import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import authState from "atoms/authState";
import eventsState from "atoms/eventsState";

export default function Calendar() {
  const auth = useRecoilValue(authState);
  const [newEvent, setNewEvent] = useState(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleEventClick = (eventInfo) => {
    console.log("clicked event", eventInfo.event.id);
    if (
      confirm(
        `Are you sure you want to delete the event '${eventInfo.event.title}'`
      )
    ) {
      eventInfo.event.remove();

      const deleteEvent = async () => {
        console.log("fetchar DELETE method...");
        const response = await fetch(
          `https://localhost:7063/api/Event/${eventInfo.event.id}`,
          {
            method: "DELETE",
          }
        );
        console.log(response);
      };
      deleteEvent();
    }
  };

  const handleSelectClick = (addInfo) => {    
    let title = prompt("Please enter a new title for your event");
    let calendarApi = addInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: addInfo.startStr,
        end: addInfo.endStr,
        allDay: addInfo.allDay,
        color: "blue",
      });

      const createEvent = async () => {
        console.log("fetchar POST method...");
        const response = await fetch(
          `https://localhost:7063/api/Event?userId=${auth.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title,
              start: addInfo.startStr,
              end: addInfo.endStr,
              allDay: addInfo.allDay,
            }),
          }
        );
      };
      createEvent();
    }
  };

  return (
    <FullCalendar
      plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "timeGridDay,timeGridWeek,dayGridMonth",
      }}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
      }}
      locale="en-gb"
      firstDay={1}
      slotDuration={'00:15:00'}
      slotLabelInterval={'01:00:00'}
      eventColor={"red"}
      nowIndicator={true}
      editable={true}
      dayMaxEvents={true}
      selectable={true} 
      weekNumbers={true} 
      slotEventOverlap={false}
      events={`https://localhost:7063/api/User/${auth.id}/events`}
      eventDidMount={function (info) {
        console.log(info.event.extendedProps);
        // {description: "", type: ""}
      }}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
      height="100%"
      select={handleSelectClick}
      eventClick={handleEventClick}
    />
  );
}
