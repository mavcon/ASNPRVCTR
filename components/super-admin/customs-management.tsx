"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Info, AlertTriangle, FileText, Edit } from "lucide-react"
import { countries } from "@/lib/countries-data"

// This would typically come from a store, but for demo purposes we'll use local state
const initialCustomsData = [
  {
    countryCode: "US",
    dutyRate: 0,
    dutyThreshold: 800,
    requiresCommercialInvoice: true,
    requiresCustomsDeclaration: true,
    notes: "USMCA (formerly NAFTA) rules apply. Most products ship duty-free.",
  },
  {
    countryCode: "UK",
    dutyRate: 4.5,
    dutyThreshold: 135,
    requiresCommercialInvoice: true,
    requiresCustomsDeclaration: true,
    notes: "Post-Brexit rules apply. VAT is collected at checkout for orders under £135.",
  },
  {
    countryCode: "AU",
    dutyRate: 5,
    dutyThreshold: 1000,
    requiresCommercialInvoice: true,
    requiresCustomsDeclaration: true,
    notes: "GST is collected at checkout for all orders.",
  },
  {
    countryCode: "DE",
    dutyRate: 4.2,
    dutyThreshold: 150,
    requiresCommercialInvoice: true,
    requiresCustomsDeclaration: true,
    notes: "EU import rules apply. VAT is collected at checkout.",
  },
  {
    countryCode: "FR",
    dutyRate: 4.2,
    dutyThreshold: 150,
    requiresCommercialInvoice: true,
    requiresCustomsDeclaration: true,
    notes: "EU import rules apply. VAT is collected at checkout.",
  },
  {
    countryCode: "JP",
    dutyRate: 10,
    dutyThreshold: 16666,
    requiresCommercialInvoice: true,
    requiresCustomsDeclaration: true,
    notes: "Japan customs can be strict. Ensure accurate product descriptions.",
  },
]

