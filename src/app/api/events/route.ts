import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eventSchema } from "@/lib/validations/event";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";

export type CreateEventResponse = {
  success: boolean;
  data?: typeof events.$inferSelect;
  error?: string;
};

export type GetEventsResponse = {
  success: boolean;
  data: (typeof events.$inferSelect)[];
  error?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = eventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, error: validation.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    const { title, description, date, location } = validation.data;

    const [newEvent] = await db
      .insert(events)
      .values({
        title,
        description,
        date,
        location,
      })
      .returning();

    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allEvents = await db.select().from(events).orderBy(desc(events.createdAt));
    return NextResponse.json({ success: true, data: allEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    // @ts-ignore
    const message = error?.message || "Unknown error";
    // @ts-ignore
    const stack = error?.stack || "";
    console.error("Detailed Error:", message, stack);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
