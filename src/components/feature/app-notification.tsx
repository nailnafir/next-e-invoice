"use client";

import { Bell, Circle } from "lucide-react";
import { Button } from "../ui/button";
import { NotificationListItemType } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn, formatTimeDifferenceIndonesian } from "@/lib/utils";
import { Fragment, useState } from "react";
import { listNotification } from "@/data/list-notification";

export default function AppNotification() {
  const [open, setOpen] = useState<boolean>(false);
  const [notifications, setNotifications] =
    useState<NotificationListItemType[]>(listNotification);

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));

  const markAsRead = (index: number) =>
    setNotifications((prev) =>
      prev.map((prevItem, prevIndex) =>
        prevIndex === index ? { ...prevItem, isRead: true } : prevItem
      )
    );

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" onInteractOutside={() => setOpen(false)}>
        <DropdownMenuLabel className="font-bold">Notifikasi</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        {notifications.map((item, index) => (
          <Fragment key={index + item.title}>
            <DropdownMenuItem
              className="flex items-start space-x-2 px-4 py-2"
              onClick={markAsRead.bind(null, index)}
            >
              <Circle
                className={cn(
                  "w-2 h-2 mt-1 rounded-full",
                  item.isRead
                    ? "text-gray-500 bg-gray-500"
                    : "text-primary bg-primary"
                )}
              />
              <div className="flex flex-col space-y-2">
                <p
                  className={cn(
                    "text-sm",
                    item.isRead ? "text-gray-500" : "font-semibold"
                  )}
                >
                  {item.title}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    item.isRead ? "text-gray-500" : "font-light"
                  )}
                >
                  {formatTimeDifferenceIndonesian(new Date(item.time))}
                </p>
              </div>
            </DropdownMenuItem>
            {notifications.length - 1 !== index && (
              <DropdownMenuSeparator className="mx-4" />
            )}
          </Fragment>
        ))}
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="font-bold text-xs" onClick={markAllAsRead}>
          Tandai semua dibaca
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
