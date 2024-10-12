'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ใช้ useRouter สำหรับการนำทาง

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // เรียกใช้ useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // เรียกใช้ signIn และตรวจสอบผลลัพธ์
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      // ถ้า signIn สำเร็จ ให้นำทางไปหน้า Home
      router.push('/home');
    } else {
      // ถ้า signIn ล้มเหลว สามารถแสดงข้อความผิดพลาดได้ที่นี่
      console.error('Login failed:', result.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
