'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { decode, score, type Result } from '@/lib/readiness';
import { submit } from '@/lib/submit';

export function ReadinessResult() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null | undefined>(undefined);
  const [answers, setAnswers] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const a = new URLSearchParams(window.location.search).get('a');
    const scores = decode(a);
    setAnswers(a ?? '');
    setResult(scores ? score(scores) : null);
  }, []);

  if (result === undefined) return <p className="text-g-600">Calculating your result…</p>;
  if (result === null)
    return (
      <div className="card max-w-xl" data-testid="result-empty">
        <h3 className="font-semibold">No answers found</h3>
        <p className="text-sm">Take the eight-question check first, then your result appears here.</p>
        <Link href="/ai-readiness-check/" className="btn btn-primary mt-2 self-start">
          Take the AI readiness check
        </Link>
      </div>
    );

  return (
    <div className="grid gap-6" data-testid="result">
      <div className="answer-block !my-0">
        <p className="answer-q">Your readiness level</p>
        <p className="text-3xl font-black" data-testid="result-level">
          {result.level}
        </p>
        <p className="mt-1">
          Score {result.score} of {result.max}
          {result.weakest.length > 0 && ` · Weakest areas: ${result.weakest.join(', ')}`}
        </p>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold">Your three recommended next steps</h3>
        <ol className="list-ol">
          {result.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
      <div className="card max-w-xl">
        <p className="card-meta">Recommended engagement model</p>
        <h3 className="font-semibold">{result.model.name}</h3>
        <p className="text-sm">
          Best-fit service: <Link href={result.model.service.href}>{result.model.service.label}</Link>
        </p>
        {result.ctoFlag && (
          <p className="text-sm">
            Nobody clearly owns technology decisions yet, so consider <Link href="/cto-on-demand/">CTO on demand</Link> alongside it.
          </p>
        )}
        <Link href={result.model.href} className="card-cta">
          Compare engagement models →
        </Link>
      </div>
      <form
        className="max-w-xl border border-g-300 p-4"
        action="/thank-you/assessment/"
        method="get"
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
          const r = await submit('assessment', { email, answers, level: result.level, score: result.score });
          if (r.ok) router.push(r.redirect);
        }}
      >
        <label htmlFor="res-email" className="block font-semibold">
          Email me this result
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input id="res-email" type="email" autoComplete="email" className="input" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} />
          <button type="submit" className="btn btn-primary">
            Email me this
          </button>
        </div>
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
