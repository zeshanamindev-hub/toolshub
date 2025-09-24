# Timio - Task Management & Tools Hub

## Project Description

Timio is a Next.js-based web application that serves as both a task management system and a collection of online utilities. The project combines a sophisticated task tracking dashboard with simple yet powerful tools for everyday use. Currently, it features a comprehensive task management interface with filtering, search capabilities, and detailed task views, alongside text processing tools like word and character counters.

The application is built with modern web technologies including Next.js 15, React 19, TypeScript, and Tailwind CSS, providing a responsive and intuitive user experience.

## File Structure Overview

```
timio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/tasks/         # API endpoints for task management
│   │   ├── tasks/             # Task management pages
│   │   │   ├── [id]/          # Individual task detail pages
│   │   │   └── page.tsx       # Main tasks dashboard
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   │   └── Layout.tsx         # Main layout component
│   ├── hooks/                 # Custom React hooks
│   │   └── use-page-title.ts  # Hook for dynamic page titles
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Shared type definitions
├── public/                    # Static assets (icons, images)
├── .taskmaster/              # Task management data storage
│   ├── tasks/tasks.json      # Task data file
│   ├── config.json           # Task configuration
│   └── state.json            # Application state
├── package.json              # Dependencies and scripts
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## Development Commands

### Getting Started
```bash
# Install dependencies
npm install

# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Run tests (Jest configured)
npm test

# Run tests in watch mode
npm test:watch
```

### Development Server
The development server runs on `http://localhost:3000` by default. The project uses Turbopack for faster development builds.

## Key Features for New Developers

- **Task Management System**: Complete CRUD operations for tasks with status tracking, priorities, dependencies, and subtasks
- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **API Routes**: RESTful API endpoints for task management using Next.js API routes
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Component Architecture**: Modular component structure with custom hooks
- **File-based Routing**: Uses Next.js App Router for intuitive page organization

The application reads task data from `.taskmaster/tasks/tasks.json` and provides a rich dashboard interface for managing development tasks and project workflows.