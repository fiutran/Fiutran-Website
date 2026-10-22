'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { questions } from '@/content/readiness';
import { encode } from '@/lib/readiness';

// 8-question assessment, one question per step. Answers go into the result URL (?a=...),
// so results are shareable and nothing is stored anywhere.
export function ReadinessCheck() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [error, setError] = useState('');
  const q = questions[i];
  const done = answers.filter((a) => a !== null).length;

  const pick = (score: number) => {
    const next = [...answers];
    next[i] = score;
    setAnswers(next);
    setError('');
  };
  const goNext = () => {
    if (answers[i] === null) return setError('Choose one answer to continue.');
    if (i < questions.length - 1) return setI(i + 1);
    router.push(`/ai-readiness-check/result/?a=${encode(answers as number[])}`);
  };

  return (
    <form
      className="max-w-2xl border border-g-300 bg-white p-4 md:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        goNext();
      }}
      aria-labelledby="rc-q"
    >
      <div className="mb-1 flex justify-between text-sm text-g-600">
        <span>
          Question {i + 1} of {questions.length} · {q.topic}
        </span>
        <span>{Math.round((done / questions.length) * 100)}% answered</span>
      </div>
      <div className="progress mb-6" role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={done}>
        <span style={{ width: `${(done / questions.length) * 100}%` }} />
      </div>
      <fieldset>
        <legend id="rc-q" className="mb-4 text-xl font-semibold">
          {q.q}
        </legend>
        <div className="grid gap-2">
          {q.options.map((o) => (
            <label key={o.label} className={`flex cursor-pointer items-start gap-3 border p-3 ${answers[i] === o.score ? 'border-black bg-g-50' : 'border-g-300'}`}>
              <input type="radio" name={q.id} value={o.score} checked={answers[i] === o.score} onChange={() => pick(o.score)} className="mt-1" />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      <div className="mt-6 flex justify-between gap-3">
        <button type="button" className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>
          ← Back
        </button>
        <button type="submit" className="btn btn-primary">
          {i < questions.length - 1 ? 'Next →' : 'See my result'}
        </button>
      </div>
    </form>
  );
}
