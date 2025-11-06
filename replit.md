# Yaman Hair Salon Website

## Overview

A full-stack web application for 雅曼美髮沙龍 (Yaman Hair Salon), a family-run hair salon in New Taipei City, Taiwan. The application provides a warm, welcoming online presence with booking management, customer relationship management, and administrative tools. Built with a modern React frontend and Express backend, the system enables customers to browse services, meet the team, and make appointments while giving salon staff comprehensive tools to manage bookings, customers, services, and marketing campaigns.

## Recent Changes (November 6, 2025)

### Staff Photo Upload Feature
- **Backend**: Added file upload endpoint (POST /api/upload) using Multer middleware
  - Validates file type (images only: JPEG, PNG, GIF, WebP)
  - Enforces 5MB file size limit
  - Saves uploaded photos to `/attached_assets/` with timestamp-based filenames
  - Returns photo URL for database storage

- **Admin Staff Management**: Enhanced photo management capabilities
  - Photo upload button with file picker
  - Real-time photo preview using 128px Avatar component
  - Upload progress indicator
  - Remove photo functionality
  - Photos persist in database via `photoUrl` field
  - Avatar displays in staff list (both designers and assistants)
  - Photo preview in edit dialog shows existing photo

- **Public Team Page**: Now reads from database instead of hardcoded data
  - Fetches active staff from GET /api/staff/active
  - Filters to show only designers (role === "設計師")
  - Displays loading state during data fetch
  - Shows "目前沒有設計師資料" when no designers exist
  - Automatically updates when new staff added in admin

- **Bug Fixes**: Fixed photo preview state not resetting after save/cancel

### Database Integration
- Staff photos stored permanently in PostgreSQL
- All admin changes immediately reflected on public pages via React Query cache invalidation
- Staff data including photos survives application restarts

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript running in a Vite development environment

**Routing**: Wouter for client-side routing with paths for:
- Public pages: Home, Services, Team, Booking, Contact
- Admin pages: Login, Dashboard, Calendar, Customers, Services, Staff, Marketing, SEO

**UI Component Library**: Shadcn/ui with Radix UI primitives providing:
- Consistent design system based on "new-york" style
- Tailwind CSS for styling with custom color tokens
- Typography system using Noto Serif TC (headings), Noto Sans TC (body), and Inter (UI elements)
- Neutral base color scheme with warm, hospitality-focused aesthetics

**State Management**: 
- TanStack Query (React Query) for server state with custom query client configuration
- Query functions configured to throw on 401 errors by default
- Infinite stale time and disabled refetching for better control

**Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

**Design Philosophy**: Airbnb-inspired warm hospitality combined with beauty industry polish, creating a family-like atmosphere while maintaining professional credibility

### Backend Architecture

**Framework**: Express.js server with TypeScript

**API Design**: RESTful API endpoints organized by resource:
- `/api/customers` - Customer CRUD operations
- `/api/services` - Service management
- `/api/staff` - Staff/stylist management  
- `/api/bookings` - Appointment booking system
- `/api/purchase-records` - Customer purchase history
- `/api/marketing-campaigns` - Marketing campaign management
- `/api/seo-settings` - SEO configuration per page

**Development Server**: Vite middleware integration for hot module replacement during development

**Request Logging**: Custom middleware capturing request method, path, status, duration, and truncated JSON responses for API calls

**Static File Serving**: Production builds serve from `dist/public` directory

### Data Layer

**ORM**: Drizzle ORM configured for PostgreSQL with:
- Schema definitions in `shared/schema.ts` for type safety across frontend/backend
- Migration files output to `./migrations` directory
- Zod schema generation via drizzle-zod for runtime validation
- Neon HTTP client for database connections

**Database Implementation**: 
- **Current**: `DbStorage` class using Neon PostgreSQL for all data persistence
- Automatic initialization of default data on first startup:
  - Admin user (yama3058/yama3058)
  - 5 default services (洗髮, 專業剪髮, 時尚染髮, 質感燙髮, 深層護髮)
  - 2 staff members with professional photos:
    - 益安 (35 years experience, 總監)
    - 巧宣 (27 years experience)
- All data persists across application restarts
- Staff photos stored in `/attached_assets/` and referenced in database

**Database Schema**:
- `users` - Admin authentication (username, password)
- `customers` - Customer profiles with contact info (phone, LINE ID, email)
- `services` - Service catalog with pricing, duration, and active status
- `staff` - Team member profiles with roles, specialties, experience, and photo URLs
- `bookings` - Appointments linking customers, services, and staff with status tracking (pending/approved/rejected/cancelled)
- `purchase_records` - Transaction history for customer relationship management
- `marketing_campaigns` - Promotional campaigns with discount configuration
- `seo_settings` - Page-specific SEO metadata (title, description, keywords, OG images)

**Storage Abstraction**: `IStorage` interface defining all data operations
- `DbStorage`: PostgreSQL implementation using Drizzle ORM
- `MemStorage`: Legacy in-memory implementation (no longer used)

### Build and Deployment

**Build Process**: 
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js` as ESM with external packages

**Development**: NODE_ENV=development with tsx for TypeScript execution

**Production**: NODE_ENV=production running bundled JavaScript

**Path Aliases**: 
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Database
- **Neon Database** (@neondatabase/serverless) - Serverless PostgreSQL hosting
- **PostgreSQL** - Primary database via Drizzle dialect configuration

### UI Components
- **Radix UI** - Headless component primitives (20+ components including dialogs, dropdowns, calendars)
- **Shadcn/ui** - Pre-styled component configurations built on Radix
- **Lucide React** - Icon library
- **React Icons** - Additional icons (specifically SiLine for LINE messenger integration)

### Form and Validation
- **Zod** - Schema validation library
- **React Hook Form** - Form state management
- **Drizzle-Zod** - Automatic Zod schema generation from Drizzle schemas

### Date Handling
- **date-fns** - Date manipulation and formatting with zh-TW locale support

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Type-safe variant styling
- **tailwind-merge** - Intelligent class merging

### Developer Experience
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **esbuild** - Production bundling
- **tsx** - TypeScript execution for development

### Third-Party Services
- **LINE Messenger** - Customer communication channel (@377bechg)
- **Google Maps** - Location services for salon address (新北市中和區民德路52號1樓)
- **Google Fonts** - Typography (Inter, Noto Sans TC, Noto Serif TC)