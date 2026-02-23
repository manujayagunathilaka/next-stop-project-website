import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "NextStop Contact <onboarding@resend.dev>",
      to: "nexora.io.dev@gmail.com",
      subject: `[NextStop] ${subject || "New Contact Message"} — from ${name}`,
      replyTo: email,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>New Transmission — NextStop</title>
</head>
<body style="margin:0;padding:0;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid #1f1f1f;" bgcolor="#0d0d0d">

          <!-- Top gradient bar -->
          <tr>
            <td height="3" style="background:linear-gradient(90deg,#3b82f6,#8b5cf6,#ec4899);font-size:0;line-height:0;" bgcolor="#3b82f6">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td bgcolor="#0d0d0d" style="padding:32px 36px 24px;border-bottom:1px solid #1f1f1f;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#0d2218" style="border:1px solid #1a4a2e;border-radius:99px;padding:5px 14px;">
                    <span style="font-size:10px;color:#4ade80;letter-spacing:3px;text-transform:uppercase;font-weight:700;font-family:'Courier New',monospace;">&#9679; SIGNAL RECEIVED</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:16px 0 4px;font-size:26px;font-weight:900;color:#ffffff;font-family:Arial,sans-serif;">&#128225; New Transmission</h1>
              <p style="margin:0;color:#3a3a3a;font-size:11px;letter-spacing:3px;font-family:'Courier New',monospace;">VIA NEXTSTOP CONTACT FORM</p>
            </td>
          </tr>

          <!-- Sender Info -->
          <tr>
            <td bgcolor="#0d0d0d" style="padding:28px 36px;border-bottom:1px solid #1f1f1f;">
              <p style="margin:0 0 14px;font-size:10px;color:#4ade80;letter-spacing:3px;text-transform:uppercase;font-weight:700;font-family:'Courier New',monospace;">&#8212; SENDER INFO</p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr>
                  <td bgcolor="#111111" style="border:1px solid #1e1e1e;border-radius:10px;padding:14px 16px;">
                    <p style="margin:0 0 4px;font-size:10px;color:#444444;letter-spacing:2px;font-family:'Courier New',monospace;">IDENTITY</p>
                    <p style="margin:0;font-size:16px;color:#ffffff;font-weight:700;font-family:Arial,sans-serif;">${name}</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr>
                  <td bgcolor="#111111" style="border:1px solid #1e1e1e;border-radius:10px;padding:14px 16px;">
                    <p style="margin:0 0 4px;font-size:10px;color:#444444;letter-spacing:2px;font-family:'Courier New',monospace;">FREQUENCY (EMAIL)</p>
                    <p style="margin:0;font-size:14px;color:#4ade80;font-weight:600;font-family:'Courier New',monospace;">${email}</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#111111" style="border:1px solid #1e1e1e;border-radius:10px;padding:14px 16px;">
                    <p style="margin:0 0 4px;font-size:10px;color:#444444;letter-spacing:2px;font-family:'Courier New',monospace;">SUBJECT</p>
                    <p style="margin:0;font-size:14px;color:#a78bfa;font-weight:600;font-family:Arial,sans-serif;">${subject || "General Inquiry"}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Payload -->
          <tr>
            <td bgcolor="#0d0d0d" style="padding:28px 36px;border-bottom:1px solid #1f1f1f;">
              <p style="margin:0 0 14px;font-size:10px;color:#4ade80;letter-spacing:3px;text-transform:uppercase;font-weight:700;font-family:'Courier New',monospace;">&#8212; MESSAGE PAYLOAD</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#111111" style="border:1px solid #1e1e1e;border-radius:10px;padding:18px 20px;">
                    <p style="margin:0;color:#cccccc;line-height:1.8;font-size:14px;white-space:pre-wrap;font-family:Arial,sans-serif;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#0d0d0d" style="padding:18px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:11px;color:#2a2a2a;font-family:'Courier New',monospace;">NEXORA &middot; NEXTSTOP</td>
                  <td align="right" style="font-size:10px;color:#4ade80;font-family:'Courier New',monospace;">nexora.io.dev@gmail.com</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom gradient bar -->
          <tr>
            <td height="2" style="background:linear-gradient(90deg,#4ade80,#22d3ee,#0d0d0d);font-size:0;line-height:0;" bgcolor="#4ade80">&nbsp;</td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
