import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const role = user?.role || localStorage.getItem("role");

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center">
        <div className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-2 text-sm text-white/70">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
