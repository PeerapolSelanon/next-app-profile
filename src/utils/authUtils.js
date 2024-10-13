export function hasPermission(user, requiredPermission) {
  if (!user || !user.permissions) return false;
  
  // ตรวจสอบว่า user มีสิทธิ์ admin_pages หรือไม่
  if (user.permissions === 'admin_pages') {
    return true; // admin มีสิทธิ์ทั้งหมด
  }
  
  // สำหรับ default_pages ให้กำหนดสิทธิ์ตามที่ต้องการ
  if (user.permissions === 'default_pages') {
    // ตัวอย่าง: default user สามารถเข้าถึง PROFILE_ACCESS ได้
    if (requiredPermission === 'PROFILE_ACCESS') {
      return true;
    }
    // เพิ่มเงื่อนไขอื่นๆ ตามความเหมาะสม
  }
  
  return false; // ถ้าไม่ตรงกับเงื่อนไขใดๆ ให้ถือว่าไม่มีสิทธิ์
}

export function hasRole(user, requiredRole) {
  if (!user || !user.role) return false;
  return user.role === requiredRole;
}

export function canAccessPath(user, path) {
  // สำหรับหน้าที่อยู่ใน (frontend) group
  if (!path.startsWith('/api') && !path.startsWith('/_next')) {
    return hasRole(user, 'USER') || hasRole(user, 'ADMIN');
  }
  
  // สำหรับหน้าที่อยู่ใน (backend) group
  // ตัวอย่าง: ถ้ามี path เฉพาะสำหรับ admin เช่น /dashboard
  if (path.startsWith('/dashboard')) {
    return hasRole(user, 'ADMIN');
  }
  
  // สำหรับ API routes ที่ต้องการการยืนยันตัวตน
  if (path.startsWith('/api/admin')) {
    return hasRole(user, 'ADMIN');
  }
  
  // สำหรับ path อื่นๆ ที่ไม่ต้องการการตรวจสอบสิทธิ์
  return true;
}
