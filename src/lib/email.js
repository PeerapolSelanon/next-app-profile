import nodemailer from "nodemailer";

// สร้าง transporter สำหรับส่งอีเมล
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true", // true สำหรับ 465, false สำหรับพอร์ตอื่นๆ
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetPasswordEmail(email, resetToken) {
  // สร้าง URL สำหรับรีเซ็ตรหัสผ่าน
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

  // กำหนดเนื้อหาอีเมล
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "รีเซ็ตรหัสผ่านของคุณ",
    html: `
      <h1>คำขอรีเซ็ตรหัสผ่าน</h1>
      <p>คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ</p>
      <p>กรุณาคลิกที่ลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่านของคุณ:</p>
      <a href="${resetUrl}">รีเซ็ตรหัสผ่านของฉัน</a>
      <p>หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาละเลยอีเมลนี้</p>
      <p>ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง</p>
    `,
  };

  try {
    // ส่งอีเมล
    await transporter.sendMail(mailOptions);
    console.log("ส่งอีเมลรีเซ็ตรหัสผ่านสำเร็จ");
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่งอีเมลรีเซ็ตรหัสผ่าน:", error);
    throw new Error("ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้");
  }
}
