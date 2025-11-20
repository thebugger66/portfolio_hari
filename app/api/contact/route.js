


// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// // Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_ADDRESS,
//     pass: process.env.GMAIL_PASSKEY,
//   },
// });

// // Email HTML Template
// const generateEmailTemplate = (name, email, userMessage) => `
//   <div style="font-family: Arial; padding: 20px;">
//     <h2>New Contact Message</h2>
//     <p><strong>Name:</strong> ${name}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Message:</strong></p>
//     <p>${userMessage}</p>
//   </div>
// `;

// async function sendEmail(payload) {
//   const { name, email, message } = payload;

//   const mailOptions = {
//     from: process.env.EMAIL_ADDRESS,
//     to: process.env.EMAIL_ADDRESS,
//     subject: `New Message From ${name}`,
//     html: generateEmailTemplate(name, email, message),
//     replyTo: email,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (err) {
//     console.error("Email Error:", err);
//     return false;
//   }
// }

// export async function POST(request) {
//   try {
//     const payload = await request.json();

//     const emailSuccess = await sendEmail(payload);

//     if (emailSuccess) {
//       return NextResponse.json(
//         { success: true, message: "Email sent successfully!" },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: "Failed to send email." },
//       { status: 500 }
//     );
//   } catch (error) {
//     console.error("API Error:", error.message);
//     return NextResponse.json(
//       { success: false, message: "Server error." },
//       { status: 500 }
//     );
//   }
// }


import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email Template
const generateEmailTemplate = (name, email, message) => `
  <div style="font-family: Arial; padding: 20px;">
    <h2>New Contact Form Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  </div>
`;

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_ADDRESS,            // Your email
      reply_to: email,                     // allows replying from Gmail
      subject: `New message from ${name}`,
      html: generateEmailTemplate(name, email, message),
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("Resend Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

