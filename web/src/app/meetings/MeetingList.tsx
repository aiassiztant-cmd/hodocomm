"use client";

import { useEffect, useState } from "react";
import type { Meeting } from "@/lib/api";
import { fetchMeetings } from "@/lib/api";

export type MeetingFilter = "today" | "upcoming" | "past" | "all";

export function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filter, setFilter] = useState<MeetingFilter>("today");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const now = new Date();

      if (filter === "today") {
        const start = new Date(now);
        start.setHours(0, 0, 0, 0);
        const end = new Date(now);
        end.setHours(23, 59, 59, 999);
        params.set("from", start.toISOString());
        params.set("to", end.toISOString());
      } else if (filter === "upcoming") {
        params.set("from", now.toISOString());
      } else if (filter === "past") {
        params.set("to", now.toISOString());
      }

      const data = await fetchMeetings(params);
      setMeetings(data);
    } catch (err: any) {
      setError(err.message || "Failed to load meetings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Filter:</span>
        {[
          { id: "today", label: "Today" },
          { id: "upcoming", label: "Upcoming" },
          { id: "past", label: "Past" },
          { id: "all", label: "All" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as MeetingFilter)}
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: "999px",
              border: "1px solid #1f2937",
              background: filter === f.id ? "#fbbf24" : "#020617",
              color: filter === f.id ? "#111827" : "#e5e7eb",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>Loading meetings…</p>
      )}
      {error && (
        <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem" }}>
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
        {!loading && meetings.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No meetings for this filter.</p>
        )}
      </ul>
    </div>
  );
}
