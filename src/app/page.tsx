import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Event Management System
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Manage your events efficiently
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/events"
            className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            View Events
          </Link>
          <Link
            href="/events/new"
            className="rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Create Event
          </Link>
        </div>
      </main>
    </div>
  );
}
