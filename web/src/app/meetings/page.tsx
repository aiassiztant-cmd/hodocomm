import { Nav } from "@/components/Nav";
import { fetchMeetings } from "@/lib/api";

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Meetings</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          All meetings. Use the button below to quickly schedule a new one.
        </p>
      </header>
      <Nav />
      <div style={{ marginTop: "1.25rem" }}>
        <a
          href="/meetings/new"
          style={{
            display: "inline-block",
            padding: "0.5rem 0.9rem",
            borderRadius: "999px",
            background: "#fbbf24",
            color: "#111827",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          + New meeting
        </a>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
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
          </li>
        ))}
        {meetings.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No meetings yet.</p>
        )}
      </ul>
    </main>
  );
}
