import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  UserOutlined,
  TeamOutlined,
  LockOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const sidebarMenu = [
  {
    key: "1",
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    label: "Sales",
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "3",
    label: "Products",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "3-1",
        label: "Show All",
      },
    ],
  },
  {
    key: "4",
    label: "Reports",
    icon: <BarChartOutlined />,
  },
  {
    key: "5",
    label: "Customers",
    icon: <UserOutlined />,
  },
  {
    key: "6",
    label: <Link href="/users">Users</Link>,
    icon: <TeamOutlined />,
  },
  {
    key: "7",
    label: <Link href="/permissions">Permissions</Link>,
    icon: <LockOutlined />,
  },
];
