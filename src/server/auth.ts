import { env, redis } from "bun";

let testMode = env.NODE_ENV == "development";

export async function authorized(req: Request) {
  if (testMode) return true;
  const key = req.headers.get("X-API-Key");
  if (!key) return false;
  return !!(await redis.get(`keys:${key}`));
}
