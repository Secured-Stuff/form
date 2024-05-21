import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import { invoiceTemplate } from "../_assets/invoiceTemplate";

export function GET() {
  return NextResponse.json({ success: true }, { status: 200 });
}

async function generatePDF(htmlContent: any) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const pdfBuffer = await generatePDF(invoiceTemplate(body));

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Nowa faktura - ${body.fullName}`,
    html: `Nowa faktura została przesłana od ${body.fullName} w załączniku, jako plik PDF.`,
    attachments: [
      {
        filename: `faktura-${body.fullName.split[0]}.pdf`,
        content: pdfBuffer,
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Wystąpił błąd: " + error);
    } else {
      console.log("Wiadomość wysłana: " + info.response);
    }
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
