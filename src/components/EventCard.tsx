"use client";

import { Event } from "@/db/schema";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }: { event: Event }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
    >
      <Link href={`/events/${event.id}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{event.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{format(new Date(event.date), "PPP")}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{event.location}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
