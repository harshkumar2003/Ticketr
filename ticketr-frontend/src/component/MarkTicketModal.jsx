function MarkTicketModal({ ticket, onClose, onConfirm }) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-black border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white">
          Mark Ticket as Resolved
        </h2>

        <p className="text-white/60 mt-2 text-sm">
          <span className="font-medium text-white">Title:</span> {ticket.title}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400"
          >
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarkTicketModal;
