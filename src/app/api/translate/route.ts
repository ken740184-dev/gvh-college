import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const isKannada = /[\u0c80-\u0cff]/.test(text);
    const sourceLang = isKannada ? "Kannada" : "English";
    const targetLang = isKannada ? "English" : "Kannada";

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a professional translator. Translate the following text from ${sourceLang} to ${targetLang}.
Return ONLY the translated text. Do not include any explanations, introduction, extra formatting, or surrounding quotes.

Text to translate:
${text}`;

    const result = await model.generateContent(prompt);
    const translated = result.response.text().trim();

    return NextResponse.json({ translated, sourceLang, targetLang });
  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: error.message || "Translation failed" },
      { status: 500 }
    );
  }
}
