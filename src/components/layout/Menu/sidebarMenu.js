import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  UserOutlined,
  TeamOutlined,
  LockOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  TagsOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const sidebarMenu = [
  {
    key: "1",
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "2",
    label: <Link href="/sales">Sales</Link>,
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "3",
    label: "Products",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "3-1",
        label: <Link href="/products">All Products</Link>,
        icon: <UnorderedListOutlined />,
      },
      {
        key: "3-2",
        label: <Link href="/products/add">Add Product</Link>,
        icon: <PlusOutlined />,
      },
      {
        key: "3-3",
        label: <Link href="/products/categories">Categories</Link>,
        icon: <TagsOutlined />,
      },
      {
        key: "3-4",
        label: <Link href="/products/inventory">Inventory</Link>,
        icon: <InboxOutlined />,
      },
    ],
  },
  {
    key: "4",
    label: <Link href="/reports">Reports</Link>,
    icon: <BarChartOutlined />,
  },
  {
    key: "5",
    label: <Link href="/customers">Customers</Link>,
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
