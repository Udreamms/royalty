
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, TrendingUp, Briefcase, FileText } from "lucide-react";
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

// --- Data Types ---
interface Prospect {
  id: string;
  createdAt: Timestamp;
  currentPipeline: 'inbox' | 'procesoCitas' | 'clasesOnline' | 'converted' | 'lost';
}

interface KpiData {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
}

// --- Helper Components ---

const KpiCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-5 w-5 rounded-sm" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="mt-2 h-3 w-full" />
    </CardContent>
  </Card>
);

const KpiCard = ({ title, value, icon: Icon, description }: KpiData) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}</div>
      <p className="text-xs text-muted-foreground pt-1">{description}</p>
    </CardContent>
  </Card>
);

// --- Main Dashboard Component ---

export default function DashboardPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      console.error("Firestore (db) no está disponible.");
      setIsLoading(false);
      return;
    }

    const prospectsQuery = query(collection(db, "prospects"));
    
    const unsubscribe = onSnapshot(prospectsQuery, (snapshot) => {
      const prospectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prospect));
      setProspects(prospectsData);
      if (isLoading) {
        setIsLoading(false);
      }
    }, (error) => {
      console.error("Error fetching prospects:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isLoading]);

  const kpiData = useMemo<KpiData[]>(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newLeadsCount = prospects.filter(p => p.createdAt && p.createdAt.toDate() > thirtyDaysAgo).length;
    const activeCasesCount = prospects.filter(p => ['inbox', 'procesoCitas', 'clasesOnline'].includes(p.currentPipeline)).length;
    const totalClientsCount = prospects.filter(p => p.currentPipeline === 'converted').length;
    const totalLeadsCount = prospects.length;
    const conversionRate = totalLeadsCount > 0 ? ((totalClientsCount / totalLeadsCount) * 100).toFixed(1) + "%" : "0%";

    return [
      { title: "Nuevos Prospectos (Mes)", value: newLeadsCount.toString(), icon: Briefcase, description: "En los últimos 30 días" },
      { title: "Tasa de Conversión", value: conversionRate, icon: TrendingUp, description: "Desde el inicio" },
      { title: "Casos Activos", value: activeCasesCount.toString(), icon: FileText, description: "Prospectos en pipelines activos" },
      { title: "Clientes Totales", value: totalClientsCount.toString(), icon: Users, description: "Clientes convertidos" },
    ];
  }, [prospects]);

  const chartData = useMemo(() => {
    const activeProspects = prospects.filter(p => ['inbox', 'procesoCitas', 'clasesOnline'].includes(p.currentPipeline));
    
    const pipelineDistribution = activeProspects.reduce((acc, lead) => {
        const pipeline = lead.currentPipeline || 'inbox';
        let pipelineName = 'Inbox';
        if (pipeline === 'procesoCitas') pipelineName = 'Proceso Citas';
        if (pipeline === 'clasesOnline') pipelineName = 'Clases Online';
        acc[pipelineName] = (acc[pipelineName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(pipelineDistribution).map(([name, count]) => ({ name, count }));
  }, [prospects]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Una vista general de tu negocio de un vistazo.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
        ) : (
          kpiData.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pipeline</CardTitle>
            <CardDescription>Distribución de prospectos en pipelines activos.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-48 w-full" />
            ) : chartData.length > 0 ? (
              <ChartContainer config={{ count: { label: "Prospectos", color: "hsl(var(--primary))" } }} className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
                      content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-md">
                <p className="text-muted-foreground">No hay datos de pipeline para mostrar.</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Resumen de las últimas interacciones y actualizaciones.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 bg-muted rounded-md">
                <p className="text-muted-foreground">Feed de actividad próximamente.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
