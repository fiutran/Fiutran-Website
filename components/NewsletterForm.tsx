'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { submit } from '@/lib/submit';

export function NewsletterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  return (
    <form
      action="/thank-you/newsletter/"
      method="get"
      noValidate
      className="newsletter"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.');
        setError('');
        const r = await submit('newsletter', { email, source: window.location.pathname });
        if (r.ok) router.push(r.redirect);
      }}
    >
      <label htmlFor="nl-email" className="block text-sm font-semibold">
        Get Fiutran insights by email
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="nl-email"
          name="email"
          type="email"
          autoComplete="email"
          className="input flex-1"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? 'nl-err' : undefined}
        />
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </div>
      {error && (
        <p id="nl-err" role="alert" className="field-error">
          {error}
        </p>
      )}
    </form>
  );
}
