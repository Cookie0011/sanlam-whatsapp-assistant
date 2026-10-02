import { NextRequest, NextResponse } from 'next/server'
import { menu, reply } from '@/lib/bot'
import { sendWhatsAppText } from '@/lib/whatsapp'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')
  if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? '', { status: 200 })
  }
  return NextResponse.json({ error: 'verification failed' }, { status: 403 })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  console.log('WhatsApp webhook event', JSON.stringify(body))

  try {
    const value = body?.entry?.[0]?.changes?.[0]?.value
    const message = value?.messages?.[0]

    if (message && message.type === 'text') {
      const from = message.from
      const text = message.text?.body || ''
      const contactName = value?.contacts?.[0]?.profile?.name || 'there'
      const lower = text.toLowerCase()

      if (lower.includes('talk to thabiso') || lower.includes('human') || lower.includes('agent')) {
        await sendWhatsAppText(
          from,
          `Thanks ${contactName}, I've let Thabiso know you'd like to speak with him directly. He'll reach out to you on this number shortly.`
        )
        const thabisoNumber = process.env.THABISO_WHATSAPP
        if (thabisoNumber) {
          await sendWhatsAppText(
            thabisoNumber,
            `New handover request from ${contactName} (${from}): "${text}"`
          )
        }
      } else {
        const product = reply(text)
        if (product) {
          await sendWhatsAppText(
            from,
            `${product.name}\n\n${product.desc}\n\n${product.details}\n\nWant a personalised quote? Just reply "talk to Thabiso".`
          )
        } else {
          const menuText = menu.map((m, i) => `${i + 1}. ${m}`).join('\n')
          await sendWhatsAppText(
            from,
            `Hi ${contactName}, thanks for contacting Sanlam Financial Wellness. Here's what I can help with:\n\n${menuText}\n\nJust reply with the option that interests you.`
          )
        }
      }
    }
  } catch (err) {
    console.error('Error handling WhatsApp webhook', err)
  }

  return NextResponse.json({ received: true })
}
