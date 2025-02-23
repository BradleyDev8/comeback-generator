import { NextResponse } from 'next/server';

// Define the expected request body type
interface RequestBody {
  inputText: string;
  tone?: 'witty' | 'savage' | 'funny' | 'clever';
}

const PROMPT_TEMPLATE = `You are a comeback generator that creates witty and clever responses. 
Keep responses concise and impactful - ideally one or two sentences.
Make it contextually relevant to the input but avoid being overly hostile or inappropriate.
Add some personality and humor while staying sharp and intelligent.
Input text to respond to:`;

export async function POST(request: Request) {
  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Parse request body
    const body: RequestBody = await request.json();
    const { inputText, tone = 'witty' } = body;

    if (!inputText?.trim()) {
      return NextResponse.json(
        { error: 'Please provide text to respond to' },
        { status: 400 }
      );
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${PROMPT_TEMPLATE}\nTone: ${tone}\nInput: ${inputText}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Extract generated text from response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!generatedText) {
      return NextResponse.json(
        { error: 'Failed to generate comeback' },
        { status: 500 }
      );
    }

    return NextResponse.json({ comeback: generatedText });
  } catch (error) {
    console.error('Error generating comeback:', error);
    return NextResponse.json(
      { error: 'Failed to generate comeback' },
      { status: 500 }
    );
  }
}
