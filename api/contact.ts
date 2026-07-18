function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toWhatsAppNumber(value: unknown) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `964${digits.slice(1)}`;
  return digits;
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

  const body = await request.json() as { name?: string; email?: string; whatsapp?: string; message?: string; language?: string };
  if (!body.name || !body.email || !body.message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const text = [
    '<b>رسالة جديدة من موقع مجموعة الشمس</b>',
    '',
    `<b>الاسم:</b> ${escapeHtml(body.name)}`,
    `<b>البريد:</b> ${escapeHtml(body.email)}`,
    body.whatsapp ? `<b>واتساب:</b> ${escapeHtml(body.whatsapp)}` : null,
    `<b>اللغة:</b> ${escapeHtml(body.language)}`,
    `<b>الرسالة:</b>\n${escapeHtml(body.message)}`,
  ].filter(Boolean).join('\n');

  // Telegram does not support mailto: links in inline buttons, so use Gmail's
  // compose URL. Keep both reply actions available even when WhatsApp is left
  // blank in the form by falling back to the company's public WhatsApp number.
  const whatsappDigits = toWhatsAppNumber(body.whatsapp) || toWhatsAppNumber(process.env.WHATSAPP_NUMBER || '07718194628');
  const email = encodeURIComponent(body.email);
  const buttons = [[
    { text: 'الرد عبر واتساب', url: `https://wa.me/${whatsappDigits}` },
    { text: 'الرد عبر البريد الإلكتروني', url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}` },
  ]];

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: buttons },
    }),
  });

  if (!telegramResponse.ok) {
    const detail = await telegramResponse.text();
    console.error('Telegram sendMessage failed:', telegramResponse.status, detail);
    return Response.json({ error: 'Telegram request failed', detail }, { status: 502 });
  }

  return Response.json({ ok: true });
}
