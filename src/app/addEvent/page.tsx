"use client";
import { useState } from "react";
import { supabase } from "../../../supabase";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [allowRSVP, setAllowRSVP] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check Required Fields
    if (!title || !date || !startTime || !endTime) {
      setError("Please fill in all required fields.");
      return;
    }

    const { data, error } = await supabase.from("events").insert([
      {
        title,
        description,
        date,
        start_time: startTime,
        end_time: endTime,
        location,
        capacity: capacity ? parseInt(capacity) : null,
        visibility,
        allow_rsvp: allowRSVP,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      alert("Event created successfully!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title - Required */}
        <div>
          <label className="font-semibold">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Description - Optional */}
        <div>
          <label className="font-semibold">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        {/* Date - Required */}
        <div>
          <label className="font-semibold">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Start Time - Required */}
        <div>
          <label className="font-semibold">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* End Time - Required */}
        <div>
          <label className="font-semibold">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Location - Optional */}
        <div>
          <label className="font-semibold">Location (Optional)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Capacity - Optional */}
        <div>
          <label className="font-semibold">Capacity (Optional)</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Visibility - Required */}
        <div>
          <label className="font-semibold">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Allow RSVP - Optional */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allowRSVP}
            onChange={(e) => setAllowRSVP(e.target.checked)}
            className="mr-2"
          />
          <label>Allow RSVP</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
