import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { register } from "../api/auth.js";

function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData.name, formData.email, formData.password);
      setFormData({ name: "", email: "", password: "" });
      toast.success("Account created. Please login.");
      navigate("/login");
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#0F0F0F] border border-orange-500/20 rounded-3xl p-8 shadow-[0_0_60px_rgba(255,120,0,0.15)]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mb-5">Join to start raising tickets</p>
        </div>

        <form className="flex flex-col text-md space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-sm text-gray-400">
            Full Name
          </label>
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
            <User size={18} className="text-orange-500" />
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="John Doe"
              autoComplete="name"
              className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              required
            />
          </div>

          <label htmlFor="email" className="text-sm text-gray-400">
            Email
          </label>
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 mt-1 has-focus:border-orange-500/50 transition-colors">
            <Mail size={18} className="text-orange-500" />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="you@example.com"
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
              onChange={handleChange}
              value={formData.password}
              placeholder="Create a password"
              autoComplete="new-password"
              className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-semibold bg-orange-500 text-black hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:text-orange-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
