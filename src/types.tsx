export interface CustomEvent {
  event_id: string; // UUID is a string in Supabase
  organizer_id: string | null; // UUID is a string, and it can be null if no organizer is assigned
  name: string;
  description: string | null; // Optional field, can be null
  location: string | null; // Optional field, can be null
  start_time: string; // TIMESTAMP stored as string in ISO format
  end_time: string; // TIMESTAMP stored as string in ISO format
  event_type: "personal" | "public"; // Enum values ('personal', 'public')
  created_at: string; // TIMESTAMP stored as string in ISO format
  updated_at: string; // TIMESTAMP stored as string in ISO format
}
