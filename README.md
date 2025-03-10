# ASNPRVCTR E-commerce Platform

## Project Overview
ASNPRVCTR is a comprehensive e-commerce platform specializing in premium art and design products. The platform supports multiple user roles (Customer, Artist, Admin, Super-Admin) with role-specific features and interfaces.

## ⚠️ CRITICAL NAVIGATION INFORMATION ⚠️

The navigation system in this application has been a source of recurring issues. Please read these guidelines carefully before making any changes:

1. **DO NOT modify the MainNav component** without explicit permission - it's designed to be persistent across all user types
2. **DO NOT create duplicate headers** - the header is defined in the root layout and should not be replicated elsewhere
3. **Always test navigation with all user types** after making changes

See the [NAVIGATION.md](./NAVIGATION.md) file for detailed specifications.

## Core Features

### User Roles
- **Customer**: Can browse products, make purchases, manage their account, orders, addresses, and wishlist
- **Artist**: Can manage their products, view sales, and access artist-specific features
- **Admin**: Can manage products, orders, users, and site settings
- **Super-Admin**: Has full access to all features and system settings

### Customer Experience
- **Account Management**: Profile settings, password changes, notification preferences
- **Order Management**: View order history, track shipments, manage returns
- **Address Book**: Save and manage multiple shipping addresses
- **Payment Methods**: Securely store payment information for faster checkout
- **Wishlist**: Save products for future consideration
- **Shopping Experience**: Intuitive product browsing, searching, and filtering

### Artist Features
- **Product Management**: Upload, edit, and manage product listings
- **Sales Dashboard**: Track sales, revenue, and performance metrics
- **Order Fulfillment**: Manage and fulfill customer orders
- **Profile Management**: Customize artist profile and showcase

### Admin Capabilities
- **Product Administration**: Approve, edit, or remove product listings
- **Order Management**: Process orders, handle returns, manage inventory
- **User Management**: Manage customer and artist accounts
- **Site Configuration**: Customize site settings, categories, and features

### Super-Admin Functions
- **System Administration**: Full access to all platform settings
- **User Administration**: Manage all user types including admins
- **Analytics Dashboard**: Comprehensive reporting and analytics
- **Platform Configuration**: Global settings and integrations management

## Technical Architecture

### Frontend
- Next.js App Router for server-side rendering and routing
- React for component-based UI development
- Tailwind CSS for styling
- shadcn/ui component library for consistent design
- Zustand for state management

### Layout Structure
- **Root Layout** (`app/layout.tsx`): Contains the persistent header with MainNav
- **Page Layouts**:
  - **RetailLayout**: Used for public-facing pages
  - **AccountLayout**: Used for customer account pages
  - **ArtistLayout**: Used for artist dashboard pages
  - **AdminLayout**: Used for admin dashboard pages
  - **SuperAdminLayout**: Used for super-admin dashboard pages

### Authentication & Authorization
- Role-based access control
- Secure authentication flow
- Protected routes and middleware

### Component Structure
- Reusable UI components in `/components`
- Page-specific components organized by feature
- Layout components for consistent page structure

### State Management
- User state in `lib/user-store.ts`
- Cart state in `lib/cart-store.ts`
- Form state managed with React Hook Form

### Navigation Components
- Main navigation in `components/main-nav.tsx` (DO NOT MODIFY)
- Mobile navigation in `components/mobile-nav.tsx`
- Account navigation in `components/account-nav.tsx`
- Artist navigation in `components/artist-nav.tsx`

## Common Issues and Solutions

### Double Headers
**Problem**: Multiple headers appearing on pages.
**Solution**: The header is defined in the root layout (`app/layout.tsx`). Do not add additional headers in page or layout components.

### Missing Navigation
**Problem**: Top navigation disappears on certain pages.
**Solution**: Ensure the root layout is properly wrapping all pages, and no layout components are replacing the header.

### Login Routing Issues
**Problem**: Users are not redirected to the correct dashboard after login.
**Solution**: Check the login handler to ensure it's routing users based on their role:
- Customers → `/account/dashboard`
- Artists → `/artist`
- Admins → `/dashboard`
- Super-Admins → `/super-admin`

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing
- Follow the established code style and patterns
- Create feature branches for new functionality
- Submit pull requests with comprehensive descriptions
- Ensure all components are accessible and responsive

