import { useEffect, useMemo, useState } from "react";
import { CircleDot, Ticket, Users } from "lucide-react";
import toast from "react-hot-toast";
import { allTickets } from "../api/ticket";
import AssignTicketModal from "../component/AssignTicketModal";

const statusStyles = {
  OPEN: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  IN_PROGRESS: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  RESOLVED: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  CLOSED: "border-zinc-400/30 bg-zinc-500/10 text-zinc-300",
};

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await allTickets();
      const list = res.data.content ?? res.data;
      setTickets(Array.isArray(list) ? list : []);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to load tickets.";
      setError(message);
      toast.error(message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      unassigned: tickets.filter((ticket) => !ticket.assignedTo).length,
      open: tickets.filter((ticket) => ticket.status === "OPEN").length,
      inProgress: tickets.filter((ticket) => ticket.status === "IN_PROGRESS")
        .length,
    };
  }, [tickets]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">All Tickets</h1>
        <p className="mt-2 text-sm text-white/60">
          Review every incoming ticket and assign ownership quickly.
        </p>
      </section>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
          <p className="text-xs text-white/60">Total</p>
          <p className="mt-2 text-2xl font-semibold">{loading ? "-" : stats.total}</p>
        </div>
        <div className="rounded-xl border border-orange-400/20 bg-orange-500/5 p-4">
          <p className="text-xs text-orange-200/80">Unassigned</p>
          <p className="mt-2 text-2xl font-semibold text-orange-300">
            {loading ? "-" : stats.unassigned}
          </p>
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
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <p className="rounded-xl border border-white/10 bg-zinc-950 p-5 text-white/60">
          Loading tickets...
        </p>
      )}

      {!loading && tickets.length === 0 && !error && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center">
          <Ticket size={28} className="mx-auto text-white/40" />
          <p className="mt-3 text-white/60">No tickets found.</p>
        </div>
      )}

      {!loading && tickets.length > 0 && (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicket(ticket)}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-5 text-left transition hover:border-orange-500/50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{ticket.title}</h3>
                  <p className="mt-1 text-sm text-white/50">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-orange-300">
                    <Users size={12} />
                    Assigned: {ticket.assignedTo || "Unassigned"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${
                      statusStyles[ticket.status] ||
                      "border-white/20 bg-white/5 text-white/75"
                    }`}
                  >
                    <CircleDot size={12} />
                    {ticket.status}
                  </span>
                  {ticket.priority && (
                    <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                      {ticket.priority}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedTicket && (
        <AssignTicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onAssigned={fetchTickets}
        />
      )}
    </div>
  );
}

export default AllTickets;
