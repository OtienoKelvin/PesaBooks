import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function InvoiceTable() {
  const invoices = [
    {
      invoice: "INV-001",
      client: "Acme Corp",
      amount: "$1,200.00",
      status: "Paid",
      date: "2026-02-15",
    },
    {
      invoice: "INV-002",
      client: "Globex Inc",
      amount: "$850.00",
      status: "Pending",
      date: "2026-02-14",
    },
    {
      invoice: "INV-003",
      client: "Soylent Co",
      amount: "$2,400.00",
      status: "Overdue",
      date: "2026-02-12",
    },
    {
      invoice: "INV-004",
      client: "Initech",
      amount: "$650.00",
      status: "Paid",
      date: "2026-02-10",
    },
    {
      invoice: "INV-005",
      client: "Umbrella Corp",
      amount: "$3,100.00",
      status: "Pending",
      date: "2026-02-08",
    },
  ]

  const statusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Overdue":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (

    <Card className="w-full">
       <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            You have {invoices.length} invoices this month.
          </CardDescription>
        </div>
        <Button asChild size="sm" variant="outline" className="ml-auto">
          <a href="/invoices/new">New Invoice</a>
        </Button>
      </CardHeader> 
      <CardContent>
        <Table> 
            <TableHeader>
            <TableRow className="bg-muted">
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {invoices.map((inv) => (
                <TableRow key={inv.invoice}>
                <TableCell>{inv.invoice}</TableCell>
                <TableCell>{inv.client}</TableCell>
                <TableCell>{inv.amount}</TableCell>
                <TableCell>
                    <Badge className={statusColor(inv.status)}>
                    {inv.status}
                    </Badge>
                </TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                    View
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </CardContent>
    </Card>
  )
}