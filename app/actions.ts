"use server";

import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function triggerKillSwitch(botName: string) {
  // FIX: We now wrap the command in a JSON object and stringify it
  // This ensures it is stored as '{"action":"STOP"}' in the database
  const payload = JSON.stringify({ action: "STOP" });

  await redis.set(`cmd:${botName}`, payload);
  console.log(`💥 Kill command sent to ${botName}`);
  revalidatePath("/");
}
