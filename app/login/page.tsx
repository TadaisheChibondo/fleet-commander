"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate password via a simple API call
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ pass }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Fleet Commander
        </h1>
        <input
          type="password"
          placeholder="Access Code"
          className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white mb-4 focus:border-blue-500 outline-none"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors">
          ENTER
        </button>
      </form>
    </div>
  );
}
