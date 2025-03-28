"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomEvent } from "../../../types";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState<"personal" | "public">("personal");
  const [isQuickMode, setIsQuickMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const eventData: Omit<
      CustomEvent,
      "event_id" | "created_at" | "updated_at"
    > = {
      name,
      description: isQuickMode ? "" : description,
      location: isQuickMode ? "" : location,
      start_date: startDate,
      start_time: startTime,
      end_date: isQuickMode ? startDate : endDate,
      end_time: isQuickMode ? startTime : endTime,
      event_type: isQuickMode ? "personal" : eventType,
      organizer_id: null,
    };

    try {
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
      <LogoutButton />
      <StyledEventTypeContainer>
        <StyledEventTypeSwitchButton
          position="left"
          isquickevent={isQuickMode}
          onClick={() => setIsQuickMode(true)}
        >
          Quick Event
        </StyledEventTypeSwitchButton>
        <StyledEventTypeSwitchButton
          position="right"
          isquickevent={!isQuickMode}
          onClick={() => setIsQuickMode(false)}
        >
          Detailed Event
        </StyledEventTypeSwitchButton>
      </StyledEventTypeContainer>
      <StyledForm onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <InputField
          label="Event Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!isQuickMode && (
          <>
            <InputField
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputField
              label="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <InputField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <InputField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
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
          </>
        )}
        <InputField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <InputField
          label="Start Time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </StyledForm>
    </StyledCreateEventContainer>
  );
};

export default CreateEvent;
