"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // หลังจากออกจากระบบจะเปลี่ยนเส้นทางไปที่หน้า login
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
