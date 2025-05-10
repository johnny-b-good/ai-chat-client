import { streamText } from "ai";

import { openai } from "@/app/lib/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gemma3:4b"),
    messages,
    onError: (err) => {
      console.log(err);
    },
  });

  return result.toDataStreamResponse();
}
