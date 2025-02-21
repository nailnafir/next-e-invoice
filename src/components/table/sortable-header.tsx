import { ArrowDown, ArrowUp, ArrowUpDown, RefreshCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { translateTable } from "@/lib/utils";
import { Button } from "../ui/button";
import { Column } from "@tanstack/react-table";

type SortableHeaderProps<TData> = {
  label: string;
  column: Column<TData, unknown>;
};

export default function SortableHeader<TData>({
  ...props
}: SortableHeaderProps<TData>) {
  const [open, setOpen] = useState<boolean>(false);
  const sortList = [
    {
      type: "asc",
      icon: ArrowUp,
    },
    {
      type: "desc",
      icon: ArrowDown,
    },
  ];

  return (
    <DropdownMenu open={open} modal={false}>
      <DropdownMenuTrigger asChild onClick={() => setOpen((prev) => !prev)}>
        <Button variant="ghost" className="relative -inset-x-4">
          <span>{translateTable(props.label)}</span>
          {props.column.getIsSorted() === "asc" && (
            <ArrowUp className="relative" />
          )}
          {props.column.getIsSorted() === "desc" && (
            <ArrowDown className="relative" />
          )}
          {!props.column.getIsSorted() && <ArrowUpDown className="relative" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        onInteractOutside={() => setOpen(false)}
      >
        <DropdownMenuGroup>
          {sortList.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => props.column.toggleSorting(item.type === "desc")}
            >
              <item.icon />
              <span>{translateTable(item.type)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          className="focus:bg-red-500 focus:text-white"
          onClick={() => props.column.clearSorting()}
        >
          <RefreshCcw />
          <span>Atur Ulang</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
