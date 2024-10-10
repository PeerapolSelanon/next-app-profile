export async function GET(request) {
    return new Response(JSON.stringify({ message: "Get Users" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  export async function POST(request) {
    const body = await request.json();
    // ทำงานกับข้อมูล body เช่นการเพิ่มผู้ใช้
    return new Response(JSON.stringify({ message: "User Created", data: body }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  