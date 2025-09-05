"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ActivityPanel({ opportunityId }: { opportunityId: string }) {
  // Placeholder data - replace with data fetching from Firestore
  const whatsappMessages = [
    {
      content: "Hola, me gustaría saber más sobre sus servicios.",
      timestamp: "10:30",
      sender: "user",
    },
    {
      content:
        "¡Hola! Claro, con gusto te ayudo. ¿Qué servicio te interesa en particular?",
      timestamp: "10:31",
      sender: "bot",
    },
    {
      content: "Estoy interesado en el plan de marketing digital.",
      timestamp: "10:32",
      sender: "user",
    },
  ];

  const internalNotes = [
    {
      content:
        "El cliente parece muy interesado, agendar una llamada de seguimiento para el viernes.",
      author: "Agente Smith",
      createdAt: "2023-10-27T11:00:00Z",
    },
    {
      content: "Llamada realizada, se envió la propuesta por correo.",
      author: "Agente Smith",
      createdAt: "2023-10-26T15:45:00Z",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="whatsapp">
          <TabsList>
            <TabsTrigger value="whatsapp">Conversación de WhatsApp</TabsTrigger>
            <TabsTrigger value="notes">Notas Internas</TabsTrigger>
            <TabsTrigger value="contracts" disabled>
              Contratos/Facturas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="whatsapp" className="mt-4">
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
              {whatsappMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-xs ${
                      msg.sender === "user"
                        ? "bg-gray-200"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs text-right mt-1 opacity-75">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
              {internalNotes.map((note, index) => (
                <div key={index} className="border-b pb-2">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Por {note.author} -{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardFooter>
        <div className="w-full">
          <Textarea placeholder="Escribe una respuesta de WhatsApp o una nota interna..." />
          <Button className="mt-2">Enviar</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
