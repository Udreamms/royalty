import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Package } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Services & Packages</h1>
          <p className="text-muted-foreground">Manage your visa advisory services and packages.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Available Services</CardTitle>
          <CardDescription>List of all services and packages offered.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No Services Defined</h3>
          <p className="text-muted-foreground">Add services like "Visa Application Assistance" or "Document Preparation".</p>
           <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Create a Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
