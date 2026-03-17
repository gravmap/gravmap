# Supabase Migrations

This directory contains database migration files for the GravMap application.

## Migration Files

### 20260316000000_initial_schema.sql
Creates the core database schema including:
- `users` - User profiles and subscription data
- `transactions` - Real estate transactions
- `documents` - Uploaded contracts and documents
- `timeline_events` - Deadlines and milestones
- `communications` - Email communications log

Features:
- UUID primary keys
- Proper indexes for performance
- Automatic timestamp updates via triggers
- JSON storage for AI extraction data
- Enum constraints for status fields

### 20260316000001_row_level_security.sql
Sets up Row Level Security (RLS) policies:
- Users can only access their own data
- Proper isolation between users
- Service role bypass for background jobs

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the contents of each migration file
5. Execute in order (oldest first)

### Option 2: Supabase CLI

```bash
# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## Migration Order

Always apply migrations in chronological order:
1. `20260316000000_initial_schema.sql` (creates tables)
2. `20260316000001_row_level_security.sql` (enables RLS)

## Rollback

If you need to rollback, you'll need to manually write SQL to:
1. Drop RLS policies
2. Disable RLS
3. Drop tables in reverse dependency order

**Warning:** Rollback will delete all data!

## Creating New Migrations

When creating new migrations:
1. Use timestamp format: `YYYYMMDDHHMMSS_description.sql`
2. Include both UP and DOWN migrations if possible
3. Test on a development database first
4. Document the changes in the migration file header

## Environment Variables

These migrations require Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Set these in `.env.local` before running the application.

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
