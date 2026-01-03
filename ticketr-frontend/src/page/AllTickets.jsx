import { useEffect, useState } from "react";
import { allTickets } from "../api/ticket";
import AssignTicketModal from "../component/AssignTicketModal";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = async () => {
    setLoading(true);
    const res = await allTickets();
    setTickets(res.data.content ?? res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-white mb-8">
        All Tickets (Admin)
      </h1>

      {loading && <p className="text-white/60">Loading…</p>}

      {!loading &&
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket)}
            className="cursor-pointer bg-black border border-white/10 rounded-xl p-5 mb-4 hover:border-orange-500/50 transition"
          >
            <h3 className="text-white text-lg">{ticket.title}</h3>
            <p className="text-white/50 text-sm">
              {new Date(ticket.createdAt).toLocaleString()}
            </p>
            <div className="mt-2 text-xs text-white/60">
              {ticket.status} • {ticket.priority}
            </div>
          </div>
        ))}

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
