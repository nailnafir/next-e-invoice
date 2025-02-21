import { usePathname } from "next/navigation";
import { SidebarMenuType } from "@/types";

export function useActiveMenu(menus: SidebarMenuType[]): SidebarMenuType[] {
  const pathname = usePathname();

  const updateActiveStates = (items: SidebarMenuType["items"]) => {
    return items.map((item) => {
      const updatedItem = { ...item };

      if (updatedItem.subItems) {
        const hasActiveChild = updatedItem.subItems.some(
          (subItem) => subItem.url === pathname
        );

        updatedItem.subItems = updatedItem.subItems.map((subItem) => ({
          ...subItem,
          isActive: subItem.url === pathname,
        }));

        updatedItem.isActive = hasActiveChild;
      } else {
        updatedItem.isActive = updatedItem.url === pathname;
      }

      return updatedItem;
    });
  };

  return menus.map((menu) => ({
    ...menu,
    items: updateActiveStates(menu.items),
  }));
}
