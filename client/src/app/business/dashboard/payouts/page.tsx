"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { DollarSign, TrendingUp, Clock, CheckCircle, Plus, Building, Smartphone } from "lucide-react"

const payoutHistory = [
  {
    id: "PO001",
    amount: 12500,
    requestDate: "2024-01-10",
    processedDate: "2024-01-12",
    status: "completed",
    method: "Bank Transfer",
    transactionId: "TXN123456789",
  },
  {
    id: "PO002",
    amount: 8750,
    requestDate: "2024-01-05",
    processedDate: "2024-01-07",
    status: "completed",
    method: "UPI",
    transactionId: "UPI987654321",
  },
  {
    id: "PO003",
    amount: 15000,
    requestDate: "2024-01-14",
    processedDate: null,
    status: "pending",
    method: "Bank Transfer",
    transactionId: null,
  },
]

const earnings = {
  today: 2500,
  thisWeek: 18750,
  thisMonth: 45230,
  available: 22500,
  pending: 15000,
  totalEarned: 125000,
}

export default function PayoutsPage() {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [payoutAmount, setPayoutAmount] = useState("")
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  })
  const { toast } = useToast()

  const handlePayoutRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseFloat(payoutAmount)

    if (amount < 1000) {
      toast({
        title: "Minimum payout amount",
        description: "Minimum payout amount is ₹1,000",
        variant: "destructive",
      })
      return
    }

    if (amount > earnings.available) {
      toast({
        title: "Insufficient balance",
        description: "Requested amount exceeds available balance",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Payout requested",
      description: `Payout request of ₹${amount} has been submitted successfully.`,
    })
    setIsRequestDialogOpen(false)
    setPayoutAmount("")
  }

  const handleBankDetailsChange = (field: string, value: string) => {
    setBankDetails((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
            <p className="text-muted-foreground">Manage your earnings and payout requests</p>
          </div>
          <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>Request a payout from your available earnings</DialogDescription>
              </DialogHeader>
              <form onSubmit={handlePayoutRequest} className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Available Balance:</span>
                      <span className="text-lg font-bold text-green-600">₹{earnings.available.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Minimum payout amount: ₹1,000</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Payout Amount (₹) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      min="1000"
                      max={earnings.available}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Bank Account Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        placeholder="e.g., State Bank of India"
                        value={bankDetails.bankName}
                        onChange={(e) => handleBankDetailsChange("bankName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountHolder">Account Holder Name *</Label>
                      <Input
                        id="accountHolder"
                        placeholder="As per bank records"
                        value={bankDetails.accountHolder}
                        onChange={(e) => handleBankDetailsChange("accountHolder", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        placeholder="Enter account number"
                        value={bankDetails.accountNumber}
                        onChange={(e) => handleBankDetailsChange("accountNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code *</Label>
                      <Input
                        id="ifscCode"
                        placeholder="e.g., SBIN0001234"
                        value={bankDetails.ifscCode}
                        onChange={(e) => handleBankDetailsChange("ifscCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID (Optional)</Label>
                    <Input
                      id="upiId"
                      placeholder="e.g., yourname@paytm"
                      value={bankDetails.upiId}
                      onChange={(e) => handleBankDetailsChange("upiId", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      UPI payments are processed faster (usually within 24 hours)
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Request Payout</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Earnings Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{earnings.today.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From 8 bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{earnings.thisWeek.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{earnings.thisMonth.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{earnings.available.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Ready for payout</p>
            </CardContent>
          </Card>
        </div>

        {/* Payout Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payout Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available Balance</span>
                <span className="font-semibold text-green-600">₹{earnings.available.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Payouts</span>
                <span className="font-semibold text-orange-600">₹{earnings.pending.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Earned</span>
                <span className="font-semibold">₹{earnings.totalEarned.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t">
                <Button className="w-full" onClick={() => setIsRequestDialogOpen(true)}>
                  Request Payout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest earnings and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Booking Payment Received</p>
                      <p className="text-sm text-muted-foreground">Indoor Court 1 - 2 hours</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+₹1,000</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payout Processed</p>
                      <p className="text-sm text-muted-foreground">Bank Transfer - PO002</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">₹8,750</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Multiple Bookings</p>
                      <p className="text-sm text-muted-foreground">5 bookings completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+₹2,500</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>Track all your payout requests and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Processed Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.id}</TableCell>
                    <TableCell>₹{payout.amount.toLocaleString()}</TableCell>
                    <TableCell>{payout.requestDate}</TableCell>
                    <TableCell>
                      {payout.processedDate || <span className="text-muted-foreground">Pending</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {payout.method === "Bank Transfer" ? (
                          <Building className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{payout.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payout.status === "completed"
                            ? "default"
                            : payout.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payout.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {payout.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payout.transactionId || <span className="text-muted-foreground">-</span>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
