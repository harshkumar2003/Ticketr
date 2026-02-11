import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../api/auth.js";

function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await login(formData.email, formData.password);
      localStorage.setItem("role", res.data.role);
      setFormData({ email: "", password: "" });
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Check your credentials.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#0F0F0F] border border-orange-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(255,120,0,0.15)]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mb-5">Login to continue your work</p>
        </div>

        <form className="flex flex-col text-md space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm text-gray-400">
            Email
          </label>
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
            <Mail size={18} className="text-orange-500" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              required
            />
          </div>

          <label htmlFor="password" className="text-sm text-gray-400">
            Password
          </label>
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
            <LockKeyhole size={18} className="text-orange-500" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-semibold bg-orange-500 text-black hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:text-orange-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
