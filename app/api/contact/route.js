


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


import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email HTML Template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial; padding: 20px;">
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${userMessage}</p>
  </div>
`;

async function sendEmail(payload) {
  const { name, email, message } = payload;

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_ADDRESS,   // your email
      reply_to: email,                 // allows reply from Gmail
      subject: `New Message From ${name}`,
      html: generateEmailTemplate(name, email, message),
    });

    return true;
  } catch (err) {
    console.error("Resend Email Error:", err);
    return false;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const emailSuccess = await sendEmail(payload);

    if (emailSuccess) {
      return NextResponse.json(
        { success: true, message: "Email sent successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error." },
      { status: 500 }
    );
  }
}
