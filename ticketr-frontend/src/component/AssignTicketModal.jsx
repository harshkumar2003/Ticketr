import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { getAllUsers } from "../api/auth.js";
import { assignTicket } from "../api/ticket";

function AssignTicketModal({ ticket, onClose, onAssigned }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setFetchingUsers(true);
        const res = await getAllUsers();
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        const message = err?.response?.data?.message || "Could not load users.";
        toast.error(message);
        setUsers([]);
      } finally {
        setFetchingUsers(false);
      }
    };

    setSelectedUser("");
    fetchUsers();
  }, [ticket]);

  const handleAssign = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await assignTicket(ticket.id, selectedUser);
      toast.success("Ticket assigned successfully");
      onAssigned();
      onClose();
    } catch (err) {
      const message = err?.response?.data?.message || "Assign failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          <UserPlus size={18} className="text-orange-300" />
          Assign Ticket
        </h2>

        <p className="mt-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/70">
          {ticket.title}
        </p>

        <label className="mt-5 block text-sm text-white/70">Select user</label>
        <select
          className="mt-2 w-full rounded-xl border border-white/20 bg-black px-3 py-3 text-white disabled:opacity-60"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          disabled={fetchingUsers}
        >
          <option value="">
            {fetchingUsers ? "Loading users..." : "Choose user"}
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.email} ({user.email})
            </option>
          ))}
        </select>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading || fetchingUsers || !selectedUser}
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignTicketModal;
