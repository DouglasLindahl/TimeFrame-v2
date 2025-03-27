"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomEvent } from "../../types";
import supabase from "../../../../supabase";
import colors from "../../../../theme";
import styled from "styled-components";
import InputField from "@/components/inputField/page";
import LogoutButton from "@/components/logoutButton/page";

const StyledCreateEventContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: start;
  align-items: center;
`;

const StyledHeader = styled.h1``;

const StyledForm = styled.form``;

const StyledEventTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const StyledEventTypeSwitchButton = styled.button<{
  position: "left" | "right";
  isquickevent: boolean;
}>`
  background: ${({ isquickevent }) =>
    isquickevent ? `${colors.primary}` : "none"};
  color: ${({ isquickevent }) =>
    isquickevent ? `${colors.white}` : `${colors.text}`};
  padding: 10px 20px;
  border-radius: ${({ position }) =>
    position === "left" ? "16px 0 0 16px" : "0 16px 16px 0"};
  border: 2px solid ${colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
`;

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
    <StyledCreateEventContainer>
      <StyledHeader>Create Event</StyledHeader>
      <LogoutButton></LogoutButton>
      <StyledEventTypeContainer>
        <StyledEventTypeSwitchButton
          position="left"
          isquickevent={isQuickMode} // Highlight when in Quick Mode
          onClick={() => setIsQuickMode(true)}
        >
          Quick Event
        </StyledEventTypeSwitchButton>
        <StyledEventTypeSwitchButton
          position="right"
          isquickevent={!isQuickMode} // Highlight when NOT in Quick Mode
          onClick={() => setIsQuickMode(false)}
        >
          Detailed Event
        </StyledEventTypeSwitchButton>
      </StyledEventTypeContainer>

      <StyledForm onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <InputField
            label="Event Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {!isQuickMode && (
          <>
            <div>
              <InputField
                label="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <InputField
                label="Location"
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
      </StyledForm>
    </StyledCreateEventContainer>
  );
};

export default CreateEvent;
