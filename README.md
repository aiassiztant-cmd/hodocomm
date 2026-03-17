# hodocomm (Pulse / HodoTasks)

hodocomm (codename: Pulse / HodoTasks) is a team productivity app for Hodo/Famedico:
- Tasks with priorities, due dates, and daily progress.
- Meetings with notes and summaries.
- Daily and weekly summaries.
- AI assistant ("Pulse AI") that answers "Whats on my plate today?" and turns messages into tasks.

## High-Level Architecture

- **Client:** Flutter (Material 3, Hodo branding)
- **Backend:** FastAPI (Python) + PostgreSQL
- **AI & MCP:** hodocomm exposes tools (HTTP API) for HodoAI / Marcello to:
  - list_tasks / list_meetings
  - create_task / update_task
  - create_meeting / update_meeting
  - notify_user

## Core Features (MVP)

1. **Users & Teams**
   - Users with roles (member, manager, admin).
   - Teams with membership and roles.

2. **Tasks**
   - Create / update tasks:
     - title, description, team, assignee, priority, due date/time.
   - Status: pending, in_progress, done, cancelled.
   - Daily progress entry (0100%) per task for the current week.

3. **Meetings**
   - Create / update meetings:
     - title, description, team, owner, participants, time.
   - View upcoming and past meetings.
   - Attach notes (text) and store a summary (manual now, AI later).

4. **Schedules & Summaries**
   - Midday (per user): tasks due in next 3 days.
   - Monday morning (per user): tasks due this week.
   - End-of-day (per team): team-level summary of:
     - tasks created/updated,
     - meetings held.
   - MVP: summaries visible in app; notifications can be simple in-app "cards".

5. **AI Integration (Phase 1 hooks)**
   - API endpoints designed so HodoAI can call:
     - `list_tasks(user_id, filters)`
     - `list_meetings(user_id, filters)`
     - `create_task(data)`
     - `update_task(id, data)`
     - `notify_user(user_id, payload)`

## Tech Stack

- **Backend:** FastAPI, PostgreSQL, SQLAlchemy/SQLModel, Alembic.
- **Client:** Flutter (Material 3).
- **Auth:** JWT-based, ready for future SSO.
- **Deployment (suggested):**
  - Backend: Docker on Railway/Render.
  - Database: Managed Postgres (Railway/Render/Neon).
  - App: Flutter Android/iOS builds (web later).

## Repo Layout (planned)

```text
hodocomm/
  backend/    # FastAPI backend
  app/        # Flutter client
  docs/
    architecture.md
```

## Status

- [x] Repo created
- [ ] Backend scaffolded
- [ ] Flutter app scaffolded
- [ ] MVP features implemented
