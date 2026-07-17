function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ error: 'Telegram is not configured' }, { status: 500 });
  }

  const body = await request.json() as { name?: string; email?: string; message?: string; language?: string };
  if (!body.name || !body.email || !body.message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const text = [
    '<b>رسالة جديدة من موقع مجموعة الشمس</b>',
    '',
    `<b>الاسم:</b> ${escapeHtml(body.name)}`,
    `<b>البريد:</b> ${escapeHtml(body.email)}`,
    `<b>اللغة:</b> ${escapeHtml(body.language)}`,
    `<b>الرسالة:</b>\n${escapeHtml(body.message)}`,
  ].join('\n');

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  if (!telegramResponse.ok) {
    return Response.json({ error: 'Telegram request failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
