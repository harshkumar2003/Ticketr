import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleDot } from "lucide-react";
import toast from "react-hot-toast";
import { assignedTickets, markTicketResolved } from "../api/ticket";
import MarkTicketModal from "../component/MarkTicketModal";

function ResolveTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await assignedTickets();
        setTickets(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        const message = err.response?.data?.message || "Failed to load tickets.";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const resolvableTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      return ticket.status === "OPEN" || ticket.status === "IN_PROGRESS";
    });
  }, [tickets]);

  const handleResolve = async () => {
    if (!selectedTicket) return;

    try {
      setUpdating(true);
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
      const message = err.response?.data?.message || "Could not resolve ticket.";
      setError(message);
      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
          Workflow
        </p>
        <h1 className="mt-2 text-3xl font-bold">Resolve Tickets</h1>
        <p className="mt-2 text-sm text-white/60">
          Mark active assigned tickets as resolved when work is completed.
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

      {!loading && resolvableTickets.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center">
          <CheckCircle2 size={28} className="mx-auto text-white/40" />
          <p className="mt-3 text-white/60">No tickets available to resolve.</p>
        </div>
      )}

      {!loading && resolvableTickets.length > 0 && (
        <div className="space-y-3">
          {resolvableTickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicket(ticket)}
              disabled={updating}
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-5 text-left transition hover:border-emerald-400/40 disabled:opacity-70"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{ticket.title}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Assigned to: {ticket.assignedTo || "Unassigned"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
                    <CircleDot size={12} />
                    {ticket.status.replace("_", " ")}
                  </span>
                  <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                    {ticket.priority}
                  </span>
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

export default ResolveTicket;
