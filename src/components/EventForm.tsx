"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseEventSchema, EventFormData, EventFormValues } from "@/lib/validations/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent } from "@/services/eventService";
import { useRouter } from "next/navigation";
import { Event } from "@/db/schema";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Spinner";

type EventFormProps = {
  initialData?: Event;
  isEditing?: boolean;
};

export default function EventForm({ initialData, isEditing = false }: EventFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use baseEventSchema (no transform) for form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(baseEventSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          date: new Date(new Date(initialData.date).getTime() - new Date(initialData.date).getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16),
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: EventFormData) => {
      if (isEditing && initialData) {
        return updateEvent(initialData.id, data);
      }
      return createEvent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(isEditing ? "Event updated successfully" : "Event created successfully");
      router.push("/events");
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: EventFormValues) => {
    // Manually transform to match EventFormData (Date object)
    const payload: EventFormData = {
      ...data,
      date: new Date(data.date),
    };
    mutation.mutate(payload);
  };

  const inputClasses =
    "mt-1 block w-full rounded-xl border border-zinc-800 bg-[#1e2029] text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 placeholder:text-zinc-600 transition-colors";
  const labelClasses = "block text-sm font-medium text-zinc-400 mb-1";
  const errorClasses = "text-red-400 text-xs mt-1.5";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-[#151720] p-8 rounded-2xl shadow-xl border border-zinc-800 max-w-2xl mx-auto"
    >
      <div>
        <label className={labelClasses}>Title</label>
        <input
          {...register("title")}
          className={inputClasses}
          placeholder="e.g. Summer Music Festival"
        />
        {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          {...register("description")}
          className={inputClasses}
          rows={4}
          placeholder="Describe your event..."
        />
        {errors.description && (
          <p className={errorClasses}>{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Date & Time</label>
          <input
            type="datetime-local"
            {...register("date")}
            className={inputClasses}
          />
          {errors.date && <p className={errorClasses}>{errors.date.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Location</label>
          <input
            {...register("location")}
            className={inputClasses}
            placeholder="e.g. Central Park, NY"
          />
          {errors.location && (
            <p className={errorClasses}>{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || mutation.isPending}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting || mutation.isPending ? (
            <div className="flex items-center gap-2">
              <Spinner className="w-4 h-4 text-white" />
              <span>{isEditing ? "Updating..." : "Creating..."}</span>
            </div>
          ) : isEditing ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </button>
      </div>
    </motion.form>
  );
}
