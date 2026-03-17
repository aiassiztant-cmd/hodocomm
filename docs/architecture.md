# hodocomm / Pulse / HodoTasks  Architecture

## 1. Components

1. **Flutter Client (hodocomm app)**
   - Material 3, Hodo branding.
   - Tabs: Today, Teams, Tasks, Meetings, AI.

2. **Backend API (FastAPI)**
   - REST endpoints for users, teams, tasks, meetings, summaries.
   - JWT auth.
   - Scheduled jobs for summaries and reminders.

3. **Database (PostgreSQL)**
   - Relational schema for users, teams, tasks, meetings, notifications.

4. **Notification Layer**
   - Generates and stores notification payloads.
   - MVP: in-app summaries.
   - Later: Telegram/WhatsApp/email.

5. **AI & MCP Layer**
   - hodocomm exposes APIs/tools for HodoAI to call:
     - list_tasks, list_meetings, create_task, update_task, notify_user.

---

## 2. Data Model (Simplified)

### Users & Teams

- `users(id, name, email, phone, timezone, role, created_at, updated_at)`
- `teams(id, name, description, created_at, updated_at)`
- `team_members(id, team_id, user_id, role, created_at)`

### Tasks

- `tasks(
    id, team_id, title, description, status, priority,
    assignee_id, created_by_id, due_date, due_time,
    progress, tags, created_at, updated_at
  )`

- `task_activity(
    id, task_id, user_id, action,
    from_value, to_value, created_at
  )`

- `task_progress_entries(
    id, task_id, user_id, date, progress, created_at
  )`

### Meetings

- `meetings(
    id, team_id, title, description,
    start_at, end_at, location,
    owner_id, priority,
    created_at, updated_at
  )`

- `meeting_participants(
    id, meeting_id, user_id, role, status
  )`

- `meeting_notes(
    id, meeting_id, author_id, notes, summary, created_at
  )`

### Notifications

- `notifications(
    id, user_id, type, payload,
    status, created_at, sent_at
  )`

---

## 3. Core API Endpoints

### Auth

- `POST /auth/login`
- `POST /auth/refresh`
- `GET /auth/me`

### Tasks

- `GET /tasks` with filters:
  - `assignee_id`, `created_by_id`, `team_id`,
  - `status`, `due_from`, `due_to`.

- `POST /tasks`
- `GET /tasks/{id}`
- `PATCH /tasks/{id}`
- `POST /tasks/{id}/progress`

### Meetings

- `GET /meetings` with filters.
- `POST /meetings`
- `GET /meetings/{id}`
- `PATCH /meetings/{id}`
- `POST /meetings/{id}/notes`

### Summaries & Notifications

Internal services:

- `generate_daily_user_summary(user_id, date)`
- `generate_weekly_user_summary(user_id, monday_date)`
- `generate_daily_team_summary(team_id, date)`
- `notify_user(user_id, payload)`

---

## 4. Schedulers

Use APScheduler/Celery or platform cron.

1. **Midday (per user)**
   - Tasks due in next 3 days.
2. **Monday morning (per user)**
   - Tasks due this week.
3. **End of day (per team)**
   - Tasks created/updated today.
   - Meetings held today.

---

## 5. AI Tooling (MCP) Mapping

For HodoAI/Marcello:

- `list_tasks(user_id, filters)` → `GET /tasks?assignee_id=user_id&...`
- `create_task(data)` → `POST /tasks`
- `update_task(id, data)` → `PATCH /tasks/{id}`
- `list_meetings(user_id, filters)` → `GET /meetings?user_id=user_id&...`
- `create_meeting(data)` → `POST /meetings`
- `update_meeting(id, data)` → `PATCH /meetings/{id}`
- `notify_user(user_id, payload)` → service that stores + sends notifications.

---

## 6. Deployment

- Backend:
  - Docker container, deployed to Railway/Render.
  - Healthcheck: `GET /healthz`.
- Database:
  - Managed Postgres, migrations via Alembic.
- Flutter:
  - CI for Android APK/Bundle and iOS build (manual signing initially).
