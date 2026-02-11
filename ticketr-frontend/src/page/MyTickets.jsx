import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleDot, Clock3, Ticket } from "lucide-react";
import toast from "react-hot-toast";
import { markTicketResolved, myTicket } from "../api/ticket.js";
import MarkTicketModal from "../component/MarkTicketModal";

const statusStyles = {
  OPEN: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  IN_PROGRESS: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  RESOLVED: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  CLOSED: "border-zinc-400/30 bg-zinc-500/10 text-zinc-300",
};

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await myTicket();
        setTickets(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        const message =
          error?.response?.data?.message || "Could not load your tickets.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter((ticket) => ticket.status === "OPEN").length,
      inProgress: tickets.filter((ticket) => ticket.status === "IN_PROGRESS")
        .length,
      resolved: tickets.filter((ticket) => ticket.status === "RESOLVED").length,
    };
  }, [tickets]);

  const handleResolve = async () => {
    try {
      await markTicketResolved(selectedTicket.id);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === selectedTicket.id
            ? { ...ticket, status: "RESOLVED" }
            : ticket,
        ),
      );
      setSelectedTicket(null);
      toast.success("Ticket marked as resolved");
    } catch (err) {
      const message = err?.response?.data?.message || "Resolve failed.";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold">My Tickets</h1>
        <p className="mt-2 text-sm text-white/60">
          Track all tickets you raised and quickly resolve completed work.
        </p>
      </section>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
          <p className="text-xs text-white/60">Total</p>
          <p className="mt-2 text-2xl font-semibold">{loading ? "-" : stats.total}</p>
        </div>
        <div className="rounded-xl border border-sky-400/20 bg-sky-500/5 p-4">
          <p className="text-xs text-sky-200/80">Open</p>
          <p className="mt-2 text-2xl font-semibold text-sky-300">
            {loading ? "-" : stats.open}
          </p>
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-4">
          <p className="text-xs text-amber-200/80">In Progress</p>
          <p className="mt-2 text-2xl font-semibold text-amber-300">
            {loading ? "-" : stats.inProgress}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
          <p className="text-xs text-emerald-200/80">Resolved</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            {loading ? "-" : stats.resolved}
          </p>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center text-white/60">
          Gathering your records...
        </div>
      )}

      {!loading && tickets.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center">
          <Ticket size={28} className="mx-auto text-white/40" />
          <p className="mt-3 text-white/60">No tickets yet.</p>
        </div>
      )}

      {!loading && tickets.length > 0 && (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicket(ticket)}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-5 text-left transition hover:border-orange-400/40"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{ticket.title}</h3>
                  <p className="mt-1 text-sm text-white/55">
                    {new Date(ticket.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${
                      statusStyles[ticket.status] ||
                      "border-white/20 bg-white/5 text-white/75"
                    }`}
                  >
                    <CircleDot size={12} />
                    {ticket.status?.replace("_", " ")}
                  </span>
                  {ticket.priority && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                      <Clock3 size={12} />
                      {ticket.priority}
                    </span>
                  )}
                  {ticket.status !== "RESOLVED" && ticket.status !== "CLOSED" && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                      <CheckCircle2 size={12} />
                      Click to resolve
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <MarkTicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onConfirm={handleResolve}
      />
    </div>
  );
}

export default MyTickets;
