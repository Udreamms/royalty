"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MoreVertical, Search, Lock, Filter } from "lucide-react";
import { RingChart } from "@/components/ui/ring-chart";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useState } from "react";

const PlaceholderContent = ({ text, icon }: { text: string; icon: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
    {icon}
    <p className="mt-2 text-sm">{text}</p>
  </div>
);

const NoDataFound = () => <PlaceholderContent text="No Data Found" icon={<Search className="h-8 w-8" />} />;
const NoPipelineAvailable = () => <PlaceholderContent text="No pipeline available" icon={<Lock className="h-8 w-8" />} />;

export default function DashboardPage() {
  const chartData = [
    { month: 'Jan', value: 186 },
    { month: 'Feb', value: 305 },
    { month: 'Mar', value: 237 },
    { month: 'Apr', value: 73 },
    { month: 'May', value: 209 },
    { month: 'Jun', value: 214 },
    { month: 'Jul', value: 250 },
    { month: 'Aug', value: 310 },
    { month: 'Sep', value: 280 },
    { month: 'Oct', value: 200 },
    { month: 'Nov', value: 180 },
    { month: 'Dec', value: 190 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded-md shadow-lg">
          <p className="font-bold">{label}</p>
          <p className="text-sm">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const [selectedDateProperty, setSelectedDateProperty] = useState("status_change");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Opportunity Status</CardTitle>
            <Select>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Pipelines" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pipelines</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <NoDataFound />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Opportunity Value</CardTitle>
            <Select>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Pipelines" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pipelines</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <NoDataFound />
          </CardContent>
        </Card>
        {/* Conversion Card - Updated */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Pipelines" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pipelines</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectedDateProperty} value={selectedDateProperty}>
                <SelectTrigger className="w-[40px] p-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 text-xs text-muted-foreground">
                    Date property on which the <br /> opportunities should be calculated
                  </div>
                  <SelectItem value="status_change">Status change</SelectItem>
                  <SelectItem value="created_on">Created on</SelectItem>
                  <SelectItem value="updated_on">Updated on</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <p className="text-3xl font-bold">$0</p>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-[8px] text-white leading-none">&#9650;</span>
              </span>
              0% vs Last 31 Days
            </p>
            <div className="h-32 w-32 mt-4 relative">
              {/* Aquí se actualizó el valor de 'value' a 75 para que el círculo se muestre */}
              <RingChart data={[{ name: 'Won', value: 75, fill: 'hsl(var(--primary))' }]} />
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">0%</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Won revenue</p>
            <p className="font-bold text-sm">$0</p>

            <div className="grid grid-cols-3 gap-2 mt-6 w-full max-w-sm">
              <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-sm">
                <p className="text-muted-foreground text-xs">Leads Converted</p>
                <p className="font-bold text-xl">0</p>
              </div>
              <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-sm">
                <p className="text-muted-foreground text-xs">Avg. Conv. Value</p>
                <p className="font-bold text-xl">$0</p>
              </div>
              <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-sm">
                <p className="text-muted-foreground text-xs">Conv. Rate (%)</p>
                <p className="font-bold text-xl">0%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Funnel Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Funnel</CardTitle>
            <div className="flex gap-2">
              <Select disabled>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="No pipeline available" /></SelectTrigger>
                <SelectContent />
              </Select>
              <Select onValueChange={setSelectedDateProperty} value={selectedDateProperty}>
                <SelectTrigger className="w-[40px] p-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 text-xs text-muted-foreground">
                    Date property on which the <br /> opportunities should be calculated
                  </div>
                  <SelectItem value="status_change">Status change</SelectItem>
                  <SelectItem value="created_on">Created on</SelectItem>
                  <SelectItem value="updated_on">Updated on</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$0</p>
            <p className="text-xs text-green-500">+0%</p>
            <NoPipelineAvailable />
          </CardContent>
        </Card>
        {/* Stage Distribution Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Stage Distribution</CardTitle>
            <div className="flex gap-2">
              <Select disabled>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="No pipeline available" /></SelectTrigger>
                <SelectContent />
              </Select>
              <Select onValueChange={setSelectedDateProperty} value={selectedDateProperty}>
                <SelectTrigger className="w-[40px] p-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2 text-xs text-muted-foreground">
                    Date property on which the <br /> opportunities should be calculated
                  </div>
                  <SelectItem value="status_change">Status change</SelectItem>
                  <SelectItem value="created_on">Created on</SelectItem>
                  <SelectItem value="updated_on">Updated on</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <NoPipelineAvailable />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="pending">
                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="due_date_asc">
                <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="due_date_asc">Due Date (ASC)</SelectItem>
                  <SelectItem value="due_date_desc">Due Date (DESC)</SelectItem>
                  <SelectItem value="date_added_asc">Date Added (ASC)</SelectItem>
                  <SelectItem value="date_added_desc">Date Added (DESC)</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">all</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <NoDataFound />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Manual Actions</CardTitle>
              <div className="flex gap-2">
                  <Select defaultValue="all">
                      <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                      <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">all</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 text-center mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Phone</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">SMS</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Pending</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
            <Button variant="link" className="w-full">Go to Manual Actions &rarr;</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Lead Source Report</CardTitle>
          <Select>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Pipelines" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Pipelines</SelectItem></SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <NoDataFound />
        </CardContent>
        <div className="flex justify-end p-4">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="mx-2">1</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Google Analytics Report</CardTitle>
          <CardDescription className="text-xs">(Last 12 months)</CardDescription>
        </CardHeader>
        <CardContent>
          <NoDataFound />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Google Analytics Report</CardTitle>
          <CardDescription className="text-xs">(Last 12 months)</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <Search className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No Data Found</p>
            </div>
          </div>
          <ChartContainer config={{ value: { label: "Value", color: "hsl(var(--primary))" } }} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="value" fill="#007bff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium">Google Business Profile</CardTitle>
            <CardDescription className="text-xs">(Last 30 Days)</CardDescription>
          </div>
          <Select>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Please Select" /></SelectTrigger>
            <SelectContent><SelectItem value="select">Please Select</SelectItem></SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Total views</p></div>
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Search (Desktop & Mobile)</p></div>
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Maps (Desktop & Mobile)</p></div>
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Conversations</p></div>
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Bookings</p></div>
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Website visits</p></div>
          <div><p className="font-bold text-2xl">0</p><p className="text-xs text-muted-foreground">Calls</p></div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Facebook Ads Report</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><p className="text-muted-foreground">Total Clicks</p><p className="font-bold text-2xl">0</p></div>
            <div><p className="text-muted-foreground">Total Spent</p><p className="font-bold text-2xl">$0</p></div>
            <div><p className="text-muted-foreground">CPC</p><p className="font-bold text-2xl">$0</p></div>
            <div><p className="text-muted-foreground">CTR</p><p className="font-bold text-2xl">0%</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm font-medium">Google Ads Report</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><p className="text-muted-foreground">Total Clicks</p><p className="font-bold text-2xl">0</p></div>
            <div><p className="text-muted-foreground">Total Spent</p><p className="font-bold text-2xl">$0</p></div>
            <div><p className="text-muted-foreground">CPC</p><p className="font-bold text-2xl">$0</p></div>
            <div><p className="text-muted-foreground">CTR</p><p className="font-bold text-2xl">0%</p></div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Efficiency Card */}
      <Card className="max-w-md">
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Sales Efficiency</CardTitle>
            <div className="flex gap-2">
                <Select><SelectTrigger className="w-[120px]"><SelectValue placeholder="All Pipelines" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem></SelectContent></Select>
                <Select><SelectTrigger className="w-[80px]"><SelectValue placeholder="all" /></SelectTrigger><SelectContent><SelectItem value="all">all</SelectItem></SelectContent></Select>
                <Select onValueChange={setSelectedDateProperty} value={selectedDateProperty}>
                  <SelectTrigger className="w-[40px] p-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2 text-xs text-muted-foreground">
                      Date property on which the <br /> opportunities should be calculated
                    </div>
                    <SelectItem value="status_change">Status change</SelectItem>
                    <SelectItem value="created_on">Created on</SelectItem>
                    <SelectItem value="updated_on">Updated on</SelectItem>
                  </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-xs text-muted-foreground">Average sales duration</p>
                <p className="font-bold text-xl">0s</p>
                <p className="text-xs text-green-500">+ 0%</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Total Sale Value</p>
                <p className="font-bold text-xl">$0</p>
                <p className="text-xs text-green-500">+ 0%</p>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Sales Velocity</p>
                <p className="font-bold text-xl">$0/M</p>
                <p className="text-xs text-green-500">+ 0%</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}