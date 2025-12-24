"use client";

import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/services/eventService";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, MapPin, Calendar, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { getEventStatus } from "@/lib/utils";

export default function EventsPage() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events?.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: events?.length || 0,
    upcoming: events?.filter((e) => getEventStatus(new Date(e.date)) === "upcoming").length || 0,
    ongoing: events?.filter((e) => getEventStatus(new Date(e.date)) === "ongoing").length || 0,
    past: events?.filter((e) => getEventStatus(new Date(e.date)) === "past").length || 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1016] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="h-8 w-8 text-indigo-500" />
          <p className="text-zinc-500 animate-pulse">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1016] flex items-center justify-center text-red-400">
        Error loading events: {error.message}
      </div>
    );
  }

  const getStatusBadge = (date: Date) => {
    const status = getEventStatus(date);
    switch (status) {
      case "upcoming":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Upcoming</span>;
      case "ongoing":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">Ongoing</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">Past</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1016] text-white font-sans">
      {/* Top Navigation / Breadcrumb Area */}
      <div className="border-b border-zinc-800 bg-[#0f1016]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <span>Event Management</span>
            <span>/</span>
            <span className="text-white font-medium">Events</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1e2029] border border-zinc-800 text-sm rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder:text-zinc-600"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Events</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage and track all your upcoming events.
            </p>
          </div>
          <Link
            href="/events/new"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#151720] border border-zinc-800/50 rounded-xl p-5">
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Total Events</p>
                <div className="mt-2 text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-[#151720] border border-zinc-800/50 rounded-xl p-5">
                <p className="text-emerald-500 text-xs uppercase tracking-wider font-medium">Upcoming</p>
                <div className="mt-2 text-2xl font-bold">{stats.upcoming}</div>
            </div>
            <div className="bg-[#151720] border border-zinc-800/50 rounded-xl p-5">
                <p className="text-indigo-500 text-xs uppercase tracking-wider font-medium">Ongoing</p>
                <div className="mt-2 text-2xl font-bold">{stats.ongoing}</div>
            </div>
            <div className="bg-[#151720] border border-zinc-800/50 rounded-xl p-5">
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-medium">Past</p>
                <div className="mt-2 text-2xl font-bold">{stats.past}</div>
            </div>
        </div>

        {/* Events Table Container */}
        <div className="bg-[#151720] border border-zinc-800/50 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 font-medium">
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filteredEvents?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                      No events found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredEvents?.map((event) => (
                    <tr
                      key={event.id}
                      className="group hover:bg-[#1e2029]/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                            <Link href={`/events/${event.id}`}>
                                {event.title}
                            </Link>
                            </div>
                            <div className="text-zinc-500 text-xs mt-0.5 line-clamp-1 max-w-[200px]">
                              {event.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">
                        {format(new Date(event.date), "MMM d, yyyy • h:mm a")}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(new Date(event.date))}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                          {event.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/events/${event.id}`}
                          className="text-zinc-500 hover:text-white transition-colors inline-block p-2 rounded-md hover:bg-zinc-800"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
