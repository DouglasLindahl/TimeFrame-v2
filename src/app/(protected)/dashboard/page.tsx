"use client";
import AuthCheck from "@/components/authCheck/page";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/app/lib/fetchEvents";
import { CustomEvent } from "../../types";

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
  return <AuthCheck>asd</AuthCheck>;
};

export default Dashboard;
