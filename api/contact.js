// POST /api/contact — Foundation contact form endpoint
//
// Receives the form submission, then sends two emails via Sendkit:
//   1. Notification → CONTACT_TO (claude@claudebuzizi.com) with the full message
//   2. Confirmation → submitter's email (auto-reply with what they wrote)
//
// Env vars required (set in Vercel project + local .env):
//   SENDKIT_API_KEY    — the Mognetize Marketing Sendkit account key
//   CONTACT_FROM       — RFC-format sender, e.g. "Claude Buzizi Foundation <claude@claudebuzizi.com>"
//   CONTACT_REPLY_TO   — reply-to address, e.g. "claude@claudebuzizi.com"
//   CONTACT_TO         — internal recipient, e.g. "claude@claudebuzizi.com"
//
// Sendkit gotchas (from ALPHA FUNNELS docs/SENDKIT-API-NOTES.md):
//   - DO NOT add an `Origin: https://app.sendkit.dev` header. It silently strips
//     the From display name in recipient inboxes (real production incident).
//   - `from` is a single RFC string ("Name <email>"), NOT an object.

const SENDKIT_EMAILS_URL = "https://api.sendkit.dev/emails";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPIC_LABELS = {
  general: "General inquiry",
  partnership: "Partnership / sponsorship",
  volunteer: "Volunteer interest",
  "major-gift": "Major gift / planned giving",
  press: "Press & media",
  application: "Apply for support",
};

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail({ apiKey, from, to, replyTo, subject, html, text }) {
  const payload = { from, to: Array.isArray(to) ? to : [to], subject, html, text };
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch(SENDKIT_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    return { ok: false, status: res.status, error: errBody };
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, id: data.id };
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }

  const apiKey = process.env.SENDKIT_API_KEY;
  const from = process.env.CONTACT_FROM;
  const replyTo = process.env.CONTACT_REPLY_TO || "";
  const internalTo = process.env.CONTACT_TO;

  if (!apiKey || !from || !internalTo) {
    console.error("[contact] missing env vars", {
      hasKey: !!apiKey,
      hasFrom: !!from,
      hasTo: !!internalTo,
    });
    return res
      .status(500)
      .json({ ok: false, error: "server misconfigured — contact form is not yet wired" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const first = String(body.first || "").trim();
  const last = String(body.last || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const topic = String(body.topic || "general").trim();
  const message = String(body.message || "").trim();

  if (!first || !last || !email || !message) {
    return res.status(400).json({ ok: false, error: "missing required fields" });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "invalid email address" });
  }
  if (message.length > 5000) {
    return res.status(400).json({ ok: false, error: "message too long" });
  }

  const fullName = `${first} ${last}`;
  const topicLabel = TOPIC_LABELS[topic] || topic;
  const submittedAt = new Date().toISOString();

  // ── 1. Internal notification → claude@claudebuzizi.com ─────────
  const notifySubject = `[CBF Contact] ${topicLabel} — ${fullName}`;
  const notifyHtml = `
<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #14120f;">
  <div style="border-left: 3px solid #e35817; padding-left: 16px; margin-bottom: 28px;">
    <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6b6358; margin: 0 0 6px;">New contact form submission</p>
    <h1 style="font-size: 22px; margin: 0;">${escapeHtml(topicLabel)}</h1>
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
    <tr><td style="padding: 8px 0; color: #6b6358; width: 110px;">From</td><td style="padding: 8px 0;"><b>${escapeHtml(fullName)}</b></td></tr>
    <tr><td style="padding: 8px 0; color: #6b6358;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #e35817; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #6b6358;">Topic</td><td style="padding: 8px 0;">${escapeHtml(topicLabel)}</td></tr>
    <tr><td style="padding: 8px 0; color: #6b6358; vertical-align: top;">Submitted</td><td style="padding: 8px 0; color: #6b6358; font-size: 13px;">${escapeHtml(submittedAt)}</td></tr>
  </table>
  <hr style="border: none; border-top: 1px solid #e8e0d2; margin: 24px 0;" />
  <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6b6358; margin: 0 0 10px;">Message</p>
  <div style="background: #f8f3ea; border: 1px solid #e8e0d2; border-radius: 10px; padding: 18px 20px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
  <p style="margin-top: 28px; font-size: 13px; color: #6b6358;">Reply directly to this email — it's set to go straight to <b>${escapeHtml(email)}</b>.</p>
</body></html>`;
  const notifyText =
    `New contact form submission — ${topicLabel}\n` +
    `\n` +
    `From: ${fullName}\n` +
    `Email: ${email}\n` +
    `Topic: ${topicLabel}\n` +
    `Submitted: ${submittedAt}\n` +
    `\n--- Message ---\n${message}\n`;

  const notify = await sendEmail({
    apiKey,
    from,
    to: internalTo,
    replyTo: email, // reply-to the submitter so Claude can hit Reply directly
    subject: notifySubject,
    html: notifyHtml,
    text: notifyText,
  });

  if (!notify.ok) {
    console.error("[contact] notify failed", notify.status, notify.error);
    return res.status(502).json({ ok: false, error: "could not deliver your message — please try again" });
  }

  // ── 2. Confirmation → submitter (best-effort, don't fail the request) ──
  const confirmSubject = "We received your message — Claude Buzizi Foundation";
  const confirmHtml = `
<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #14120f;">
  <div style="margin-bottom: 28px;">
    <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6b6358; margin: 0 0 6px;">The Claude Buzizi Foundation</p>
    <h1 style="font-size: 26px; margin: 0; line-height: 1.2;">Thank you, ${escapeHtml(first)} — your message is in.</h1>
  </div>
  <p style="font-size: 16px; line-height: 1.6;">We've received your inquiry about <b>${escapeHtml(topicLabel)}</b>. Claude or someone on his team will reply within <b>48 hours</b>.</p>
  <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6b6358; margin: 28px 0 10px;">What you sent</p>
  <div style="background: #f8f3ea; border: 1px solid #e8e0d2; border-radius: 10px; padding: 18px 20px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
  <p style="font-size: 14px; color: #6b6358; margin-top: 28px;">If you need to add anything, just reply to this email — it goes straight to Claude.</p>
  <hr style="border: none; border-top: 1px solid #e8e0d2; margin: 32px 0 20px;" />
  <p style="font-size: 12px; color: #6b6358; line-height: 1.6;">
    <b>Feed · Educate · Equip.</b><br/>
    Carrying forward the work Claver Buzizi began for Bisesero — meals through Rise Against Hunger, scholarships, and income-building skills.
  </p>
  <p style="font-size: 12px; color: #6b6358;">
    <a href="https://claude-buzizi-foundation.vercel.app" style="color: #e35817; text-decoration: none;">claudebuzizifoundation</a> ·
    <a href="https://claudebuzizi.com" style="color: #e35817; text-decoration: none;">claudebuzizi.com</a>
  </p>
</body></html>`;
  const confirmText =
    `Thank you, ${first} — your message is in.\n\n` +
    `We've received your inquiry about "${topicLabel}". Claude or someone on his team will reply within 48 hours.\n\n` +
    `--- What you sent ---\n${message}\n\n` +
    `If you need to add anything, just reply to this email — it goes straight to Claude.\n\n` +
    `— The Claude Buzizi Foundation\nFeed · Educate · Equip.`;

  const confirm = await sendEmail({
    apiKey,
    from,
    to: email,
    replyTo: replyTo || internalTo,
    subject: confirmSubject,
    html: confirmHtml,
    text: confirmText,
  });

  if (!confirm.ok) {
    // Don't fail the request — the user's message reached us, that's the contract.
    console.error("[contact] confirm failed", confirm.status, confirm.error);
  }

  return res.status(200).json({
    ok: true,
    notifyId: notify.id || null,
    confirmId: confirm.ok ? confirm.id || null : null,
    confirmSent: confirm.ok,
  });
}
