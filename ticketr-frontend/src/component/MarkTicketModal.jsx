import { CheckCircle2 } from "lucide-react";

function MarkTicketModal({ ticket, onClose, onConfirm }) {
  if (!ticket) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          <CheckCircle2 size={18} className="text-emerald-300" />
          Mark Ticket as Resolved
        </h2>

        <p className="mt-3 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/70">
          <span className="font-medium text-white">Title:</span> {ticket.title}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-black transition hover:bg-green-400"
          >
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarkTicketModal;
