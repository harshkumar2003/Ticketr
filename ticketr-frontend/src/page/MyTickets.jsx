import { useEffect, useState } from "react";
import { myTicket, markTicketResolved } from "../api/ticket.js";

import MarkTicketModal from "../component/MarkTicketModal";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await myTicket();
        setTickets(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleResolve = async () => {
    try {
      await markTicketResolved(selectedTicket.id);
      setTickets((prev) =>
        prev.map((t) =>
          t.id === selectedTicket.id ? { ...t, status: "RESOLVED" } : t,
        ),
      );
      setSelectedTicket(null);
    } catch (err) {
      console.log("Resolve failed", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">My Tickets</h1>
        <p className="text-white/60 mt-1">
          What you raised. What is being answered.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-white/60 text-center py-20">
          Gathering your records…
        </div>
      )}

      {/* Empty */}
      {!loading && tickets.length === 0 && (
        <div className="border border-white/10 rounded-xl p-12 text-center text-white/60">
          No tickets yet.
        </div>
      )}

      {/* Tickets */}
      {!loading && tickets.length > 0 && (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="cursor-pointer bg-black border border-white/10 rounded-xl p-5 hover:border-orange-500/50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">
                    {new Date(ticket.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    {ticket.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <MarkTicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onConfirm={handleResolve}
      />
    </div>
  );
}

export default MyTickets;
