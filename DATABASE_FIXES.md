# Database Schema Fixes - Foreign Key Relationships

## Overview

The database schema was missing several critical foreign key relationships that are essential for data integrity and proper functioning of the application. This document outlines all the changes made to fix these issues.

## Missing Foreign Keys Identified

### 1. Bookings Table

**Missing Relationships:**

- `client_id` → `clients.id`
- `professional_id` → `professionals.id`
- `company_id` → `companies.id`

**Fixed:** Added all missing foreign key constraints to ensure referential integrity.

### 2. Company Schedules Table

**Missing Relationships:**

- `company_id` → `companies.id`

**Fixed:** Added foreign key constraint to link schedules to companies.

### 3. Professional Workplaces Table

**Missing Relationships:**

- `professional_id` → `professionals.id`

**Fixed:** Added foreign key constraint to link professionals to workplaces.

### 4. Professionals Table

**Missing Relationships:**

- `company_id` → `companies.id`

**Fixed:** Added foreign key constraint to link professionals to companies.

### 5. Reviews Table

**Missing Relationships:**

- `client_id` → `clients.id`
- `professional_id` → `professionals.id`

**Fixed:** Added foreign key constraints to link reviews to clients and professionals.

### 6. Services Table

**Missing Relationships:**

- `professional_id` → `professionals.id`

**Fixed:** Added foreign key constraint to link services to professionals.

### 7. Workplaces Table

**Missing Relationships:**

- `company_id` → `companies.id`

**Fixed:** Added foreign key constraint to link workplaces to companies.

## Files Modified

### 1. Schema File

- **File:** `scripts/schema.sql`
- **Changes:** Added all missing foreign key constraints to table definitions

### 2. Migration Scripts Created

- **File:** `scripts/fix-foreign-keys.sql`
- **Purpose:** Apply foreign key constraints to existing database
- **File:** `scripts/create-views-and-indexes.sql`
- **Purpose:** Create database views and indexes for better performance

### 3. Action Files Fixed

- **File:** `actions/booking-actions.ts`
- **Changes:** Updated queries to use proper normalized relationships
- **File:** `actions/client-actions.ts`
- **Changes:** Fixed field references to use correct table structure

## Database Views Created

### 1. complete_clients

Combines profile data with client-specific information.

### 2. complete_professionals

Combines profile data with professional-specific information.

### 3. complete_companies

Combines profile data with company-specific information.

### 4. complete_bookings

Comprehensive booking view with all related data.

### 5. complete_services

Services view with professional and workplace information.

## How to Apply These Changes

### Step 1: Run Foreign Key Fixes

```sql
-- Run this in your Supabase SQL editor
\i scripts/fix-foreign-keys.sql
```

### Step 2: Create Views and Indexes

```sql
-- Run this in your Supabase SQL editor
\i scripts/create-views-and-indexes.sql
```

### Step 3: Test the Application

After applying the database changes, test the client functionality to ensure:

- User registration and login works
- Client profiles are created and updated correctly
- Booking creation and retrieval works
- All relationships are properly maintained

## Impact on Client UI

The client-related UI components should now work correctly with:

- Proper user profile integration
- Correct booking data display
- Accurate client information retrieval
- Proper relationship handling between entities

## Data Integrity Benefits

With these foreign key constraints in place:

- Orphaned records are prevented
- Data consistency is maintained
- Cascading operations work correctly
- Database queries are more reliable

## Performance Improvements

The added indexes will improve query performance for:

- Booking lookups by client, professional, service, and workplace
- User profile queries
- Service filtering and searching
- Company and professional queries

## Next Steps

1. Apply the SQL scripts in the correct order
2. Test all client-related functionality
3. Monitor for any errors in the application logs
4. Verify that all relationships are working as expected

## Notes

- The normalized schema separates user profile data from entity-specific data
- Views are used to provide convenient access to combined data
- Foreign key constraints ensure data integrity
- Indexes improve query performance
- All changes are backward-compatible with existing data
