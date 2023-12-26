import { createClient } from "redis";

export const redis = createClient({ url: process.env.REDIS_URL || undefined });

redis.on("error", (err) => console.log("Error", err));

(async () => await redis.connect())();
