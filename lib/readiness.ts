import { questions } from '@/content/readiness';

export type Level = 'Exploring' | 'Ready to pilot' | 'Ready to scale';

export type Result = {
  score: number;
  max: number;
  level: Level;
  steps: string[];
  model: { name: string; href: string; service: { label: string; href: string } };
  ctoFlag: boolean;
  weakest: string[];
};

// Answers are encoded in the URL as ?a=<8 digits, 0–3 each>, e.g. ?a=12301212
export function decode(a: string | null): number[] | null {
  if (!a || !/^[0-3]{8}$/.test(a)) return null;
  return a.split('').map(Number);
}

export function encode(scores: number[]): string {
  return scores.join('');
}

export function score(scores: number[]): Result {
  const total = scores.reduce((s, x) => s + x, 0);
  const max = questions.length * 3;
  const weakest = questions.filter((_, i) => scores[i] <= 1).map((q) => q.topic);
  const ctoFlag = scores[questions.findIndex((q) => q.id === 'ownership')] <= 1;

  if (total <= 9)
    return {
      score: total,
      max,
      level: 'Exploring',
      weakest,
      ctoFlag,
      steps: [
        'Map the five to ten processes that drive your revenue and cost',
        'Find where your key data lives and who owns it',
        'Pick one problem that is costing you money now and define how you would measure success',
      ],
      model: { name: 'Discovery sprint', href: '/engagement-models/', service: { label: 'AI strategy and roadmap', href: '/services/ai-strategy-and-roadmap/' } },
    };
  if (total <= 17)
    return {
      score: total,
      max,
      level: 'Ready to pilot',
      weakest,
      ctoFlag,
      steps: [
        'Choose one process with visible pain and data you already have',
        'Scope a pilot that can go live within weeks, with a person in the loop',
        'Agree the success metric and review date before you build',
      ],
      model: { name: 'Build project', href: '/engagement-models/', service: { label: 'AI agents and automation', href: '/services/ai-agents-and-automation/' } },
    };
  return {
    score: total,
    max,
    level: 'Ready to scale',
    weakest,
    ctoFlag,
    steps: [
      'Sequence AI initiatives into a quarterly program with owners',
      'Invest in shared data foundations so each initiative is cheaper than the last',
      'Plan adoption and training for every team affected',
    ],
    model: { name: 'Run and scale retainer or program', href: '/engagement-models/', service: { label: 'Digital-transformation programs', href: '/services/digital-transformation-programs/' } },
  };
}
