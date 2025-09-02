import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, LineChart, PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground">Gain insights into your business performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Sales Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <LineChart className="h-24 w-24 text-muted-foreground" />
             <p className="ml-4 text-muted-foreground">Sales chart data</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Lead Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <PieChart className="h-24 w-24 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Conversion funnel data</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Service Popularity</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <BarChart3 className="h-24 w-24 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Service popularity chart</p>
          </CardContent>
        </Card>
      </div>
       <Card className="shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Custom Reports</CardTitle>
          <CardDescription>Generate and view custom reports.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[200px] text-center">
          <p className="text-muted-foreground">Custom report generation feature coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
