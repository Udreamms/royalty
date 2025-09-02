import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, PlusCircle } from "lucide-react";

export default function SalesPipelinePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground">Visualize and manage your sales funnel.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Opportunity
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Pipeline Stages</CardTitle>
          <CardDescription>Drag and drop opportunities between stages.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AreaChart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">Sales Pipeline View Coming Soon</h3>
          <p className="text-muted-foreground">This area will display your customizable sales pipeline (e.g., Prospect, Contacted, Proposal, Won).</p>
        </CardContent>
      </Card>
    </div>
  );
}
