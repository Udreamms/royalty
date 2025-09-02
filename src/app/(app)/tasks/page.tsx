import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, PlusCircle, CalendarDays } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Task Management</h1>
          <p className="text-muted-foreground">Organize and track your to-dos and reminders.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <CalendarDays className="mr-2 h-4 w-4" /> Calendar View
            </Button>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Task
            </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
          <CardDescription>Manage your tasks, set priorities, and assign to team members.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <ListChecks className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No Tasks Available</h3>
          <p className="text-muted-foreground">Create tasks for follow-ups, document checks, or client meetings.</p>
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Create a Task
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
