import { Redis } from "@upstash/redis";
import BotGrid from "./components/BotGrid";
import { Activity } from "lucide-react";

// Connect to Database
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function Home() {
  // 1. Fetch all keys. If you have no bots running yet, this might be empty.
  const keys = await redis.keys("*");

  // FIX: We tell TypeScript this will hold 'any' type of data to stop the errors
  let initialBots: any[] = [];

  if (keys.length > 0) {
    // FIX: We use '...keys' (spread syntax) to pass the list correctly to Upstash
    initialBots = await redis.mget(...keys);
  }

  // Filter out any null results (in case a key was deleted)
  const validBots = initialBots
    .filter((b) => b !== null)
    .map((b) => (typeof b === "string" ? JSON.parse(b) : b));

  return (
    <main className="min-h-screen bg-slate-950 p-10 font-sans">
      <header className="mb-12 flex items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-3 bg-blue-600/20 rounded-lg">
          <Activity className="text-blue-500 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Fleet Commander
          </h1>
          <p className="text-slate-400">Real-time Trading Bot Telemetry</p>
        </div>
      </header>

      {/* Pass the data to the Client Component */}
      <BotGrid initialBots={validBots} />
    </main>
  );
}
