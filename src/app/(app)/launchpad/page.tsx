
"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter }
 from 'next/navigation';
export default function LaunchpadPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bienvenido a Royalty</h1>
        <p className="mt-2 text-lg text-gray-600">Tu plataforma todo-en-uno para la gestión de clientes y automatización.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Configuración Inicial */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Configuración Inicial</CardTitle>
            <CardDescription>Configura los ajustes básicos de tu cuenta para empezar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigation('/settings')}>Ir a Configuración</Button>
          </CardContent>
        </Card>

        {/* Card de Conectar Calendario */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Conecta tu Calendario</CardTitle>
            <CardDescription>Sincroniza tu Google Calendar para gestionar tus citas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigation('/calendars')}>Conectar Calendario</Button>
          </CardContent>
        </Card>

        {/* Card de Crear un Bot */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Crea tu Primer Bot</CardTitle>
            <CardDescription>Automatiza conversaciones y captura leads con un bot inteligente.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigation('/bot-manager')}>Crear Bot</Button>
          </CardContent>
        </Card>

        {/* Card de Importar Contactos */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Importa tus Contactos</CardTitle>
            <CardDescription>Empieza a gestionar tus clientes importando tu lista de contactos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigation('/contacts')}>Importar Contactos</Button>
          </CardContent>
        </Card>

        {/* Card de Explorar Automatizaciones */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Explora las Automatizaciones</CardTitle>
            <CardDescription>Descubre cómo puedes automatizar tareas y flujos de trabajo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigation('/automations')}>Explorar Automatizaciones</Button>
          </CardContent>
        </Card>

        {/* Card de Ver Analíticas */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Analíticas y Reportes</CardTitle>
            <CardDescription>Visualiza el rendimiento de tus bots y campañas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleNavigation('/analytics')}>Ver Analíticas</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
