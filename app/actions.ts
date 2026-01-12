"use server";

import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function triggerKillSwitch(botName: string, secret: string) {
  // 1. SECURITY CHECK
  // We compare the secret sent from the button against the real one in Vercel
  if (secret !== process.env.ADMIN_SECRET) {
    console.log(`⚠️ Unauthorized Kill Switch attempt on ${botName}`);
    return { success: false, message: "⛔ INCORRECT PASSWORD" };
  }

  // 2. EXECUTE COMMAND (Only if password matches)
  const payload = JSON.stringify({ action: "STOP" });

  await redis.set(`cmd:${botName}`, payload);
  console.log(`💥 Kill command sent to ${botName}`);
  revalidatePath("/");
  return { success: true, message: "💥 COMMAND SENT" };
}
