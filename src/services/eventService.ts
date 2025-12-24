import { Event, NewEvent } from "@/db/schema";
import { EventFormData } from "@/lib/validations/event";

const API_URL = "/api/events";

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch events");
  const json = await response.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
};

export const getEvent = async (id: number): Promise<Event> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch event");
  const json = await response.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
};

export const createEvent = async (data: EventFormData): Promise<Event> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create event");
  const json = await response.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
};

export const updateEvent = async (id: number, data: EventFormData): Promise<Event> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update event");
  const json = await response.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete event");
  const json = await response.json();
  if (!json.success) throw new Error(json.error);
};
