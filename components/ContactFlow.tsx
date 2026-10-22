'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { submit } from '@/lib/submit';

type Opt = { value: string; label: string };
type Data = { needs: string[]; size: string; industry: string; timeline: string; name: string; email: string; company: string; message: string };
type Errors = Partial<Record<keyof Data, string>>;

const sizes = ['1–10 people', '11–50 people', '51–200 people', '201–1,000 people', '1,000+ people'];
const timelines = ['As soon as possible', 'Within 3 months', 'Within 6 months', 'Just exploring'];
const STEPS = ['What do you need?', 'About your company', 'How do we reach you?'];

// Book-a-call flow: 3 steps with validation, progress bar and back/next.
// Submit goes through lib/submit.ts (console stub today) and redirects to /thank-you/call/.
export function ContactFlow({ services, industries }: { services: Opt[]; industries: Opt[] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [d, setD] = useState<Data>({ needs: [], size: '', industry: '', timeline: '', name: '', email: '', company: '', message: '' });
  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0 && d.needs.length === 0) e.needs = 'Choose at least one option.';
    if (s === 1) {
      if (!d.size) e.size = 'Choose your company size.';
      if (!d.industry) e.industry = 'Choose your industry.';
      if (!d.timeline) e.timeline = 'Choose a timeline.';
    }
    if (s === 2) {
      if (d.name.trim().length < 2) e.name = 'Enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Enter a valid email address.';
      if (d.company.trim().length < 2) e.company = 'Enter your company name.';
      if (d.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).';
    }
    return e;
  };

  const next = async () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`cf-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    if (step < 2) return setStep(step + 1);
    setBusy(true);
    const r = await submit('call', { ...d, source: window.location.pathname });
    if (r.ok) router.push(r.redirect);
    else setBusy(false);
  };

  const Err = ({ k }: { k: keyof Data }) =>
    errors[k] ? (
      <p id={`cf-${k}-err`} role="alert" className="field-error">
        {errors[k]}
      </p>
    ) : null;
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <form
      className="max-w-2xl border border-g-300 bg-white p-4 md:p-6"
      action="/thank-you/call/"
      method="post"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <p className="mb-1 text-sm text-g-600">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <div className="progress mb-6" role="progressbar" aria-label="Form progress" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}>
        <span style={{ width: `${pct}%` }} />
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="mb-3 text-xl font-semibold">What do you need help with?</legend>
          <div id="cf-needs" tabIndex={-1} className="flex flex-wrap gap-2" aria-describedby={errors.needs ? 'cf-needs-err' : undefined}>
            {[...services, { value: 'cto-on-demand', label: 'CTO on demand' }, { value: 'not-sure', label: 'Not sure yet' }].map((o) => {
              const on = d.needs.includes(o.value);
              return (
                <button key={o.value} type="button" className="chip" aria-pressed={on} onClick={() => set('needs', on ? d.needs.filter((x) => x !== o.value) : [...d.needs, o.value])}>
                  {o.label}
                </button>
              );
            })}
          </div>
          <Err k="needs" />
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="grid gap-4">
          <legend className="mb-3 text-xl font-semibold">About your company</legend>
          <Select id="size" label="Company size" value={d.size} onChange={(v) => set('size', v)} opts={sizes.map((s) => ({ value: s, label: s }))} err={errors.size} />
          <Select id="industry" label="Industry" value={d.industry} onChange={(v) => set('industry', v)} opts={[...industries, { value: 'other', label: 'Other' }]} err={errors.industry} />
          <Select id="timeline" label="Timeline" value={d.timeline} onChange={(v) => set('timeline', v)} opts={timelines.map((s) => ({ value: s, label: s }))} err={errors.timeline} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="grid gap-4">
          <legend className="mb-3 text-xl font-semibold">How do we reach you?</legend>
          <Field id="name" label="Name" value={d.name} onChange={(v) => set('name', v)} err={errors.name} autoComplete="name" />
          <Field id="email" label="Work email" type="email" value={d.email} onChange={(v) => set('email', v)} err={errors.email} autoComplete="email" />
          <Field id="company" label="Company" value={d.company} onChange={(v) => set('company', v)} err={errors.company} autoComplete="organization" />
          <div>
            <label htmlFor="cf-message" className="mb-1 block text-sm font-semibold">
              What are you trying to fix?
            </label>
            <textarea id="cf-message" rows={4} className="input" value={d.message} onChange={(e) => set('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
            <Err k="message" />
          </div>
        </fieldset>
      )}

      <div className="mt-6 flex justify-between gap-3">
        <button type="button" className="btn" onClick={() => setStep(step - 1)} disabled={step === 0}>
          ← Back
        </button>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {step < 2 ? 'Next →' : busy ? 'Sending…' : 'Book my call'}
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, value, onChange, err, type = 'text', autoComplete }: { id: string; label: string; value: string; onChange: (v: string) => void; err?: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={`cf-${id}`} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      <input id={`cf-${id}`} type={type} className="input" value={value} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} aria-invalid={!!err} aria-describedby={err ? `cf-${id}-err` : undefined} />
      {err && (
        <p id={`cf-${id}-err`} role="alert" className="field-error">
          {err}
        </p>
      )}
    </div>
  );
}

function Select({ id, label, value, onChange, opts, err }: { id: string; label: string; value: string; onChange: (v: string) => void; opts: Opt[]; err?: string }) {
  return (
    <div>
      <label htmlFor={`cf-${id}`} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      <select id={`cf-${id}`} className="input" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!err} aria-describedby={err ? `cf-${id}-err` : undefined}>
        <option value="">Choose…</option>
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {err && (
        <p id={`cf-${id}-err`} role="alert" className="field-error">
          {err}
        </p>
      )}
    </div>
  );
}
