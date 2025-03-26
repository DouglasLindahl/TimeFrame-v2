"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomEvent } from "../../types";
import supabase from "../../../../supabase";

const CreateEvent = () => {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState<"personal" | "public">("personal");

  // State to switch between modes
  const [isQuickMode, setIsQuickMode] = useState(true); // true for quick mode, false for detailed mode

  // Loading state for form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // In Quick Mode, set end_time = start_time and event_type = 'personal'
    if (isQuickMode) {
      setEndTime(startTime); // Make end_time equal to start_time in Quick Mode
      setEventType("personal"); // Set event_type to 'personal' in Quick Mode
    }

    // Create the event object based on mode
    const eventData: Omit<
      CustomEvent,
      "event_id" | "created_at" | "updated_at"
    > = {
      name,
      description: isQuickMode ? "" : description, // Empty description in quick mode
      location: isQuickMode ? "" : location, // Empty location in quick mode
      start_time: startTime,
      end_time: isQuickMode ? startTime : endTime, // Use start_time as end_time in quick mode
      event_type: eventType,
      organizer_id: null,
    };

    try {
      // Insert the new event into Supabase
      const { data, error } = await supabase.from("events").insert([eventData]);

      if (error) {
        setError(error.message);
      } else {
        // router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred while creating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <div>
        <label>
          <input
            type="radio"
            checked={isQuickMode}
            onChange={() => setIsQuickMode(true)}
          />
          Quick Mode (Doctor Appointment)
        </label>
        <label>
          <input
            type="radio"
            checked={!isQuickMode}
            onChange={() => setIsQuickMode(false)}
          />
          Detailed Mode (Full Event)
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label htmlFor="name">Event Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {!isQuickMode && (
          <>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="end_time">End Time</label>
              <input
                id="end_time"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="event_type">Event Type</label>
              <select
                id="event_type"
                value={eventType}
                onChange={(e) =>
                  setEventType(e.target.value as "personal" | "public")
                }
                required
              >
                <option value="personal">Personal</option>
                <option value="public">Public</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label htmlFor="start_time">Start Time</label>
          <input
            id="start_time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
