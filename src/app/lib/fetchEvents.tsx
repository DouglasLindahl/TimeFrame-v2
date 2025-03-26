import supabase from "../../../supabase";
import { CustomEvent } from "../types"; // Your existing CustomEvent interface

export const fetchEvents = async (): Promise<CustomEvent[]> => {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events:", error.message);
    throw new Error(error.message);
  }

  return data || [];
};
