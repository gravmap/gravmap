# Team Collaboration Feature Specification

**Feature ID:** FEA-005
**Priority:** P1 (High)
**Status:** Planned
**Owner:** Product Team

---

## Overview

Enable teams of real estate professionals to collaborate on transactions, share access, and coordinate on deadlines. Target brokerages, teams, and transaction coordinators.

### Problem Statement

Real estate is a team sport. Agents work with:
- Transaction coordinators who manage paperwork
- Team leads who oversee deals
- Assistants who help with tasks
- Brokers who review contracts

Currently, GravMap is single-user. Teams can't share transactions, assign tasks, or see each other's pipelines.

### Proposed Solution

Build team features including:
1. Team creation and management
2. Role-based access control
3. Transaction sharing and assignment
4. Shared deadline management
5. Team activity feed
6. Team analytics dashboard

---

## User Stories

### US-1: Create a Team
**As a** Team plan subscriber
**I want to** create a team for my brokerage/group
**So that** we can work together on transactions

**Acceptance Criteria:**
- [ ] Create team with name and description
- [ ] Set team branding (logo, colors)
- [ ] Define team settings (permissions, defaults)
- [ ] Get unique team invite link
- [ ] Set member limit based on plan

### US-2: Invite Team Members
**As a** team owner
**I want to** invite people to my team
**So that** they can access shared resources

**Acceptance Criteria:**
- [ ] Invite by email (single or bulk)
- [ ] Generate shareable invite link
- [ ] Set default role for new members
- [ ] Resend/revoke invitations
- [ ] See pending invitations

### US-3: Role-Based Access
**As a** team owner
**I want to** assign roles to team members
**So that** they have appropriate permissions

**Acceptance Criteria:**
- [ ] Predefined roles: Owner, Admin, Agent, TC, Viewer
- [ ] Custom role creation (Team plan)
- [ ] Change member roles
- [ ] Role-based permission matrix
- [ ] Remove members from team

### US-4: Share Transactions
**As a** team member
**I want to** share transactions with my team
**So that** others can help manage them

**Acceptance Criteria:**
- [ ] Share with entire team
- [ ] Share with specific members
- [ ] Set access level (view, edit, manage)
- [ ] Transfer ownership to team member
- [ ] Unshare transactions

### US-5: Assign Tasks
**As a** team lead
**I want to** assign deadlines to specific team members
**So that** responsibilities are clear

**Acceptance Criteria:**
- [ ] Assign deadline to team member
- [ ] Multiple assignees per deadline
- [ ] Assign to "unassigned" pool
- [ ] Reassign deadlines
- [ ] Assignment notifications

### US-6: Team Activity Feed
**As a** team member
**I want to** see what my team is working on
**So that** I stay informed

**Acceptance Criteria:**
- [ ] Real-time activity stream
- [ ] Filter by member, transaction, action type
- [ ] @mentions in comments
- [ ] Activity notifications
- [ ] Activity search

### US-7: Comments and Notes
**As a** team member
**I want to** leave comments on transactions
**So that** I can communicate with my team

**Acceptance Criteria:**
- [ ] Comment on transactions
- [ ] Comment on specific deadlines
- [ ] @mention team members
- [ ] Attach files to comments
- [ ] Edit/delete own comments

### US-8: Team Pipeline View
**As a** team lead
**I want to** see all team transactions
**So that** I can manage workload

**Acceptance Criteria:**
- [ ] View all team transactions
- [ ] Filter by member, status, date
- [ ] See transaction assignments
- [ ] Identify bottlenecks
- [ ] Export team pipeline data

---

## Technical Approach

### Database Schema

```sql
-- Teams
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  settings JSONB DEFAULT '{}',
  plan_type VARCHAR(50) DEFAULT 'team',
  max_members INTEGER DEFAULT 10,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team memberships
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  invited_by UUID REFERENCES auth.users,
  status VARCHAR(20) DEFAULT 'active', -- active, pending, suspended
  UNIQUE(team_id, user_id)
);

-- Custom roles (Team plan+)
CREATE TABLE team_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams NOT NULL,
  name VARCHAR(100) NOT NULL,
  permissions JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, name)
);

-- Team invitations
CREATE TABLE team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'member',
  token VARCHAR(255) UNIQUE NOT NULL,
  invited_by UUID REFERENCES auth.users NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transaction sharing
CREATE TABLE transaction_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions NOT NULL,
  shared_with_type VARCHAR(20) NOT NULL, -- team, user
  shared_with_id UUID NOT NULL, -- team_id or user_id
  access_level VARCHAR(20) NOT NULL DEFAULT 'view', -- view, edit, manage
  shared_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(transaction_id, shared_with_type, shared_with_id)
);

-- Deadline assignments
CREATE TABLE deadline_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deadline_id UUID REFERENCES deadlines NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  assigned_by UUID REFERENCES auth.users NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(deadline_id, user_id)
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions NOT NULL,
  deadline_id UUID REFERENCES deadlines,
  author_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  mentions UUID[] DEFAULT '{}',
  attachments JSONB DEFAULT '[]',
  edited_at TIMESTAMPTZ,
  edited_by UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Activity log
CREATE TABLE team_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams NOT NULL,
  actor_id UUID REFERENCES auth.users NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- transaction, deadline, comment
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_team_activities_team_created ON team_activities(team_id, created_at DESC);
CREATE INDEX idx_team_activities_entity ON team_activities(entity_type, entity_id);
```

