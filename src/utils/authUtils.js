export function hasRole(user, requiredRole) {
  if (!user || !user.role) return false;
  return user.role === requiredRole;
}

export function canAccessPath(user, path) {
  console.log("user", user);
  console.log("path", path);
  if (path === "/") {
    return true;
  }

  if (!user || !user.role || !user.permissions) {
    return false;
  }

  // ตรวจสอบว่า path ที่ต้องการเข้าถึงอยู่ใน permissions ของ user หรือไม่
  const hasPermission = user.permissions.includes(path);

  return hasPermission;
}
