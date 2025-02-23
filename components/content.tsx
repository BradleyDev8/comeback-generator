'use client';

import { useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';

export default function Content() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tone, setTone] = useState<'witty' | 'savage' | 'funny' | 'clever'>('witty');

  async function handleGenerate() {
    if (!inputText.trim()) {
      return setError('Please provide some text to respond to.');
    }

    setIsLoading(true);
    setError('');
    setOutputText('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate comeback');
      }

      setOutputText(data.comeback);
    } catch (err) {
      setError('Failed to generate comeback. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 mt-6 px-3 md:px-0">
      <div className="flex flex-col gap-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="bg-zinc-800 text-lg h-[120px] w-full border-2 border-pur rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-neon resize-y"
          placeholder="Enter text to respond to..."
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as typeof tone)}
          className="bg-zinc-800 border-2 border-pur rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-neon"
        >
          <option value="witty">Witty</option>
          <option value="savage">Savage</option>
          <option value="funny">Funny</option>
          <option value="clever">Clever</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={handleGenerate}
          className="text-neon cursor-pointer text-lg font-semibold border-2 py-2 px-4 rounded-full border-pur hover:bg-pur transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-1.5">
              <TbFidgetSpinner className="animate-spin" />
              Generating...
            </div>
          ) : (
            "Generate Comeback ✨"
          )}
        </button>
      </div>
      {error && (
        <div className="flex justify-center">
          <p className="border-2 rounded-xl border-red-300 text-red-300 py-2 px-4">
            {error}
          </p>
        </div>
      )}
      {outputText && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium">Your Comeback 👇</h2>
          <div className="w-full min-h-[50px] bg-zinc-800 p-3 rounded-md border-2 border-pur overflow-auto">
            {outputText}
          </div>
        </div>
      )}
    </section>
  );
}