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
import { ArrowUpDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  orderId: string
  customer: string
  product: string
  date: string
  amount: number
  commission: number
  earnings: number
}

const transactions: Transaction[] = [
  {
    id: "TRX-001",
    orderId: "ORD-001",
    customer: "Olivia Martin",
    product: "Abstract Landscape (Print)",
    date: "2023-11-14",
    amount: 129.0,
    commission: 19.35,
    earnings: 109.65,
  },
  {
    id: "TRX-002",
    orderId: "ORD-002",
    customer: "Jackson Lee",
    product: "Urban Nightscape (Original)",
    date: "2023-11-12",
    amount: 459.0,
    commission: 68.85,
    earnings: 390.15,
  },
  {
    id: "TRX-003",
    orderId: "ORD-003",
    customer: "Isabella Nguyen",
    product: "Serenity (Limited Edition)",
    date: "2023-11-10",
    amount: 299.0,
    commission: 44.85,
    earnings: 254.15,
  },
  {
    id: "TRX-004",
    orderId: "ORD-004",
    customer: "William Kim",
    product: "Coastal Dreams (Print)",
    date: "2023-11-08",
    amount: 99.0,
    commission: 14.85,
    earnings: 84.15,
  },
  {
    id: "TRX-005",
    orderId: "ORD-005",
    customer: "Sofia Davis",
    product: "Autumn Reflections (Original)",
    date: "2023-11-05",
    amount: 699.0,
    commission: 104.85,
    earnings: 594.15,
  },
]

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("orderId")}</div>,
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("product")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Sale Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "commission",
    header: () => <div className="text-right">Commission</div>,
    cell: ({ row }) => {
      const commission = Number.parseFloat(row.getValue("commission"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(commission)
      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "earnings",
    header: ({ column }) => (
      <div className="text-right">
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Your Earnings
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const earnings = Number.parseFloat(row.getValue("earnings"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(earnings)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export function ArtistEarningsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [productTypeFilter, setProductTypeFilter] = useState("all")

  const table = useReactTable({
    data: transactions,
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
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sales..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="text-sm text-muted-foreground">Filter by:</div>
          <Select
            value={productTypeFilter}
            onValueChange={(value) => {
              setProductTypeFilter(value)
              if (value === "all") {
                setColumnFilters([])
              } else {
                setColumnFilters([
                  {
                    id: "product",
                    value:
                      value === "original"
                        ? "Original"
                        : value === "print"
                          ? "Print"
                          : value === "limited"
                            ? "Limited Edition"
                            : "",
                  },
                ])
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="original">Originals</SelectItem>
              <SelectItem value="print">Prints</SelectItem>
              <SelectItem value="limited">Limited Editions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
                  No sales found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

