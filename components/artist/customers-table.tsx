"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Customer {
  id: string
  name: string
  email: string
  totalSpent: number
  orders: number
  lastPurchase: string
  type: "new" | "repeat"
}

const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    totalSpent: 129.0,
    orders: 1,
    lastPurchase: "2023-11-14",
    type: "new",
  },
  {
    id: "CUST-002",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    totalSpent: 459.0,
    orders: 1,
    lastPurchase: "2023-11-12",
    type: "new",
  },
  {
    id: "CUST-003",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    totalSpent: 299.0,
    orders: 1,
    lastPurchase: "2023-11-10",
    type: "new",
  },
  {
    id: "CUST-004",
    name: "William Kim",
    email: "william.kim@email.com",
    totalSpent: 99.0,
    orders: 1,
    lastPurchase: "2023-11-08",
    type: "new",
  },
  {
    id: "CUST-005",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    totalSpent: 1398.0,
    orders: 2,
    lastPurchase: "2023-11-05",
    type: "repeat",
  },
]

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const email = row.original.email
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/avatars/0${Number.parseInt(row.id.slice(-1)) + 1}.png`} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "totalSpent",
    header: () => <div className="text-right">Total Spent</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("totalSpent"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "orders",
    header: () => <div className="text-center">Orders</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("orders")}</div>
    },
  },
  {
    accessorKey: "lastPurchase",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Purchase
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("lastPurchase")}</div>,
  },
  {
    accessorKey: "type",
    header: "Customer Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant={type === "repeat" ? "default" : "secondary"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>
              Copy customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View purchase history</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface ArtistCustomersTableProps {
  type?: "new" | "repeat"
}

export function ArtistCustomersTable({ type }: ArtistCustomersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const filteredCustomers = type ? customers.filter((customer) => customer.type === type) : customers

  const table = useReactTable({
    data: filteredCustomers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

