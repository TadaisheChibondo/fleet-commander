import Link from "next/link";
import Image from "next/image"; // <--- NEW IMPORT
import {
  Github,
  Linkedin,
  Globe,
  Cpu,
  Layers,
  Code,
  ArrowLeft,
  ExternalLink,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      {/* NAVIGATION HEADER */}
      <header className="max-w-4xl mx-auto mb-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-mono text-sm tracking-wide">
            RETURN TO FLEET
          </span>
        </Link>
        <div className="px-3 py-1 bg-blue-900/20 border border-blue-800/50 rounded-full text-xs text-blue-400 font-mono tracking-wider">
          SYSTEM ARCHITECT_
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* PROFILE PICTURE */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-800">
              <Image
                src="https://github.com/TadaisheChibondo.png"
                alt="Tadaishe Chibondo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Tadaishe Chibondo
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              Full-stack developer and algorithmic trader specializing in
              high-frequency trading systems, real-time telemetry, and scalable
              web architectures.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap gap-4 mt-4">
              <SocialButton
                href="https://github.com/TadaisheChibondo"
                icon={<Github size={18} />}
                label="GitHub"
              />
              <SocialButton
                href="https://www.linkedin.com/in/tadaishe-chibondo-915247349"
                icon={<Linkedin size={18} />}
                label="LinkedIn"
              />
              <SocialButton
                href="https://tadaishe-portfolio.onrender.com"
                icon={<Globe size={18} />}
                label="Portfolio"
              />
            </div>
          </div>
        </section>

        {/* TECH STACK VISUALIZER */}
        <section>
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Cpu size={16} /> Technical Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TRADING ENGINE */}
            <TechCard
              title="Algorithmic Core"
              icon={<Terminal className="text-emerald-400" />}
              gradient="from-emerald-900/20 to-slate-900"
              items={[
                "Python 3.11",
                "MetaTrader 5 API",
                "Pandas & Pandas-TA",
                "NumPy & SciPy",
                "Requests (Telemetry)",
                "Asynchronous Threading",
              ]}
            />

            {/* DASHBOARD INFRASTRUCTURE */}
            <TechCard
              title="Telemetry Dashboard"
              icon={<Layers className="text-blue-400" />}
              gradient="from-blue-900/20 to-slate-900"
              items={[
                "Next.js 14 (App Router)",
                "TypeScript",
                "Tailwind CSS",
                "Recharts (Data Viz)",
                "Upstash Redis (Serverless DB)",
                "Pusher (Real-time WebSockets)",
              ]}
            />
          </div>
        </section>

        {/* OTHER PROJECTS */}
        <section>
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Code size={16} /> Deployed Systems
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectCard
              title="Campus Marketplace"
              desc="A comprehensive e-commerce platform for student-to-student trading."
              href="https://campus-market-psi.vercel.app"
              tags={["Next.js", "E-commerce", "Vercel"]}
            />
            <ProjectCard
              title="Campus Accommodation"
              desc="Real-time booking and listing engine for university housing."
              href="https://campus-accomodation.vercel.app"
              tags={["Real Estate", "Next.js", "Booking System"]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-all text-sm font-medium"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function TechCard({
  title,
  icon,
  items,
  gradient,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  gradient: string;
}) {
  return (
    <div
      className={`p-6 rounded-xl border border-slate-800 bg-gradient-to-br ${gradient}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/50">
          {icon}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs font-mono bg-slate-950/50 text-slate-400 border border-slate-800/50 px-2 py-1 rounded"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  desc,
  href,
  tags,
}: {
  title: string;
  desc: string;
  href: string;
  tags: string[];
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:bg-slate-800/50"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-200 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <ExternalLink
          size={16}
          className="text-slate-600 group-hover:text-blue-400 transition-colors"
        />
      </div>
      <p className="text-slate-400 text-sm mb-4">{desc}</p>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase font-bold text-slate-500 tracking-wider"
          >
            #{tag}
          </span>
        ))}
      </div>
    </a>
  );
}
