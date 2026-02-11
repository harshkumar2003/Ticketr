import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Ticket,
  Clock3,
  Users,
  BellRing,
  BarChart3,
  CheckCircle2,
  Headset,
} from "lucide-react";

const featureCards = [
  {
    title: "Smart Ticket Lifecycle",
    description:
      "Create, assign, resolve, and close tickets with clear ownership and status history.",
    icon: Ticket,
  },
  {
    title: "Priority-Driven Workflow",
    description:
      "Surface urgent incidents first so your team can act on what matters immediately.",
    icon: Clock3,
  },
  {
    title: "Team Collaboration",
    description:
      "Track responsibilities across users and admins without losing context.",
    icon: Users,
  },
  {
    title: "Live Visibility",
    description:
      "Use dashboards and status boards to monitor delivery and bottlenecks in real time.",
    icon: BarChart3,
  },
  {
    title: "Reliable Updates",
    description:
      "Keep everyone informed with transparent progress and accountability on each ticket.",
    icon: BellRing,
  },
  {
    title: "Secure Access",
    description:
      "Role-based permissions protect operational controls for users and administrators.",
    icon: ShieldCheck,
  },
];

const steps = [
  "Log issues with clear priority and details.",
  "Assign ownership and monitor ticket movement.",
  "Resolve faster with complete status tracking.",
  "Close confidently with an auditable workflow.",
];

function Home() {
  return (
    <div className="bg-black text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_5%,rgba(249,115,22,.2),transparent_55%),radial-gradient(700px_450px_at_0%_100%,rgba(234,88,12,.18),transparent_50%)]" />
        <div className="mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-12">
          <span className="mb-6 inline-flex w-fit rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
            Ticket Management Platform
          </span>

          <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            One workspace for raising, routing, and resolving every support issue.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
            Ticketr helps teams handle requests with speed and control, from first report
            to final closure.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-orange-400"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-orange-400/50 hover:bg-orange-500/10"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-1 gap-3 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Role-based access</div>
            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">End-to-end ticket flow</div>
            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">Clear operational insight</div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
              Features
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Built for support teams that move fast</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 transition hover:border-orange-400/40"
            >
              <div className="mb-4 inline-flex rounded-xl border border-orange-400/30 bg-orange-500/10 p-2 text-orange-300">
                {React.createElement(feature.icon, { size: 20 })}
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="border-y border-white/10 bg-zinc-950/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">About</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">From incoming request to clean closure</h2>
            <p className="mt-5 max-w-xl text-zinc-300">
              Ticketr structures your incident workflow so stakeholders always know what is
              open, who owns it, and what happens next.
            </p>
          </div>

          <ol className="space-y-4">
            {steps.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-orange-300" />
                <span className="text-sm text-zinc-200">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="rounded-2xl border border-orange-400/20 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Contact</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Need a better support workflow?</h2>
            <p className="mt-4 text-zinc-300">
              Start with Ticketr and give your team one reliable place to operate ticket flow.
            </p>
          </div>
          <div className="mt-6 flex gap-3 lg:mt-0">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-orange-400"
            >
              Create Account
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-orange-400/40 hover:bg-orange-500/10"
            >
              <Headset size={16} />
              Login
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-zinc-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-zinc-400 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="text-base font-semibold text-white">Ticketr</p>
            <p className="mt-1">Simple ticket tracking for fast support teams.</p>
          </div>

          <div className="flex flex-wrap gap-4 text-zinc-300">
            <a href="#features" className="hover:text-orange-300 transition">
              Features
            </a>
            <a href="#about" className="hover:text-orange-300 transition">
              About
            </a>
            <a href="#contact" className="hover:text-orange-300 transition">
              Contact
            </a>
            <Link to="/login" className="hover:text-orange-300 transition">
              Login
            </Link>
          </div>

          <p className="text-zinc-500">
            {new Date().getFullYear()} Ticketr. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
