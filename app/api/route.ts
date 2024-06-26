import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import puppeteer from "puppeteer";
import { invoiceTemplate } from "../_assets/invoiceTemplate";

async function generatePDF(htmlContent: any) {
  const options =
    process.env.NODE_ENV === "production"
      ? {
          args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
          ],
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        }
      : undefined;
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();
  await page.goto("https://developer.chrome.com/");
  await page.goto("https://cdn.tailwindcss.com/");
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
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
    html: `Nowa faktura od ${body.fullName} została przesłana w załączniku, jako plik PDF.`,
    attachments: [
      {
        filename: `faktura-${body.fullName.replace(" ", "_").toLowerCase()}.pdf`,
        content: pdfBuffer,
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
