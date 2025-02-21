import { LucideIcon } from "lucide-react";

export type SignInFormTypes = {
  email: "";
  password: "";
};

export type ListThemeType = {
  label: string;
  name: string;
  icon: LucideIcon;
}[];

export type SidebarMenuItemType = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
};

export type SidebarMenuType = {
  groupName: string;
  items: SidebarMenuItemType[];
};

export type SidebarUserType = {
  name: string;
  email: string;
  avatar: string;
};

export type NotificationListItemType = {
  title: string;
  time: Date;
  isRead: boolean;
};

export type Status = {
  name: string;
  icon: LucideIcon;
  total?: number | undefined;
};

export type Payment = {
  id: string;
  amount: number;
  status: "ditunda" | "disetujui" | "ditolak";
  method: string;
  name: string;
  description: string;
  accountNumber: number;
  date: Date;
  image: string;
};

export type User = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: "pengelola" | "pemohon";
  password: string;
};

export type Report = {
  type: string;
  status: string;
  total: number;
  totalAmount?: number | undefined;
};
