import { pipeline, type TranslationOutput } from "@huggingface/transformers";
import { env, redis } from "bun";

const model = await pipeline(
  "translation",
  "Xenova/mbart-large-50-many-to-many-mmt",
);

export default async function translate(
  from: string,
  to: string,
  text: string,
) {
  const cache_key = `translated:${from}:${to}:${text}`;
  if (env.NODE_ENV != "DEVELOPMENT") {
    const cached = await redis.get(cache_key);
    if (cached)
      return JSON.parse(cached) as TranslationOutput | TranslationOutput[];
  }
  const out = await model(text, { src_lang: from, tgt_lang: to } as any);
  if (env.NODE_ENV != "DEVELOPMENT") redis.set(cache_key, JSON.stringify(out));
  return out;
}
