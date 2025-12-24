"use client";

import EventForm from "@/components/EventForm";
import { getEvent } from "@/services/eventService";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditEventPage(props: Props) {
  const params = use(props.params); 
  const eventId = parseInt(params.id);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !isNaN(eventId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading event: {error?.message || "Event not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/events/${eventId}`}
        className="text-indigo-600 hover:text-indigo-800 flex items-center mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Detail
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Edit Event</h1>
      <EventForm initialData={event} isEditing />
    </div>
  );
}
