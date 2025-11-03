import { NextRequest } from "next/server";
import { ProxyAgent, setGlobalDispatcher } from "undici";

export const runtime = "nodejs";

// Configure undici proxy for server-side fetch if provided
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
if (proxyUrl) {
  try {
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
    console.log(`[AI Proxy] Gemini route proxy enabled: ${proxyUrl}`);
  } catch (err) {
    console.warn(`[AI Proxy] Failed to enable proxy for Gemini route:`, err);
  }
} else {
  console.log(
    `[AI Proxy] No proxy configured for Gemini route. Set HTTPS_PROXY or HTTP_PROXY to enable.`
  );
}

/**
 * Forwards a prompt from the request body to Google's Generative Language (Gemini) API and returns the API response.
 *
 * @param req - Next.js request whose JSON body may include `prompt` (defaults to a sample story prompt) and optional `model` (e.g., `"gemini-2.5-flash"`). The handler resolves an API key from environment variables `GOOGLE_GENERATIVE_AI_API_KEY`, `GOOGLE_API_KEY`, or `GEMINI_API_KEY`.
 * @returns A Response containing the JSON body returned by the Gemini API on success. If the upstream response is non-2xx, returns that body with the upstream status; if no API key is configured or an internal error occurs, returns a JSON error object with HTTP status 500.
 */
export async function POST(req: NextRequest) {
  try {
    const { prompt = "Write a story about a magic backpack.", model } =
      await req.json();

    const key =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GEMINI_API_KEY;

    if (!key) {
      return Response.json(
        {
          error:
            "Missing Google API key. Set GOOGLE_GENERATIVE_AI_API_KEY or GOOGLE_API_KEY.",
        },
        { status: 500 }
      );
    }

    // Use stable v1 API and a valid model id
    const modelId = model || "gemini-2.5-flash"; // e.g., "gemini-1.5-pro", "gemini-1.5-flash-8b"
    const url = `https://generativelanguage.googleapis.com/v1/models/${modelId}:generateContent?key=${key}`;
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return new Response(text, {
        status: upstream.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}