"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReactElement, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
  Search,
  Settings2Icon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { translateTable } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Status } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchBy?: string;
  filterStatusList?: Status[];
  summaryCounter?: ReactElement;
  actionButton?: ReactElement;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchBy,
  filterStatusList,
  summaryCounter,
  actionButton,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openFilterStatus, setFilterStatusOpen] = useState<boolean>(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="max-sm:max-w-sm">
      <div className="flex items-center py-4 gap-4">
        {searchBy && (
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={`Cari ${translateTable(searchBy).toLowerCase()}...`}
              value={
                (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(searchBy)?.setFilterValue(event.target.value)
              }
              className="pl-10 max-sm:placeholder:text-sm"
            />
          </div>
        )}
        {filterStatusList && (
          <Popover open={openFilterStatus} onOpenChange={setFilterStatusOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListFilter className="h-4 w-4" />
                <span className="max-sm:sr-only">Status</span>
                {selectedStatuses.length > 0 && (
                  <div className="flex flex-row gap-2 items-center">
                    <Separator orientation="vertical" className="h-4" />
                    <Badge className="text-xs bg-primary pt-0">
                      {selectedStatuses.length}
                      <span className="ml-1 max-sm:hidden">dipilih</span>
                    </Badge>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 max-w-[180px]"
              side="bottom"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Cari status..." />
                <CommandList>
                  <CommandEmpty>Tidak ada data.</CommandEmpty>
                  <CommandGroup>
                    {filterStatusList.map((status) => {
                      const isSelected = selectedStatuses.includes(status.name);
                      return (
                        <CommandItem
                          key={status.name}
                          value={status.name}
                          onSelect={(statusName) =>
                            setSelectedStatuses((current) => {
                              const updated = current.includes(statusName)
                                ? current.filter((name) => name !== statusName)
                                : [...current, statusName];

                              table
                                .getColumn("status")
                                ?.setFilterValue(
                                  updated.length ? updated : undefined
                                );

                              return updated;
                            })
                          }
                        >
                          <Checkbox checked={isSelected} />
                          <div className="flex items-center ml-2 gap-2">
                            <status.icon className="h-4 w-4" />
                            <span>{translateTable(status.name)}</span>
                          </div>
                          <span className="ml-auto text-sm text-muted-foreground">
                            {status.total}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <Button
                  className="hover:bg-red-500 hover:text-accent-foreground"
                  variant="ghost"
                  onClick={() =>
                    setSelectedStatuses(() => {
                      table.getColumn("status")?.setFilterValue(undefined);

                      return [];
                    })
                  }
                >
                  Atur Ulang
                </Button>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        <div className="flex flex-row ml-auto gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings2Icon />
                {!actionButton && <span>Tampilkan</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actionButton && (
                <>
                  <span className="p-2 font-bold text-sm">Tampilkan</span>
                  <DropdownMenuSeparator />
                </>
              )}
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {translateTable(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {actionButton}
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} dari{" "}
          {table.getFilteredRowModel().rows.length} baris dipilih.
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="bottom">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium">Baris per halaman</p>
        </div>
      </div>
      <div className="rounded-md border shadow shadow-card-foreground/25">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {summaryCounter}
      <div className="flex items-center justify-between py-4">
        <div className="flex text-sm text-muted-foreground">
          {table.getPageCount()} Total Halaman
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <p className="text-sm font-medium">
            {table.getState().pagination.pageIndex + 1}
          </p>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
