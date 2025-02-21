import { ListThemeType } from "@/types";
import { Moon, Sun } from "lucide-react";

export const listTheme: ListThemeType = [
  {
    label: "Terang",
    name: "light",
    icon: Sun,
  },
  {
    label: "Gelap",
    name: "dark",
    icon: Moon,
  },
];
