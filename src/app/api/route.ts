import { NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function GET() {
    const text = await generateText({
        model: openai('gpt-4o'),
        prompt: 'Why is the sky blue?'
    });

    return NextResponse.json({msg:text});
}