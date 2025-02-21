import { NotificationListItemType } from "@/types";

export const listNotification: NotificationListItemType[] = [
  {
    isRead: false,
    title: "Permohonan Baru",
    time: new Date("2025-01-23T10:11:42"),
  },
  {
    isRead: true,
    title: "Masuk Perangkat Baru",
    time: new Date("2025-01-18T12:15:22"),
  },
  {
    isRead: false,
    title: "Penolakan Permohonan Baru",
    time: new Date("2025-01-08T10:11:09"),
  },
];