import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const openai = createOpenAICompatible({
  name: process.env.OPENAI_PROVIDER ?? "",
  baseURL: process.env.OPENAI_BASE_URL ?? "",
  apiKey: process.env.OPENAI_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
  includeUsage: true,
});
