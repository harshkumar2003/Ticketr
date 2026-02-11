import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ClipboardList, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { createTickets } from "../api/ticket";

const priorityStyles = {
  HIGH: "border-red-400/40 bg-red-500/10 text-red-300",
  MEDIUM: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  LOW: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
};

function CreateTicket() {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const completion = useMemo(() => {
    const checks = [
      formData.title.trim().length >= 5,
      formData.description.trim().length >= 15,
      Boolean(formData.priority),
    ];
    const done = checks.filter(Boolean).length;
    return Math.round((done / checks.length) * 100);
  }, [formData.description, formData.priority, formData.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const title = formData.title.trim();
    const description = formData.description.trim();
    const priority = formData.priority;

    if (!title || !description || !priority) {
      toast.error("Please fill all fields.");
      return;
    }
    if (title.length < 5) {
      toast.error("Title should be at least 5 characters.");
      return;
    }
    if (description.length < 15) {
      toast.error("Description should be at least 15 characters.");
      return;
    }

    try {
      setSubmitting(true);
      await createTickets(title, description, priority);
      setFormData({ title: "", description: "", priority: "" });
      toast.success("Ticket created successfully");
    } catch (err) {
      const message = err?.response?.data?.message || "Create ticket failed.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_300px_at_0%_0%,rgba(249,115,22,0.14),transparent_60%)]" />

        <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300">
              Ticket Desk
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">Create Ticket</h1>
            <p className="mt-2 text-sm text-white/60">
              Share clear context so issues get solved faster.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
            Form completion:{" "}
            <span className="font-semibold text-orange-300">{completion}%</span>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6"
          >
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Short and clear summary"
                  maxLength={100}
                  className="w-full rounded-xl border border-white/20 bg-zinc-950 px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_0_2px_rgba(249,115,22,0.35)]"
                  required
                />
                <p className="mt-2 text-xs text-white/50">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Describe what happened, where, and expected result."
                  maxLength={1000}
                  className="w-full resize-none rounded-xl border border-white/20 bg-zinc-950 px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:border-orange-500 focus:shadow-[0_0_0_2px_rgba(249,115,22,0.35)]"
                  required
                />
                <p className="mt-2 text-xs text-white/50">
                  {formData.description.length}/1000 characters
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Priority
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {["HIGH", "MEDIUM", "LOW"].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, priority }))
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        formData.priority === priority
                          ? priorityStyles[priority]
                          : "border-white/15 bg-zinc-950 text-white/70 hover:border-white/30"
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="sr-only"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ title: "", description: "", priority: "" })
                  }
                  disabled={submitting}
                  className="rounded-xl border border-white/20 px-6 py-3 text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </div>
          </form>

          <aside className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Sparkles size={18} className="text-orange-300" />
              Live Preview
            </h2>

            <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950 p-4">
              <p className="text-sm text-white/50">Title</p>
              <p className="mt-1 font-medium text-white">
                {formData.title.trim() || "No title yet"}
              </p>
              <p className="mt-4 text-sm text-white/50">Priority</p>
              <span
                className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs ${
                  priorityStyles[formData.priority] ||
                  "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                {formData.priority || "Not selected"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/10 bg-zinc-950 p-3">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  Good Ticket Tips
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Mention exact page, action, and error behavior.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950 p-3">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <ClipboardList size={16} className="text-sky-300" />
                  Add Context
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Include screenshot references and reproduction steps.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-zinc-950 p-3">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <AlertTriangle size={16} className="text-amber-300" />
                  Set Priority Right
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Use HIGH only for blockers or production-impacting issues.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default CreateTicket;
