"use client";
import { triggerKillSwitch } from "../actions";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { Cpu, Server, TrendingUp, DollarSign, List } from "lucide-react";

// --- TYPES ---
interface TradePosition {
  symbol: string;
  type: string;
  profit: number;
  price: number;
}

interface Bot {
  bot_name: string;
  status: string;
  cpu: number;
  ram: number;
  open_trades: number;
  last_profit: number;
  equity: number;
  balance: number;
  active_positions?: TradePosition[];
  timestamp: number;
}

interface BotHistory {
  [botName: string]: { time: string; equity: number }[];
}

export default function BotGrid({ initialBots }: { initialBots: any[] }) {
  const [bots, setBots] = useState<Record<string, Bot>>(() => {
    const map: Record<string, Bot> = {};
    initialBots.forEach((b) => (map[b.bot_name] = b));
    return map;
  });

  const [history, setHistory] = useState<BotHistory>({});

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("bot-fleet");

    channel.bind("heartbeat-event", (data: Bot) => {
      setBots((prev) => ({ ...prev, [data.bot_name]: data }));

      setHistory((prev) => {
        const botHist = prev[data.bot_name] || [];
        const timeStr = new Date(data.timestamp * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const newHist = [...botHist, { time: timeStr, equity: data.equity }];
        if (newHist.length > 20) newHist.shift();

        return { ...prev, [data.bot_name]: newHist };
      });
    });

    return () => {
      pusher.unsubscribe("bot-fleet");
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.values(bots).map((bot) => (
        <BotCard
          key={bot.bot_name}
          bot={bot}
          history={history[bot.bot_name] || []}
        />
      ))}
    </div>
  );
}

function BotCard({ bot, history }: { bot: Bot; history: any[] }) {
  const isStale = Date.now() / 1000 - bot.timestamp > 30;
  const statusText = isStale ? "SIGNAL LOST" : bot.status.replace("_", " ");

  return (
    <div
      className={`rounded-xl border transition-all duration-500 overflow-hidden bg-slate-900 ${
        isStale ? "border-red-900/50" : "border-blue-900/30"
      }`}
    >
      return (
      <div className="...">
        {/* ... Header Section ... */}
        <div className="p-6 pb-2 flex justify-between items-start">
          <div>{/* ... Bot Name ... */}</div>

          <div className="flex flex-col items-end gap-2">
            {/* The Equity Number */}
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider text-right">
                Equity
              </p>
              <p className="text-2xl font-mono font-bold text-white">
                ${bot.equity?.toFixed(2) || "0.00"}
              </p>
            </div>

            {/* 🔴 THE KILL SWITCH BUTTON */}
            {!isStale && (
              <button
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure you want to STOP ${bot.bot_name}? This will close all trades.`
                    )
                  ) {
                    triggerKillSwitch(bot.bot_name);
                  }
                }}
                className="bg-red-900/30 hover:bg-red-600 text-red-500 hover:text-white text-xs font-bold px-3 py-1 rounded border border-red-900/50 transition-colors"
              >
                ⛔ KILL SWITCH
              </button>
            )}
          </div>
        </div>
        {/* ... Rest of card ... */}
      </div>
      );
      {/* HEADER */}
      <div className="p-6 pb-2 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            {bot.bot_name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded ${
                isStale
                  ? "bg-red-900/50 text-red-200"
                  : "bg-green-900/50 text-green-400"
              }`}
            >
              {statusText}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs uppercase tracking-wider">
            Equity
          </p>
          <p className="text-2xl font-mono font-bold text-white">
            ${bot.equity?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
      {/* GRAPH AREA */}
      <div className="h-32 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient
                id={`colorEq-${bot.bot_name}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
              }}
              itemStyle={{ color: "#fff" }}
              // --- THIS IS THE FIXED LINE ---
              formatter={(value: any) => [
                `$${Number(value).toFixed(2)}`,
                "Equity",
              ]}
            />
            <Area
              type="monotone"
              dataKey="equity"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorEq-${bot.bot_name})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* METRICS GRID */}
      <div className="grid grid-cols-2 gap-4 p-6 border-t border-slate-800/50 bg-slate-900/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <Cpu size={14} /> CPU
            </span>
            <span className={bot.cpu > 80 ? "text-red-400" : "text-slate-200"}>
              {bot.cpu}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <Server size={14} /> RAM
            </span>
            <span className="text-slate-200">{bot.ram}%</span>
          </div>
        </div>
        <div className="space-y-3 border-l border-slate-800 pl-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <TrendingUp size={14} /> Trades
            </span>
            <span className="text-white font-bold">{bot.open_trades}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <DollarSign size={14} /> Last PnL
            </span>
            <span
              className={
                bot.last_profit >= 0 ? "text-emerald-400" : "text-red-400"
              }
            >
              ${bot.last_profit?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* ACTIVE TRADES LIST */}
      {bot.active_positions && bot.active_positions.length > 0 && (
        <div className="bg-slate-950/50 p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-3 text-xs uppercase text-slate-500 font-bold tracking-wider">
            <List size={14} /> Active Positions
          </div>
          <div className="space-y-2">
            {bot.active_positions.map((trade, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm font-mono bg-slate-900 p-2 rounded border border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      trade.type === "BUY" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {trade.type}
                  </span>
                  <span className="text-slate-300">{trade.symbol}</span>
                </div>
                <span
                  className={
                    trade.profit >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  ${trade.profit.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
