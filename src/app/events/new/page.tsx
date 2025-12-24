"use client";

import EventForm from "@/components/EventForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/events"
        className="text-indigo-600 hover:text-indigo-800 flex items-center mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Events
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create New Event</h1>
      <EventForm />
    </div>
  );
}
