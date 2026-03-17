export type TaskFilter = "today" | "this_week" | "overdue" | "all";

export function buildTaskFilterParams(filter: TaskFilter): URLSearchParams {
  const params = new URLSearchParams();

  const today = new Date();
  const isoToday = today.toISOString().slice(0, 10); // YYYY-MM-DD

  switch (filter) {
    case "today": {
      params.set("due_from", isoToday);
      params.set("due_to", isoToday);
      break;
    }
    case "this_week": {
      const day = today.getDay();
      const diffToMonday = (day + 6) % 7; // 0 for Monday
      const monday = new Date(today);
      monday.setDate(today.getDate() - diffToMonday);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      params.set("due_from", monday.toISOString().slice(0, 10));
      params.set("due_to", sunday.toISOString().slice(0, 10));
      break;
    }
    case "overdue": {
      params.set("due_to", isoToday);
      params.set("status", "pending");
      break;
    }
    case "all":
    default:
      break;
  }

  return params;
}
