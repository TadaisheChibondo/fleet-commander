import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Database,
  Globe,
  Shield,
  Zap,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* NAVIGATION */}
      <nav className="p-6 border-b border-slate-800/50 sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-mono font-bold"
          >
            <ArrowLeft size={16} /> RETURN TO COCKPIT
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* HEADER */}
        <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
            <Terminal className="text-blue-500" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Fleet Commander <span className="text-blue-500">System</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            A real-time telemetry and command architecture designed to
            orchestrate autonomous algorithmic trading agents across distributed
            environments.
          </p>
        </header>

        {/* TECH STACK GRID */}
        <section className="mb-16">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">
            System Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TechCard
              icon={<Zap className="text-yellow-400" />}
              title="Real-Time Telemetry"
              desc="Sub-second latency updates via WebSocket channels using Pusher."
            />
            <TechCard
              icon={<Database className="text-red-400" />}
              title="State Persistence"
              desc="Serverless Redis implementation for distributed state management and signal mailboxing."
            />
            <TechCard
              icon={<Cpu className="text-blue-400" />}
              title="Multi-Threaded Agents"
              desc="Python-based non-blocking sidecar threads injected into MT5 trading loops."
            />
            <TechCard
              icon={<Shield className="text-green-400" />}
              title="Remote Kill Switch"
              desc="Emergency command override protocol enabling remote trade liquidation."
            />
          </div>
        </section>

        {/* THE STORY (Why you built it) */}
        <section className="prose prose-invert prose-slate max-w-none border-t border-slate-800 pt-12">
          <h3 className="text-2xl font-bold text-white mb-4">The Mission</h3>
          <p>
            Algorithmic trading often suffers from the "Black Box" problem: bots
            run silently on remote servers, and failures are only detected when
            equity drops.
          </p>
          <p>
            **Fleet Commander** solves this by decoupling the *monitoring* from
            the *execution*. Using an Event-Driven Architecture (EDA), trading
            bots push vital stats (CPU, RAM, Open Trades) to a centralized
            dashboard, allowing for oversight without needing to RDP into remote
            VPS instances.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm font-mono">
          BUILT BY TADAISHE CHIBONDO // 2026
        </footer>
      </div>
    </main>
  );
}

function TechCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
      <div className="mb-3">{icon}</div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}
