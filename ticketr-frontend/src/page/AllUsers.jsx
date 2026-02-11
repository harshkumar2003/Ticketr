import { useEffect, useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import toast from "react-hot-toast";
import { getAllUsers } from "../api/auth.js";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getAllUsers();
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        const message = err?.response?.data?.message || "Failed to load users.";
        setError(message);
        toast.error(message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return users;
    return users.filter((user) => {
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const role = (user.role || "").toLowerCase();
      return name.includes(text) || email.includes(text) || role.includes(text);
    });
  }, [query, users]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Admin</p>
        <h1 className="mt-2 text-3xl font-bold">All Users</h1>
        <p className="mt-2 text-sm text-white/60">
          Search and inspect all registered users in your workspace.
        </p>
      </section>

      <div className="mb-6">
        <div className="flex w-full items-center gap-2 rounded-xl border border-white/20 bg-zinc-950 px-4 py-3 sm:max-w-md">
          <Search size={16} className="text-white/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or role"
            className="w-full bg-transparent text-white placeholder-white/40 outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <p className="rounded-xl border border-white/10 bg-zinc-950 p-5 text-white/60">
          Loading users...
        </p>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-12 text-center">
          <Users size={28} className="mx-auto text-white/40" />
          <p className="mt-3 text-white/60">No users found.</p>
        </div>
      )}

      {!loading && filteredUsers.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950">
          <table className="min-w-full text-left">
            <thead className="border-b border-white/10 text-sm text-white/70">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id || user.email}
                  className="border-b border-white/5 text-sm transition hover:bg-white/[0.03] last:border-0"
                >
                  <td className="px-4 py-3">{user.name || "-"}</td>
                  <td className="px-4 py-3 text-white/80">{user.email || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs">
                      {user.role || "USER"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
