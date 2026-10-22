// Form submission stub. Every form on the site calls submit(); swap the body of this
// function for a real endpoint (CRM, email service, serverless function) later and no
// component needs to change.

export type FormKind = 'call' | 'assessment' | 'newsletter';

export type SubmitResult = { ok: true; redirect: string } | { ok: false; error: string };

const thankYou: Record<FormKind, string> = {
  call: '/thank-you/call/',
  assessment: '/thank-you/assessment/',
  newsletter: '/thank-you/newsletter/',
};

export async function submit(kind: FormKind, payload: Record<string, unknown>): Promise<SubmitResult> {
  // TODO: replace with fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(payload) })
  console.info(`[submit:${kind}]`, payload);
  return { ok: true, redirect: thankYou[kind] };
}