### Role Definitions

```typescript
// lib/teams/roles.ts
export const DEFAULT_ROLES = {
  owner: {
    label: 'Owner',
    description: 'Full control over team and all transactions',
    permissions: {
      team: ['manage', 'billing', 'members', 'settings', 'delete'],
      transactions: ['create', 'view', 'edit', 'delete', 'share', 'assign'],
      deadlines: ['create', 'view', 'edit', 'delete', 'assign', 'complete'],
      comments: ['create', 'view', 'edit_own', 'delete_own', 'moderate']
    }
  },
  admin: {
    label: 'Admin',
    description: 'Manage team members and transactions',
    permissions: {
      team: ['members', 'settings'],
      transactions: ['create', 'view', 'edit', 'delete', 'share', 'assign'],
      deadlines: ['create', 'view', 'edit', 'delete', 'assign', 'complete'],
      comments: ['create', 'view', 'edit_own', 'delete_own', 'moderate']
    }
  },
  agent: {
    label: 'Agent',
    description: 'Manage own transactions and collaborate on shared',
    permissions: {
      team: [],
      transactions: ['create', 'view', 'edit_own', 'delete_own', 'share_own'],
      deadlines: ['create', 'view', 'edit_own', 'delete_own', 'complete_own'],
      comments: ['create', 'view', 'edit_own', 'delete_own']
    }
  },
  tc: {
    label: 'Transaction Coordinator',
    description: 'Manage assigned transactions and deadlines',
    permissions: {
      team: [],
      transactions: ['view', 'edit_assigned'],
      deadlines: ['view', 'edit_assigned', 'complete_assigned'],
      comments: ['create', 'view', 'edit_own', 'delete_own']
    }
  },
  viewer: {
    label: 'Viewer',
    description: 'View-only access to shared transactions',
    permissions: {
      team: [],
      transactions: ['view'],
      deadlines: ['view'],
      comments: ['view']
    }
  }
};
```

### API Endpoints

```typescript
// Team management
POST   /api/teams                          // Create team
GET    /api/teams/:id                      // Get team details
PATCH  /api/teams/:id                      // Update team
DELETE /api/teams/:id                      // Delete team

// Members
GET    /api/teams/:id/members              // List members
POST   /api/teams/:id/invite               // Invite member
POST   /api/teams/join/:token              // Accept invitation
DELETE /api/teams/:id/members/:userId      // Remove member
PATCH  /api/teams/:id/members/:userId/role // Change role

// Sharing
POST   /api/transactions/:id/share         // Share transaction
DELETE /api/transactions/:id/share/:target // Unshare
GET    /api/transactions/shared            // Get shared transactions

// Assignments
POST   /api/deadlines/:id/assign           // Assign deadline
DELETE /api/deadlines/:id/assign/:userId   // Unassign
GET    /api/deadlines/assigned             // Get my assignments

// Comments
GET    /api/transactions/:id/comments      // Get comments
POST   /api/transactions/:id/comments      // Create comment
PATCH  /api/comments/:id                   // Edit comment
DELETE /api/comments/:id                   // Delete comment

// Activity
GET    /api/teams/:id/activity             // Get activity feed
GET    /api/teams/:id/activity/mentions    // Get @mentions

// Pipeline
GET    /api/teams/:id/pipeline             // Team pipeline view
GET    /api/teams/:id/analytics            // Team analytics
```

### Permission Middleware

```typescript
// lib/teams/permissions.ts
export async function checkPermission(
  userId: string,
  action: string,
  resource: string,
  resourceId?: string
): Promise<boolean> {
  // Get user's team memberships
  const memberships = await getTeamMemberships(userId);
  
  for (const membership of memberships) {
    const role = await getRole(membership.teamId, membership.role);
    
    if (hasPermission(role.permissions, resource, action)) {
      // For 'own' or 'assigned' permissions, check ownership
      if (action.includes('_own') || action.includes('_assigned')) {
        return checkOwnership(userId, resource, resourceId, action);
      }
      return true;
    }
  }
  
  return false;
}

function hasPermission(
  permissions: RolePermissions,
  resource: string,
  action: string
): boolean {
  const resourcePerms = permissions[resource];
  if (!resourcePerms) return false;
  
  // Check exact match
  if (resourcePerms.includes(action)) return true;
  
  // Check wildcard
  const baseAction = action.replace('_own', '').replace('_assigned', '');
  return resourcePerms.includes(baseAction);
}
```

### Activity Tracking

