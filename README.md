# Nexus Platform

An AI-powered platform that helps university students build a strong foundation in the track they choose (e.g. Frontend, Backend, Data Science...) and guides them from day one until they're job-ready.

🎥 **[Watch the demo video](https://drive.google.com/file/d/1bSOgY0JU8LOlr-hE_ExWcGo8Hz9pYMcG/view?usp=sharing)**

## 🎯 Project Overview

Nexus Platform (Nexxuus) solves a common problem: students pick a track but have no clear roadmap of what to study, when, and why it matters. The platform closes that gap end-to-end:

- **Placement Test**: When a student joins, they take an AI-generated placement test for their chosen track to assess their current level.
- **AI Learning Plan**: Based on the result, the AI builds a personalized learning plan — what to study this term, which courses matter most and why, and in what order.
- **Course Content**: Each term comes with study videos and material mapped to the learning plan.
- **Exams (Student side)**: Students take exams normally through the platform.
- **Exams (Instructor side)**: University doctors/instructors can create exams for a track, review student submissions, grade them, and give feedback.
- **AI CV Builder & ATS Score**: Students can build a CV with AI assistance, or upload an existing CV and get an ATS-compatibility score plus improvement suggestions.
- **Job Recommendations**: The platform pulls relevant job openings from LinkedIn based on the student's track and skill level.

In short: Nexus takes a student from "I picked a track but don't know where to start" to a validated skillset, a solid CV, and real job opportunities — with AI guiding every step.

## ✨ Features

- **Multi-Role Authentication**: Secure login for students and instructors with role-based access control
- **AI Placement Test**: Track-specific test on signup to assess the student's starting level
- **AI-Generated Learning Plan**: Personalized term-by-term study plan based on the placement test and track
- **Course Content & Videos**: Study material and videos organized per term, aligned with the learning plan
- **Examination System (Student)**: Take exams for enrolled courses with real-time results
- **Examination System (Instructor)**: Create exams, review submissions, grade, and give feedback
- **AI CV Builder**: Build a CV from scratch with AI assistance
- **CV ATS Score**: Upload an existing CV and get an ATS-compatibility score with improvement suggestions
- **LinkedIn Job Matching**: Get job openings pulled from LinkedIn matched to the student's track and skills
- **Skill Tracking**: Monitor acquired skills and identify skill gaps
- **AI-Powered Chatbot**: Get instant answers and guidance from the Nexxuus chatbot
- **Real-Time Notifications**: Stay updated with course announcements, exam schedules, and system notifications
- **Multi-Language Support**: Full support for Arabic and English with seamless language switching
- **Responsive Design**: Fully responsive UI optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Core Framework

- **Next.js 14** - React framework with App Router and server-side rendering
- **React 18** - UI library for building components
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icons library
- **next-themes** - Theme management (light/dark mode)

### Forms & Validation

- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation

### Data Management & API

- **TanStack React Query** - Server state management and data fetching
- **next-intl** - Internationalization (i18n)

### Authentication & Security

- **NextAuth.js** - Authentication and authorization

### Notifications & UI Feedback

- **Sonner** - Toast notification library
- **React Hot Toast** - Alternative notification system
- **React Circular Progressbar** - Progress visualization

### Media & Input

- **React Webcam** - Webcam access for media capture
- **React Phone Number Input** - Phone number validation and formatting
- **Input OTP** - OTP input component
- **Embla Carousel** - Carousel/slider component
- **React Day Picker** - Date picker component

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API route handlers
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── compare/              # CV comparison endpoint
│   │   ├── cv/                   # CV analysis endpoint
│   │   └── nexus-chatbot/        # Chatbot API
│   ├── [locale]/                 # Internationalization wrapper
│   │   ├── (auth)/               # Authentication pages (login, signup)
│   │   ├── (student)/            # Student routes
│   │   │   ├── acad-courses/     # Academic courses
│   │   │   ├── certificates/     # Student certificates
│   │   │   ├── cv/               # CV management
│   │   │   ├── exam/             # Examinations
│   │   │   ├── experience/       # Experience tracking
│   │   │   ├── learning-plan/    # Learning plans
│   │   │   ├── projects/         # Project management
│   │   │   ├── profile/          # Student profile
│   │   │   ├── Linkedin/         # LinkedIn integration
│   │   │   └── trends/           # Industry trends
│   │   └── (doctor)/             # Instructor routes
│   │       ├── add-new-exam/     # Create exams
│   │       ├── past-exams/       # View past exams
│   │       ├── doctor-view/      # Doctor dashboard
│   │       └── profile-doctor/   # Instructor profile
│   └── globals.css               # Global styles
├── components/                   # Reusable React components
│   ├── features/                 # Feature-specific components
│   │   ├── nexxuus-chatbot.tsx   # Chatbot widget
│   │   └── toggle-mode.tsx       # Dark mode toggle
│   ├── layout/                   # Layout components
│   │   ├── Appsidebar.tsx        # Main sidebar
│   │   ├── footer/               # Footer component
│   │   ├── header/               # Header components
│   │   ├── notifications/        # Notification components
│   │   └── sidebar/              # Sidebar components
│   ├── ui/                       # Base UI components (Radix UI based)
│   ├── shared/                   # Shared/utility components
│   │   ├── auth/                 # Auth-related components
│   │   ├── email-input.tsx
│   │   ├── password-input.tsx
│   │   └── social buttons
│   ├── skeletons/                # Loading skeleton components
│   └── providers/                # Context providers
├── hooks/                        # Custom React hooks
│   └── use-mobile.tsx            # Mobile detection hook
├── i18n/                         # Internationalization
│   ├── navigation.ts             # i18n routing setup
│   ├── routing.ts                # Route configuration
│   ├── request.ts                # i18n request handler
│   └── messages/                 # Translation files
│       ├── ar.json               # Arabic translations
│       └── en.json               # English translations
├── lib/                          # Utilities and helpers
│   ├── apis/                     # API integration functions
│   │   ├── get-acad-courses.api.ts
│   │   ├── get-certificates.api.ts
│   │   ├── get-exam-information.api.ts
│   │   ├── get-jobs-linkedin.api.ts
│   │   ├── get-projects.api.ts
│   │   ├── get-result-exam.api.ts
│   │   ├── get-skills.api.ts
│   │   └── ... (other API functions)
│   ├── actions/                  # Server actions
│   ├── constants/                # Application constants
│   ├── schemas/                  # Zod validation schemas
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   └── utils.ts                  # Common utilities (cn, etc.)
├── auth.ts                       # Authentication configuration
└── middleware.ts                 # Next.js middleware

public/
└── assets/                       # Static assets
    └── images/                   # Image files
```

### Architecture Overview

- **Client-Server Architecture**: Next.js handles both client-side rendering and server-side operations
- **Route Groups**: Routes are organized using Next.js route groups for cleaner structure (`(auth)`, `(student)`, `(doctor)`)
- **Multi-Tenancy**: Support for multiple locales (Arabic/English) with locale-based routing
- **API Integration**: Backend APIs for CV analysis, exam management, and AI chatbot are proxied through Next.js API routes
- **Component-Based UI**: Modular, reusable components built with Radix UI primitives

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.17 or later
- **npm** or **yarn**: Package manager

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd graduation-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically reload when you make changes.

## 📝 Available Scripts

Run these commands in the project directory:

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint for code linting
npm run lint
```

## 🔌 API Integration

The application integrates with several external services — a CV analysis service, a CV/job comparison service, and an AI chatbot — all proxied through internal Next.js API routes so the underlying service details are never exposed to the client.

## 🎨 Styling & Theming

The project uses **Tailwind CSS** with the following features:

- **Responsive Design**: Mobile-first approach with breakpoints (sm, md, lg, xl, 2xl)
- **Custom Theme Variables**: CSS custom properties for colors and spacing
- **Component Library**: Pre-built UI components with consistent styling

Color scheme and theme settings can be modified in `tailwind.config.ts`.

## 🌍 Internationalization (i18n)

The application supports multiple languages with full RTL support potential:

- **Supported Languages**: English (en), Arabic (ar)
- **Framework**: next-intl for seamless multi-language support
- **Routing**: Locale-based URL structure (`/en/path`, `/ar/path`)

## 🔐 Authentication

The application uses **NextAuth.js** for authentication with:

- **Credentials Provider**: Username and password authentication
- **Protected Routes**: Role-based access control for student and instructor routes
- **Session Management**: Server-side sessions with secure HTTP-only cookies
- **Security**: CSRF protection and token encryption

## 🏗️ Building & Deployment

### Build for Production

```bash
npm run build
```

This generates an optimized production build in the `.next` directory.

### Deployment Options

The easiest way to deploy is using **Vercel** (the creators of Next.js): push your code to GitHub/GitLab/Bitbucket, [import the repository](https://vercel.com/new), and deploy automatically. Vercel also provides preview deployments for pull requests and built-in analytics.

The app can also be deployed to any platform that supports Node.js (AWS, Google Cloud, Azure, Docker, or self-hosted).

## 📊 Performance

- **Server-Side Rendering (SSR)**: Improved SEO and initial load time
- **Static Generation**: Static pages where applicable
- **Image Optimization**: Next.js built-in image optimization
- **Code Splitting**: Automatic code splitting for route-based chunks
- **Caching**: React Query for smart data caching
