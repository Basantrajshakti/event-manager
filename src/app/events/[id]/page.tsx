"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvent, deleteEvent } from "@/services/eventService";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Edit, Trash, Ticket, Share2 } from "lucide-react";
import { use } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
import { getEventStatus } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EventDetailPage(props: Props) {
  const params = use(props.params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const eventId = parseInt(params.id);

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !isNaN(eventId),
  });

  const getStatusBadge = () => {
    if (!event) return null;
    const status = getEventStatus(new Date(event.date));
    switch (status) {
      case "upcoming":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 mb-4 border border-emerald-500/20">
            Upcoming Event
          </div>
        );
      case "ongoing":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 mb-4 border border-indigo-500/20">
            Ongoing Event
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-500/20 text-zinc-300 mb-4 border border-zinc-500/20">
            Past Event
          </div>
        );
    }
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully"); // Toast notification
      router.push("/events");
    },
    onError: (error) => {
      toast.error(`Error deleting event: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1016] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="h-8 w-8 text-indigo-500" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#0f1016] flex items-center justify-center text-red-400">
        Error loading event: {error?.message || "Event not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1016] text-white font-sans pb-12">
      {/* Navigation Bar */}
      <div className="border-b border-zinc-800 bg-[#0f1016]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link
                href="/events"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
            </Link>
             <div className="flex items-center gap-2">
                 <Link
                    href={`/events/${event.id}/edit`}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <Edit className="w-4 h-4" />
                </Link>
                <button
                onClick={handleDelete}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    disabled={deleteMutation.isPending}
                >
                    {deleteMutation.isPending ? <Spinner className="w-4 h-4" /> : <Trash className="w-4 h-4" />}
                </button>
             </div>
        </div>
      </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-zinc-800 p-8 sm:p-12 mb-8">
                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                             {getStatusBadge()}
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.title}</h1>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-zinc-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-400" />
                                    <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy • p")}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-indigo-400" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Event Description */}
                    <div className="bg-[#151720] border border-zinc-800 rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">About Event</h2>
                        <div className="prose prose-invert max-w-none text-zinc-400">
                             <p className="whitespace-pre-wrap leading-relaxed">{event.description}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Event Summary Card */}
                    <div className="bg-[#151720] border border-zinc-800 rounded-xl p-6">
                         <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-6">Event Summary</h3>

                         <div className="space-y-6">
                            <div className="bg-[#1e2029] rounded-lg p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Ticket className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-400">Tickets Sold</div>
                                    <div className="font-semibold text-white">1,205</div>
                                </div>
                            </div>
                             <div className="bg-[#1e2029] rounded-lg p-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-400">Shares</div>
                                    <div className="font-semibold text-white">450</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
