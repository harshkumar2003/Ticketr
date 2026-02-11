import { useEffect, useMemo, useState } from "react";
import { CircleDot, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import { allTickets } from "../api/ticket";
import AssignTicketModal from "../component/AssignTicketModal";

function AssignTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await allTickets();
      const list = res.data.content ?? [];
      setTickets(Array.isArray(list) ? list : []);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load tickets.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const assignableTickets = useMemo(() => {
    return tickets.filter(
      (ticket) => ticket.status === "OPEN" || ticket.status === "IN_PROGRESS",
    );
  }, [tickets]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">Assign Tickets</h1>
        <p className="mt-2 text-sm text-white/60">
          Select a ticket and assign ownership to the right teammate.
        </p>
      </section>

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

      {!loading && assignableTickets.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center">
          <UserCheck size={28} className="mx-auto text-white/40" />
          <p className="mt-3 text-white/60">No assignable tickets available.</p>
        </div>
      )}

      {!loading && assignableTickets.length > 0 && (
        <div className="space-y-3">
          {assignableTickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicket(ticket)}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-5 text-left transition hover:border-orange-400/40"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{ticket.title}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Assigned: {ticket.assignedTo || "Unassigned"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                    <CircleDot size={12} />
                    {ticket.status.replace("_", " ")}
                  </span>
                  <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                    {ticket.priority}
                  </span>
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

export default AssignTicket;