```typescript
// lib/teams/activity.ts
export async function logActivity(
  teamId: string,
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata?: object
) {
  await db.teamActivities.create({
    teamId,
    actorId,
    action,
    entityType,
    entityId,
    metadata,
    createdAt: new Date()
  });
  
  // Send real-time notification to team
  await broadcastToTeam(teamId, {
    type: 'activity',
    data: { action, entityType, entityId, actorId }
  });
}

// Activity types
const ACTIVITIES = {
  transaction_created: '{actor} created transaction {transaction}',
  transaction_shared: '{actor} shared transaction {transaction} with {target}',
  transaction_assigned: '{actor} assigned {transaction} to {assignee}',
  deadline_completed: '{actor} completed deadline {deadline}',
  deadline_assigned: '{actor} assigned {deadline} to {assignee}',
  comment_added: '{actor} commented on {transaction}',
  member_joined: '{actor} joined the team',
  member_role_changed: '{actor} changed {target}\'s role to {role}'
};
```

### Real-time Collaboration

```typescript
// Using Supabase Realtime for live updates
const channel = supabase
  .channel(`team:${teamId}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'comments',
    filter: `transaction_id=eq.${transactionId}`
  }, (payload) => {
    // New comment added
    handleNewComment(payload.new);
  })
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'deadlines',
    filter: `transaction_id=eq.${transactionId}`
  }, (payload) => {
    // Deadline updated
    handleDeadlineUpdate(payload.new);
  })
  .subscribe();
```

---

## UI Components

### Team Dashboard
```
┌────────────────────────────────────────────────────────────┐
│  Team: Acme Realty                    [Invite] [Settings]  │
├────────────────────────────────────────────────────────────┤
│  Members (8)    Transactions (23)    Active Deadlines (47) │
├────────────────────────────────────────────────────────────┤
│  Recent Activity                                           │
│  ──────────────────────────────────────────────────────── │
│  Sarah J. completed "Inspection" on 123 Main St           │
│  Mike T. assigned "Financing" to Sarah J.                 │
│  You commented on 456 Oak Ave                             │
│  New member: John D. joined as Agent                      │
└────────────────────────────────────────────────────────────┘
```

### Transaction Share Modal
```
┌──────────────────────────────────────┐
│  Share Transaction                   │
│  ──────────────────────────────────  │
│  Share with:                         │
│  ○ Entire team                       │
│  ● Specific members                  │
│                                      │
│  Select members:                     │
│  ☑ Sarah Johnson (Agent)            │
│  ☑ Mike Thompson (TC)               │
│  ☐ John Davis (Agent)               │
│                                      │
│  Access level:                       │
│  ○ View only                        │
│  ○ Can edit                         │
│  ● Full management                  │
│                                      │
│  [Cancel]              [Share]       │
└──────────────────────────────────────┘
```

---

## Pricing & Plans

| Feature | Team | Team Plus | Enterprise |
|---------|------|-----------|------------|
| Price | $49/seat | $79/seat | Custom |
| Members | 10 | 25 | Unlimited |
| Roles | 5 default | + Custom | + SSO |
| Storage | 10GB/seat | 25GB/seat | Unlimited |
| Analytics | Basic | Advanced | Custom |
| Support | Email | Priority | Dedicated |

---

## Success Metrics

### Primary Metrics
- Team plan adoption: > 30% of revenue
- Teams created: 20+ in Month 3
- Average team size: 3+ members

### Secondary Metrics
- Transactions per team: > 10/month
- Comments per transaction: > 3
- Activity feed engagement: > 50% daily active

### Tracking Events
```
team_created
team_member_invited
team_member_joined
team_member_removed
transaction_shared
deadline_assigned
comment_created
comment_edited
mention_created
team_activity_viewed
team_pipeline_viewed
```

---

## Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- [ ] Team creation and management
- [ ] Member invitations
- [ ] Role-based access control
- [ ] Basic transaction sharing

### Phase 2: Collaboration (Week 3-4)
- [ ] Comments and mentions
- [ ] Deadline assignments
- [ ] Activity feed
- [ ] Real-time updates

### Phase 3: Management (Week 5-6)
- [ ] Team pipeline view
- [ ] Team analytics
- [ ] Advanced permissions
- [ ] Custom roles

---

## Dependencies

### External
- Supabase Realtime for live updates
- Websockets or SSE for notifications

### Internal
- Authentication system
- Transaction/deadline models
- Notification infrastructure
- Billing system updates

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Permission bugs | Medium | High | Extensive testing, audit logs |
| Real-time sync issues | Medium | Medium | Fallback to polling, conflict resolution |
| Performance at scale | Low | High | Pagination, caching, optimization |
| Team churn | Medium | Medium | Value demonstration, onboarding |

---

## Future Enhancements

1. **White Label** - Custom branding for teams
2. **SSO Integration** - SAML/OAuth for enterprises
3. **Team Templates** - Pre-configured team setups
4. **Approval Workflows** - Multi-step approval processes
5. **Team Chat** - Built-in messaging

---

*Created: March 2024*
*Target Launch: Month 3, Week 9*