export function CustomsManagement() {
  const [customsData, setCustomsData] = useState(initialCustomsData)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingCustoms, setEditingCustoms] = useState<any>(null)
  const [infoDialogOpen, setInfoDialogOpen] = useState(false)

  // Open edit dialog
  const openEditDialog = (countryCode: string) => {
    const customsInfo = customsData.find((c) => c.countryCode === countryCode)
    if (customsInfo) {
      setEditingCustoms({ ...customsInfo })
      setEditDialogOpen(true)
    }
  }

  // Save customs data
  const saveCustomsData = () => {
    if (!editingCustoms) return

    setCustomsData((prev) =>
      prev.map((item) => (item.countryCode === editingCustoms.countryCode ? editingCustoms : item)),
    )

    setEditDialogOpen(false)
    setEditingCustoms(null)
  }

  return (
    <div className="space-y-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Customs Information</h3>
              <p className="text-sm text-muted-foreground">
                Manage customs and duties information for international shipments from Toronto, Canada
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setInfoDialogOpen(true)}>
              <Info className="mr-2 h-4 w-4" />
              Customs Guide
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>International Customs Requirements</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Duty Rate</TableHead>
                <TableHead>Duty-Free Threshold</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customsData.map((item) => {
                const country = countries.find((c) => c.code === item.countryCode)

                return (
                  <TableRow key={item.countryCode}>
                    <TableCell className="font-medium">{country?.name || item.countryCode}</TableCell>
                    <TableCell>{item.dutyRate}%</TableCell>
                    <TableCell>${item.dutyThreshold.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.requiresCommercialInvoice && (
                          <Badge variant="outline" className="bg-blue-50">
                            Commercial Invoice
                          </Badge>
                        )}
                        {item.requiresCustomsDeclaration && (
                          <Badge variant="outline" className="bg-amber-50">
                            Customs Declaration
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(item.countryCode)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Customs Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customs Information</DialogTitle>
            <DialogDescription>
              {editingCustoms && (
                <>
                  Update customs and duties information for{" "}
                  {countries.find((c) => c.code === editingCustoms.countryCode)?.name}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="duty-rate">Duty Rate (%)</Label>
              <Input
                id="duty-rate"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={editingCustoms?.dutyRate || 0}
                onChange={(e) =>
                  setEditingCustoms((prev) => (prev ? { ...prev, dutyRate: Number.parseFloat(e.target.value) } : null))
                }
              />
              <p className="text-xs text-muted-foreground">Average duty rate for products shipped to this country</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duty-threshold">Duty-Free Threshold ($)</Label>
              <Input
                id="duty-threshold"
                type="number"
                step="1"
                min="0"
                value={editingCustoms?.dutyThreshold || 0}
                onChange={(e) =>
                  setEditingCustoms((prev) =>
                    prev ? { ...prev, dutyThreshold: Number.parseInt(e.target.value) } : null,
                  )
                }
              />
              <p className="text-xs text-muted-foreground">Order value below which duties are not typically charged</p>
            </div>

            <div className="space-y-3">
              <Label>Required Documentation</Label>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="commercial-invoice"
                  checked={editingCustoms?.requiresCommercialInvoice}
                  onCheckedChange={(checked) =>
                    setEditingCustoms((prev) =>
                      prev ? { ...prev, requiresCommercialInvoice: checked === true } : null,
                    )
                  }
                />
                <Label htmlFor="commercial-invoice" className="text-sm font-normal">
                  Commercial Invoice
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customs-declaration"
                  checked={editingCustoms?.requiresCustomsDeclaration}
                  onCheckedChange={(checked) =>
                    setEditingCustoms((prev) =>
                      prev ? { ...prev, requiresCustomsDeclaration: checked === true } : null,
                    )
                  }
                />
                <Label htmlFor="customs-declaration" className="text-sm font-normal">
                  Customs Declaration Form
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={editingCustoms?.notes || ""}
                onChange={(e) => setEditingCustoms((prev) => (prev ? { ...prev, notes: e.target.value } : null))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCustomsData}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customs Info Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              International Shipping from Canada Guide
            </DialogTitle>
            <DialogDescription>
              Important information for shipping internationally from Toronto, Canada
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <h3 className="font-medium">Required Documentation</h3>
              <p className="text-sm">
                When shipping internationally from Canada, the following documents are typically required:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Commercial Invoice (3-4 copies)</li>
                <li>Canada Customs Invoice (CCI) for high-value shipments</li>
                <li>Certificate of Origin (for countries with trade agreements)</li>
                <li>Shipping label with customs declaration</li>
                <li>Packing list</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Harmonized System (HS) Codes</h3>
              <p className="text-sm">
                All products must be classified with the correct HS code. This affects duty rates and eligibility for
                preferential treatment under trade agreements.
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Trade Agreements</h3>
              <p className="text-sm">Canada has several trade agreements that may reduce or eliminate duties:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>USMCA/CUSMA</strong> (formerly NAFTA) - United States and Mexico
                </li>
                <li>
                  <strong>CETA</strong> - European Union
                </li>
                <li>
                  <strong>CPTPP</strong> - Australia, Japan, and other Pacific nations
                </li>
                <li>
                  <strong>CKFTA</strong> - South Korea
                </li>
                <li>
                  <strong>CUFTA</strong> - Ukraine
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                Common Issues
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Incorrect or missing HS codes</li>
                <li>Undervalued goods (customs agencies may question values that seem too low)</li>
                <li>Incomplete description of goods</li>
                <li>Missing country of origin information</li>
                <li>Failure to include all required documentation</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Carrier-Specific Requirements</h3>
              <p className="text-sm">Different carriers may have specific requirements:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>Canada Post</strong> - Uses CN22/CN23 customs forms
                </li>
                <li>
                  <strong>FedEx/UPS/DHL</strong> - Have their own customs forms and electronic systems
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

