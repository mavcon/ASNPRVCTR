"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Edit, Eye, UserX, Mail, ShoppingBag, DollarSign, BarChart2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Artist {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  productsCount: number
  totalSales: number
  totalRevenue: number
  joinDate: string
}

const sampleArtists: Artist[] = [
  {
    id: "1",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "active",
    productsCount: 24,
    totalSales: 345,
    totalRevenue: 12543,
    joinDate: "2023-05-12",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    status: "active",
    productsCount: 18,
    totalSales: 287,
    totalRevenue: 9876,
    joinDate: "2023-06-03",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    status: "active",
    productsCount: 32,
    totalSales: 412,
    totalRevenue: 15432,
    joinDate: "2023-04-28",
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    status: "inactive",
    productsCount: 15,
    totalSales: 178,
    totalRevenue: 6543,
    joinDate: "2023-07-15",
  },
  {
    id: "5",
    name: "Jessica Kim",
    email: "jessica.kim@example.com",
    status: "active",
    productsCount: 27,
    totalSales: 356,
    totalRevenue: 13210,
    joinDate: "2023-06-22",
  },
  {
    id: "6",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    status: "pending",
    productsCount: 0,
    totalSales: 0,
    totalRevenue: 0,
    joinDate: "2023-03-10",
  },
  {
    id: "7",
    name: "Amanda Wilson",
    email: "amanda.wilson@example.com",
    status: "active",
    productsCount: 21,
    totalSales: 298,
    totalRevenue: 10987,
    joinDate: "2023-05-30",
  },
  {
    id: "8",
    name: "James Brown",
    email: "james.brown@example.com",
    status: "active",
    productsCount: 19,
    totalSales: 267,
    totalRevenue: 9876,
    joinDate: "2023-07-02",
  },
  {
    id: "9",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    status: "inactive",
    productsCount: 12,
    totalSales: 145,
    totalRevenue: 5432,
    joinDate: "2023-04-15",
  },
  {
    id: "10",
    name: "Kevin Lee",
    email: "kevin.lee@example.com",
    status: "active",
    productsCount: 29,
    totalSales: 378,
    totalRevenue: 14321,
    joinDate: "2023-02-28",
  },
]

export function ArtistManagementTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [isAssigningProducts, setIsAssigningProducts] = useState(false)

  const filteredArtists = sampleArtists.filter((artist) => {
    // Apply status filter
    if (statusFilter !== "all" && artist.status !== statusFilter) {
      return false
    }

    // Apply search filter
    if (
      searchTerm &&
      !artist.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !artist.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "inactive":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
      case "pending":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  const handleAssignProducts = () => {
    setIsAssigningProducts(false)

    toast({
      title: "Products assigned",
      description: `Products have been assigned to ${selectedArtist?.name} successfully.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search artists..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artist</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtists.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No artists found.
                </TableCell>
              </TableRow>
            ) : (
              filteredArtists.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{artist.name}</div>
                      <div className="text-sm text-muted-foreground">{artist.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(artist.status)}>
                      {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{artist.productsCount}</TableCell>
                  <TableCell>{artist.totalSales}</TableCell>
                  <TableCell>${artist.totalRevenue.toLocaleString()}</TableCell>
                  <TableCell>{new Date(artist.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedArtist(artist)
                            setIsAssigningProducts(true)
                          }}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Assign Products
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Payment History
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <UserX className="mr-2 h-4 w-4" />
                          Deactivate Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAssigningProducts} onOpenChange={setIsAssigningProducts}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Products to Artist</DialogTitle>
            <DialogDescription>Select products to assign to {selectedArtist?.name}.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Products</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product1">Abstract Painting - Blue Horizon</SelectItem>
                  <SelectItem value="product2">Landscape Print - Mountain View</SelectItem>
                  <SelectItem value="product3">Portrait Study - The Gaze</SelectItem>
                  <SelectItem value="product4">Digital Art - Cyberpunk City</SelectItem>
                  <SelectItem value="product5">Mixed Media - Urban Jungle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Products</label>
              <div className="rounded-md border p-4 min-h-[100px]">
                <div className="flex items-center justify-between py-1">
                  <span>Abstract Painting - Blue Horizon</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6L6 18"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </Button>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Digital Art - Cyberpunk City</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6L6 18"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssigningProducts(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignProducts}>Assign Products</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

