import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, password } = await req.json();
  console.log('Received signup data:', { name, email, password });

  try {
    const hashedPassword = await hash(password, 12);
    
    // ตรวจสอบว่ามี Role 'USER' อยู่แล้วหรือไม่
    let userRole = await prisma.role.findFirst({ where: { role_name: 'USER' } });
    
    // ถ้ายังไม่มี Role 'USER' ให้สร้างใหม่
    if (!userRole) {
      userRole = await prisma.role.create({
        data: {
          role_name: 'USER',
          description: 'Default user role',
          permission: {
            create: {
              pages: 'default_pages',
              edit_by: 1, // ใส่ ID ของ admin หรือระบบ
            }
          },
          edit_by: 1, // ใส่ ID ของ admin หรือระบบ
        }
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role_id: userRole.id, // ใช้ role_id แทน role
      },
    });

    console.log('User created:', user);

    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ message: 'Error creating user', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
