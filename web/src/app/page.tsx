import { Nav } from "@/components/Nav";
import { fetchTasks, fetchMeetings } from "@/lib/api";

export default async function TodayPage() {
  const [tasks, meetings] = await Promise.all([
    fetchTasks(new URLSearchParams({ status: "pending" })),
    fetchMeetings(),
  ]);

  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Today</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          Snapshot of your tasks and meetings.
        </p>
      </header>
      <Nav />
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <h2>Tasks</h2>
          {tasks.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No tasks yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  style={{
                    border: "1px solid #1f2937",
                    borderRadius: "0.75rem",
                    padding: "0.9rem 1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{task.title}</div>
                  {task.description && (
                    <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                      {task.description}
                    </div>
                  )}
                  <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                    Priority: {task.priority} · Status: {task.status} · Progress: {task.progress}%
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2>Meetings</h2>
          {meetings.length === 0 ? (
            <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No meetings scheduled.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {meetings.map((meeting) => (
                <li
                  key={meeting.id}
                  style={{
                    border: "1px solid #1f2937",
                    borderRadius: "0.75rem",
                    padding: "0.9rem 1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{meeting.title}</div>
                  {meeting.description && (
                    <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                      {meeting.description}
                    </div>
                  )}
                  <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                    Starts at: {new Date(meeting.start_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
