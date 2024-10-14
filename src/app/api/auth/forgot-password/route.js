import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/lib/email"; // สมมติว่าคุณมีฟังก์ชันนี้

export async function POST(request) {
  try {
    const { email } = await request.json();

    // ตรวจสอบว่าอีเมลมีอยู่ในระบบหรือไม่
    // สมมติว่าคุณมีฟังก์ชัน checkUserExists
    const userExists = await checkUserExists(email);

    if (!userExists) {
      return NextResponse.json(
        { message: "ไม่พบอีเมลนี้ในระบบ" },
        { status: 404 }
      );
    }

    // สร้างโทเค็นสำหรับรีเซ็ตรหัสผ่าน
    // สมมติว่าคุณมีฟังก์ชัน generateResetToken
    const resetToken = await generateResetToken(email);

    // ส่งอีเมลพร้อมลิงก์รีเซ็ตรหัสผ่าน
    await sendResetPasswordEmail(email, resetToken);

    return NextResponse.json(
      { message: "ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot-password API:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดำเนินการ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}

// ฟังก์ชันจำลองสำหรับตรวจสอบว่าผู้ใช้มีอยู่จริง
async function checkUserExists(email) {
  // ในที่นี้ควรเชื่อมต่อกับฐานข้อมูลของคุณเพื่อตรวจสอบ
  // นี่เป็นเพียงตัวอย่างอย่างง่าย
  return true;
}

// ฟังก์ชันจำลองสำหรับสร้างโทเค็นรีเซ็ตรหัสผ่าน
async function generateResetToken(email) {
  // ในที่นี้ควรสร้างโทเค็นที่ปลอดภัยและบันทึกลงในฐานข้อมูล
  // นี่เป็นเพียงตัวอย่างอย่างง่าย
  return "some-random-token";
}
