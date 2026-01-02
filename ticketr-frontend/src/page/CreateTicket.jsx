import { useState } from "react";
import { createTickets } from "../api/ticket";

function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, priority } = formData;
      await createTickets(title, description, priority);
      setFormData({ title: "", description: "", priority: "" });
    } catch (err) {
      console.error("Create ticket failed:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="bg-black border border-orange-500/50 rounded-2xl p-8">
        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-white">Create Ticket</h2>
        <p className="text-sm text-white/60 mt-1">
          Write clearly. Good tickets get solved faster.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 cursor-pointer">
          {/* TITLE */}
          <div className="">
            <label className="block text-sm font-medium text-white mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Short, clear summary"
              className="
                w-full rounded-xl px-4 py-3
                bg-black border border-white/40
                text-white placeholder-white/40
                focus:outline-none focus:border-orange-500
                focus:shadow-[0_0_0_2px_rgba(249,115,22,0.35)]
              "
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Explain the issue in detail…"
              className="
                w-full rounded-xl px-4 py-3
                bg-black border border-white/40
                text-white placeholder-white/40
                resize-none
                focus:outline-none focus:border-orange-500
                focus:shadow-[0_0_0_2px_rgba(249,115,22,0.35)]
              "
              required
            />
          </div>

          {/* PRIORITY */}
          <div className="">
            <label className="block text-sm font-medium text-white mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="
                w-full rounded-xl px-4 py-3
                bg-black border border-white/40
                text-white
                focus:outline-none focus:border-orange-500
                focus:shadow-[0_0_0_2px_rgba(249,115,22,0.35)]
              "
              required
            >
              <option value="" className="bg-black">
                Select priority
              </option>
              <option value="LOW" className="bg-black">
                Low
              </option>
              <option value="MEDIUM" className="bg-black">
                Medium
              </option>
              <option value="HIGH" className="bg-black">
                High
              </option>
            </select>
          </div>

          {/* ACTION */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="
                px-6 py-3 rounded-xl
                bg-orange-500 text-black font-semibold

                hover:
                transition
                cursor-pointer
              "
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
