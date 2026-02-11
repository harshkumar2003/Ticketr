import { useMemo, useState } from "react";
import { Bell, LogOut, Shield, UserCircle2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../api/auth.js";
import { useAuth } from "../context/useAuth.jsx";

function Settings() {
  const { user, setUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState({
    emailUpdates: localStorage.getItem("pref_email_updates") !== "false",
    compactCards: localStorage.getItem("pref_compact_cards") === "true",
  });

  const initials = useMemo(() => {
    return user?.email?.charAt(0)?.toUpperCase() || "U";
  }, [user]);

  const setTab = (tab) => {
    setSearchParams({ tab });
  };

  const handleToggle = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    setSaving(true);
    localStorage.setItem("pref_email_updates", String(prefs.emailUpdates));
    localStorage.setItem("pref_compact_cards", String(prefs.compactCards));

    setTimeout(() => {
      setSaving(false);
      toast.success("Preferences saved");
    }, 250);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("role");
      setUser(false);
      toast.success("Logged out");
      window.location.assign("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <section className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950 to-black p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Account</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">Settings</h1>
        <p className="mt-2 text-sm text-white/60">
          Manage your profile details and interface preferences.
        </p>
      </section>

      <div className="mb-6 inline-flex rounded-xl border border-white/10 bg-zinc-950 p-1">
        <button
          type="button"
          onClick={() => setTab("profile")}
          className={`rounded-lg px-4 py-2 text-sm transition ${
            currentTab === "profile"
              ? "bg-orange-500 text-black font-semibold"
              : "text-white/70 hover:text-white"
          }`}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => setTab("preferences")}
          className={`rounded-lg px-4 py-2 text-sm transition ${
            currentTab === "preferences"
              ? "bg-orange-500 text-black font-semibold"
              : "text-white/70 hover:text-white"
          }`}
        >
          Preferences
        </button>
      </div>

      {currentTab === "profile" && (
        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-orange-500 text-black font-bold text-xl flex items-center justify-center">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Account Profile</h2>
              <p className="text-sm text-white/60">
                Information fetched from your authenticated session.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wider text-white/50">Email</p>
              <p className="mt-2 flex items-center gap-2 font-medium">
                <UserCircle2 size={16} className="text-orange-300" />
                {user?.email || "-"}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wider text-white/50">Role</p>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">
                <Shield size={14} />
                {user?.role || "-"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-5 py-3 text-white font-semibold transition hover:bg-red-500"
          >
            <LogOut size={16} />
            Logout
          </button>
        </section>
      )}

      {currentTab === "preferences" && (
        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold">Interface Preferences</h2>
          <p className="mt-1 text-sm text-white/60">
            These preferences are stored in this browser.
          </p>

          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4">
              <span className="inline-flex items-center gap-2">
                <Bell size={16} className="text-orange-300" />
                Email updates
              </span>
              <input
                type="checkbox"
                checked={prefs.emailUpdates}
                onChange={() => handleToggle("emailUpdates")}
                className="h-4 w-4 accent-orange-500"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4">
              <span>Compact ticket cards</span>
              <input
                type="checkbox"
                checked={prefs.compactCards}
                onChange={() => handleToggle("compactCards")}
                className="h-4 w-4 accent-orange-500"
              />
            </label>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={handleSavePreferences}
            className="mt-6 rounded-xl bg-orange-500 px-5 py-3 text-black font-semibold transition hover:bg-orange-400 disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </section>
      )}
    </div>
  );
}

export default Settings;
