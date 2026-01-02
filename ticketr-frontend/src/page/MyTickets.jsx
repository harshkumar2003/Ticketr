import { useEffect, useState } from "react";
import { myTicket } from "../api/ticket.js";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

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

      {/* Empty State */}
      {!loading && tickets.length === 0 && (
        <div className="border border-white/10 rounded-xl p-12 text-center text-white/60">
          No tickets yet.
          <br />
          When a problem arises, this is where it will rest.
        </div>
      )}

      {/* Ticket List */}
      {!loading && tickets.length > 0 && (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-black border border-white/10 rounded-xl p-5
                         hover:border-orange-500/50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-white/50 mt-1">
                    Created on {ticket.description}
                  </p>
                  <p className="text-sm text-white/50 mt-1">
                    Created on{" "}
                    {new Date(ticket.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                      ${
                        ticket.priority === "HIGH"
                          ? "bg-red-500/20 text-red-400"
                          : ticket.priority === "MEDIUM"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                  >
                    {ticket.priority}
                  </span>

                  <div className="text-xs text-white/60">
                    {ticket.status.replace("_", " ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
