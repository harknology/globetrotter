import { pipeline } from "@huggingface/transformers";

const model = await pipeline(
  "translation",
  "Xenova/mbart-large-50-many-to-many-mmt",
);

export default async function translate(
  from: string,
  to: string,
  text: string,
) {
  return await model(text, { src_lang: from, tgt_lang: to } as any);
}
