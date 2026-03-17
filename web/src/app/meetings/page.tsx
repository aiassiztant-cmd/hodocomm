import { Nav } from "@/components/Nav";
import { MeetingList } from "./MeetingList";

export default function MeetingsPage() {
  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Meetings</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          View meetings by timeframe and quickly schedule new ones.
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
      <MeetingList />
    </main>
  );
}
