import { useEffect, useState } from "react";
import { getAllUsers } from "../api/auth.js";
import { assignTicket } from "../api/ticket";

function AssignTicketModal({ ticket, onClose, onAssigned }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data));
  }, []);

  const handleAssign = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await assignTicket(ticket.id, selectedUser);
      onAssigned(); // refresh tickets
      onClose();
    } catch (err) {
      console.error("Assign failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black border border-white/10 rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Assign Ticket</h2>

        <p className="text-white/60 mb-4">{ticket.title}</p>

        <select
          className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/20 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-orange-500 text-black font-semibold"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignTicketModal;
