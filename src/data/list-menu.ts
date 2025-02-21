import { SidebarMenuType } from "@/types";
import {
  ArrowUpDown,
  Contact,
  Info,
  NotepadText,
  Settings,
  User,
  Wallet,
} from "lucide-react";

export const menus: SidebarMenuType[] = [
  {
    groupName: "Utama",
    items: [
      {
        title: "Transaksi",
        icon: ArrowUpDown,
        subItems: [
          {
            title: "Pembayaran",
            url: "/dashboard/payments",
            icon: Wallet,
          },
          {
            title: "Laporan",
            url: "/dashboard/reports",
            icon: NotepadText,
          },
          
        ],
      },
      {
        title: "Pengguna",
        url: "/dashboard/users",
        icon: User,
      },
    ],
  },
  {
    groupName: "Bantuan",
    items: [
      {
        title: "Informasi",
        url: "/dashboard/informations",
        icon: Info,
      },
      {
        title: "Kontak",
        url: "/dashboard/contacts",
        icon: Contact,
      },
      {
        title: "Pengaturan",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];