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
  // Get all API keys from environment variables
  const apiKeys = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3
  ].filter(Boolean); // Remove any undefined keys

  if (apiKeys.length === 0) {
    return NextResponse.json(
      { error: 'API keys not configured' },
      { status: 500 }
    );
  }

  try {
    const body: RequestBody = await request.json();
    const { inputText, tone = 'witty' } = body;

    if (!inputText?.trim()) {
      return NextResponse.json(
        { error: 'Please provide text to respond to' },
        { status: 400 }
      );
    }

    // Try each API key until one works
    for (const apiKey of apiKeys) {
      try {
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

        if (response.status === 403) {
          // API key quota exceeded, try next key
          continue;
        }

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        if (!generatedText) {
          continue; // Try next key if no text generated
        }

        return NextResponse.json({ comeback: generatedText });
      } catch (error) {
        console.error('Error with API key:', error);
        continue; // Try next key
      }
    }

    // If we get here, all API keys failed
    return NextResponse.json(
      { error: 'All API attempts failed. Please try again later.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Error generating comeback:', error);
    return NextResponse.json(
      { error: 'Failed to generate comeback' },
      { status: 500 }
    );
  }
}
