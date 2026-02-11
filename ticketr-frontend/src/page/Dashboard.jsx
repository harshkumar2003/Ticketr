import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { allTickets, myTicket } from "../api/ticket";
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || localStorage.getItem("role");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = role === "ADMIN" ? await allTickets() : await myTicket();
        const list = role === "ADMIN" ? (res.data.content ?? []) : res.data;
        setTickets(Array.isArray(list) ? list : []);
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to load dashboard data.";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (role) {
      fetchDashboardData();
    }
  }, [role]);

  const stats = useMemo(() => {
    const initial = { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0, CLOSED: 0 };
    tickets.forEach((ticket) => {
      if (initial[ticket.status] !== undefined) {
        initial[ticket.status] += 1;
      }
    });
    return initial;
  }, [tickets]);

  const priorityStats = useMemo(() => {
    const initial = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    tickets.forEach((ticket) => {
      if (initial[ticket.priority] !== undefined) {
        initial[ticket.priority] += 1;
      }
    });
    return initial;
  }, [tickets]);

  const totalTickets = tickets.length;
  const activeTickets = stats.OPEN + stats.IN_PROGRESS;
  const completedTickets = stats.RESOLVED + stats.CLOSED;
  const completionRate =
    totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0;
  const activeRate =
    totalTickets > 0 ? Math.round((activeTickets / totalTickets) * 100) : 0;
  const staleTickets = tickets.filter((ticket) => {
    const isActive =
      ticket.status === "OPEN" || ticket.status === "IN_PROGRESS";
    const createdAt = new Date(ticket.createdAt).getTime();
    const ageMs = Date.now() - createdAt;
    return isActive && ageMs >= 1000 * 60 * 60 * 48;
  }).length;

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const statCards = [
    { label: "Open", value: stats.OPEN, color: "text-sky-300" },
    { label: "In Progress", value: stats.IN_PROGRESS, color: "text-amber-300" },
    { label: "Resolved", value: stats.RESOLVED, color: "text-emerald-300" },
    { label: "Closed", value: stats.CLOSED, color: "text-zinc-300" },
  ];

  const weeklyActivity = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });
    const days = [];

    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push({
        key: d.toISOString().slice(0, 10),
        label: formatter.format(d),
        value: 0,
      });
    }

    const dayIndex = Object.fromEntries(days.map((day, idx) => [day.key, idx]));
    tickets.forEach((ticket) => {
      const key = new Date(ticket.createdAt).toISOString().slice(0, 10);
      if (dayIndex[key] !== undefined) {
        days[dayIndex[key]].value += 1;
      }
    });

    return days;
  }, [tickets]);

  const weeklyMax = useMemo(() => {
    return Math.max(...weeklyActivity.map((item) => item.value), 1);
  }, [weeklyActivity]);

  const statusToBadge = {
    OPEN: "border-sky-400/30 text-sky-300",
    IN_PROGRESS: "border-amber-400/30 text-amber-300",
    RESOLVED: "border-emerald-400/30 text-emerald-300",
    CLOSED: "border-zinc-400/30 text-zinc-300",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
          {role === "ADMIN" ? "Admin Overview" : "My Workspace"}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Dashboard</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <section className="mb-6 rounded-2xl border border-orange-400/20 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-white/70 text-sm">
              {role === "ADMIN"
                ? "Operational snapshot"
                : "Your current workload snapshot"}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {loading ? "-" : totalTickets} Total Tickets
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Completion Rate</p>
              <p className="mt-1 text-lg font-semibold text-emerald-300">
                {loading ? "-" : `${completionRate}%`}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Active Load</p>
              <p className="mt-1 text-lg font-semibold text-amber-300">
                {loading ? "-" : `${activeRate}%`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-zinc-950 p-5"
          >
            <p className="text-sm text-white/60">{card.label}</p>
            <p className={`text-3xl font-bold mt-2 ${card.color}`}>
              {loading ? "-" : card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Recent Tickets</h2>
            <span className="text-xs text-white/60">
              Latest {Math.min(6, totalTickets)} items
            </span>
          </div>

          {loading && <p className="text-white/60">Loading tickets...</p>}
          {!loading && recentTickets.length === 0 && (
            <p className="text-white/60">No tickets found.</p>
          )}

          {!loading && recentTickets.length > 0 && (
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium">{ticket.title}</p>
                      <p className="text-sm text-white/60 mt-1">
                        {new Date(ticket.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`text-xs rounded-full border px-3 py-1 ${
                          statusToBadge[ticket.status] ||
                          "border-white/15 text-white/80"
                        }`}
                      >
                        {ticket.status?.replace("_", " ")}
                      </span>
                      {ticket.priority && (
                        <span className="text-xs rounded-full border border-white/15 px-3 py-1 text-white/80">
                          {ticket.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          <p className="text-xs text-white/60 mb-5">
            Tickets created over the last 7 days.
          </p>

          <div className="h-48 rounded-xl border border-white/10 bg-black/30 px-3 py-4">
            <div className="flex h-full items-end gap-2">
              {weeklyActivity.map((item) => {
                const height = `${Math.max(
                  Math.round((item.value / weeklyMax) * 100),
                  item.value > 0 ? 10 : 4,
                )}%`;
                return (
                  <div key={item.key} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-orange-400 transition-all duration-500"
                      style={{ height: loading ? "4%" : height }}
                      title={`${item.label}: ${item.value} tickets`}
                    />
                    <span className="text-[10px] text-white/60">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Peak day: {loading ? "-" : weeklyMax} ticket
            {weeklyMax === 1 ? "" : "s"}.
          </p>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-semibold mb-4">Priority Mix</h2>
          <div className="space-y-3">
            {[
              { key: "HIGH", color: "bg-red-400" },
              { key: "MEDIUM", color: "bg-amber-400" },
              { key: "LOW", color: "bg-emerald-400" },
            ].map((item) => {
              const value = priorityStats[item.key];
              const width =
                totalTickets > 0 ? `${Math.round((value / totalTickets) * 100)}%` : "0%";
              return (
                <div key={item.key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white/80">{item.key}</span>
                    <span className="text-white/60">{loading ? "-" : value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-300`}
                      style={{ width: loading ? "0%" : width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-lg font-semibold mb-4">Ticket Health</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-sm text-white/60">Active Tickets</p>
              <p className="mt-2 text-2xl font-semibold text-amber-300">
                {loading ? "-" : activeTickets}
              </p>
              <p className="mt-1 text-xs text-white/50">
                Open + In Progress tickets that need action.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <p className="text-sm text-white/60">Stale Active Tickets</p>
              <p className="mt-2 text-2xl font-semibold text-red-300">
                {loading ? "-" : staleTickets}
              </p>
              <p className="mt-1 text-xs text-white/50">
                Active tickets older than 48 hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
