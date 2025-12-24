# Event Management System

A modern, full-stack Event Management Dashboard built with **Next.js 15**, **PostgreSQL**, and **Drizzle ORM**. This application features a premium dark-themed UI, real-time status tracking, and seamless event CRUD operations.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📂 Project Structure

```bash
├── src/
│   ├── app/                 # Next.js App Router pages and API routes
│   │   ├── api/             # Backend API endpoints (e.g., /api/events)
│   │   ├── events/          # Events Dashboard & Detail pages
│   │   └── layout.tsx       # Root layout with Providers & Toaster
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # UI primitives (Spinner, Cards, etc.)
│   │   └── EventForm.tsx    # Complex form components
│   ├── db/                  # Database configuration
│   │   ├── index.ts         # DB connection setup
│   │   └── schema.ts        # Drizzle ORM schema definitions
│   ├── lib/                 # Utilities and helpers
│   │   ├── utils.ts         # Utility functions (cn, event status)
│   │   └── validations/     # Zod schemas
│   ├── providers/           # Context providers (QueryClientProvider)
│   └── services/            # Frontend API service layer
├── drizzle.config.ts        # Drizzle Kit configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js setup (v18+ recommended)
- A running PostgreSQL instance (or connection string)

### 1. Clone the Repository

```bash
git clone <repository_url>
cd assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your database connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 4. Database Setup

Push the database schema to your PostgreSQL instance using Drizzle Kit:

```bash
npx drizzle-kit push
```

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Features

- **Dashboard**: View all events in a responsive table layout.
- **Dynamic Status**: Events are automatically categorized as **Upcoming**, **Ongoing**, or **Past** based on date (2-hour duration logic).
- **CRUD Operations**: Create, Read, Update, and Delete events.
- **Search**: Real-time client-side search filtering.
- **Premium UI**: Dark mode aesthetic with glassmorphism effects and smooth transitions.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint checks.
