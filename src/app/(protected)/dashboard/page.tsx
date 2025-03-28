"use client";
import AuthCheck from "@/components/authCheck/page";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/app/lib/fetchEvents";
import { CustomEvent } from "../../../types";
import EventCard from "@/components/eventCard/page";

const Dashboard = () => {
  const [events, setEvents] = useState<CustomEvent[]>([]); // Use CustomEvent[] here
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (err: any) {
        setError("Failed to fetch events");
        console.error(err);
      }
    };

    getEvents();
  }, []);

  console.log(events);
  return (
    <AuthCheck>
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {events.length === 0 && !error && <p>No events found.</p>}
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      </div>
    </AuthCheck>
  );
};

export default Dashboard;
