import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, PlusCircle, FileText } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing & Invoicing</h1>
          <p className="text-muted-foreground">Create and manage client invoices.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Invoice
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Invoice History</CardTitle>
          <CardDescription>Track generated invoices and their payment status.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No Invoices Yet</h3>
          <p className="text-muted-foreground">Generated invoices will be listed here.</p>
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
