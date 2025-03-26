"use client";

import { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const eventStyle = (event: any) => {
  const style = {
    backgroundColor: event.eventColor,
    opacity: 0.8,
    color: "white",
    fontWeight: "bold",
  };
  return {
    style,
  };
};

export default function Home() {
  const dynamicStyles = `
    .rbc-today {
      background-color: orange !important;
    }
    .rbc-current{
      color: white !important;
    }
    .rbc-off-range-bg {
      background-color: white !important;
    }
    .rbc-month-view {
      color: white !important;
      border: none !important;
    }
    .rbc-header {
      border: none !important;
    }
    .rbc-month-row {
      border: none !important;
    }
    .rbc-off-range {
      color: white !important;
    }
    .rbc-day-bg {
      border: none !important;
      background-color: #303030;
      border-radius: 5px;
      margin: 2px;
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = dynamicStyles;
  document.head.appendChild(styleSheet);

  const [events, setEvents] = useState<Event[]>([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
  ]);

  return (
    <div className="h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">My Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyle}
        style={{ height: 600 }}
      />
    </div>
  );
}
