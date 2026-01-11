"use server";

import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function triggerKillSwitch(botName: string) {
  // Set the command key that the Python bot is listening for
  await redis.set(`cmd:${botName}`, "STOP");
  console.log(`💥 Kill command sent to ${botName}`);
  revalidatePath("/");
}
