import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-white/10 rounded-2xl bg-zinc-950 p-8 text-center">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="mt-3 text-white/70">
          You do not have permission to view this page.
        </p>
        <Link
          to="/dashboard"
          className="inline-block mt-6 rounded-xl bg-orange-500 px-5 py-3 text-black font-semibold hover:bg-orange-400 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
