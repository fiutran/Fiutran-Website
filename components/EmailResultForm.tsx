'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { decode, score } from '@/lib/readiness';
import { submit } from '@/lib/submit';

// "Email me this" on the readiness result. Reads the answers from the URL on submit and
// sends them through lib/submit.ts, then redirects to /thank-you/assessment/.
export function EmailResultForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  return (
    <form
      className="max-w-xl border border-g-300 p-4"
      action="/thank-you/assessment/"
      method="get"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const a = new URLSearchParams(window.location.search).get('a');
        const scores = decode(a);
        if (!scores) return setError('Take the AI readiness check first, then email yourself the result.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
        const r = score(scores);
        const res = await submit('assessment', { email, answers: a, level: r.level, score: r.score });
        if (res.ok) router.push(res.redirect);
      }}
    >
      <label htmlFor="res-email" className="block font-semibold">
        Your email address
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input id="res-email" name="email" type="email" autoComplete="email" className="input" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'res-email-err' : undefined} />
        <button type="submit" className="btn btn-primary">
          Email me this
        </button>
      </div>
      {error && (
        <p id="res-email-err" role="alert" className="field-error">
          {error}
        </p>
      )}
    </form>
  );
}
