
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Edit3 } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">User Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings.</p>
        </div>
        <Button variant="outline" disabled>
          <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <Card className="shadow-lg bg-card text-card-foreground border-border">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">UDREAMMS User</CardTitle>
          <CardDescription>udreamms@gmail.com</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-md mx-auto">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="UDREAMMS User" disabled className="bg-input border-border disabled:opacity-70" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="udreamms@gmail.com" disabled className="bg-input border-border disabled:opacity-70" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Administrator" disabled className="bg-input border-border disabled:opacity-70" />
          </div>
           <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled>Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
