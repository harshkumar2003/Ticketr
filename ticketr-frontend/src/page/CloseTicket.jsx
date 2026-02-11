import { useEffect, useMemo, useState } from "react";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { allTickets, markclose } from "../api/ticket";

function CloseTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [closingId, setClosingId] = useState(null);

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

  const closableTickets = useMemo(() => {
    return tickets.filter((ticket) => ticket.status === "RESOLVED");
  }, [tickets]);

  const handleCloseTicket = async (ticketId) => {
    try {
      setClosingId(ticketId);
      await markclose(ticketId);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: "CLOSED" } : ticket,
        ),
      );
      toast.success("Ticket closed successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Could not close ticket.";
      setError(message);
      toast.error(message);
    } finally {
      setClosingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">Close Tickets</h1>
        <p className="mt-2 text-sm text-white/60">
          Close tickets that are verified as resolved and completed.
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

      {!loading && closableTickets.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center">
          <Lock size={28} className="mx-auto text-white/40" />
          <p className="mt-3 text-white/60">
            No resolved tickets available to close.
          </p>
        </div>
      )}

      {!loading && closableTickets.length > 0 && (
        <div className="space-y-3">
          {closableTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{ticket.title}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Assigned: {ticket.assignedTo || "Unassigned"}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCloseTicket(ticket.id)}
                  disabled={closingId === ticket.id}
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-black font-semibold transition hover:bg-orange-400 disabled:opacity-70"
                >
                  {closingId === ticket.id ? "Closing..." : "Close Ticket"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CloseTicket;
