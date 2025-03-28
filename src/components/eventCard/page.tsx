"use client";
import styled from "styled-components";
import { CustomEvent } from "../../types";

interface EventCardProps {
  event: CustomEvent;
}

const StyledCard = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
`;

const StyledTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

const StyledText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const StyledStrong = styled.strong`
  font-weight: 600;
`;

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <StyledCard>
      <StyledTitle>{event.name}</StyledTitle>
      <StyledText>
        <StyledStrong>Start:</StyledStrong>{" "}
        {new Date(event.start_time).toLocaleString()}
      </StyledText>
      {event.end_time && (
        <StyledText>
          <StyledStrong>End:</StyledStrong>{" "}
          {new Date(event.end_time).toLocaleString()}
        </StyledText>
      )}
      <StyledText>
        <StyledStrong>Type:</StyledStrong> {event.event_type}
      </StyledText>
      {event.description && <StyledText>{event.description}</StyledText>}
      {event.location && (
        <StyledText>
          <StyledStrong>Location:</StyledStrong> {event.location}
        </StyledText>
      )}
    </StyledCard>
  );
};

export default EventCard;
