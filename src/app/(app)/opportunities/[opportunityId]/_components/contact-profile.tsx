"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Make sure this path is correct
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";

export function ContactProfile({ opportunityId }: { opportunityId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [opportunity, setOpportunity] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!opportunityId) return;

    // Connect to the 'opportunities' collection with the specific ID
    const docRef = doc(db, "opportunities", opportunityId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = { id: doc.id, ...doc.data() };
        setOpportunity(data);
        setFormData(data); // Initialize form with live data
      } else {
        console.warn(`Document with ID ${opportunityId} not found.`);
        setOpportunity(null); // Handle case where data doesn't exist
      }
    });

    return () => unsubscribe();
  }, [opportunityId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev: any) => ({ ...prev, [id]: checked }));
  };

  const handleSave = async () => {
    if (!opportunityId) return;
    const docRef = doc(db, "opportunities", opportunityId);
    try {
      await updateDoc(docRef, {
        ...formData,
        lastUpdated: serverTimestamp(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!opportunity) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Profile...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Waiting for data... Ensure the opportunity ID '{opportunityId}'
            exists in the 'opportunities' collection.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl">
            {isEditing ? (
              <Input
                id="name"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
            ) : (
              opportunity.name || "Unnamed Opportunity"
            )}
          </CardTitle>
          <div className="mt-2">
            {isEditing ? (
              <Select
                value={formData.currentStage || "new"}
                onValueChange={(value) =>
                  handleSelectChange("currentStage", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge>{opportunity.currentStage}</Badge>
            )}
          </div>
        </div>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? "Guardar" : "Editar"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <Section title="Información de Contacto">
          <Field
            label="WhatsApp"
            value={opportunity.whatsapp}
            isEditing={false}
          />
          <Field
            id="email"
            label="Email"
            value={formData.email || ""}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
          <Field
            id="phone"
            label="Teléfono"
            value={formData.phone || ""}
            onChange={handleInputChange}
            isEditing={isEditing}
          />
        </Section>

        <Section title="Detalles de Viaje">
          <div className="flex items-center justify-between p-2">
            <Label>Tiene Visa de Turista?</Label>
            <Switch
              id="hasTouristVisa"
              checked={formData.hasTouristVisa || false}
              onCheckedChange={(checked) =>
                handleSwitchChange("hasTouristVisa", checked)
              }
              disabled={!isEditing}
            />
          </div>
          {formData.hasTouristVisa && (
            <Select
              value={formData.visaType || ""}
              onValueChange={(value) => handleSelectChange("visaType", value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Visa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tourist">Turista</SelectItem>
                <SelectItem value="student">Estudiante</SelectItem>
                <SelectItem value="work">Trabajo</SelectItem>
              </SelectContent>
            </Select>
          )}
        </Section>

        {/* Add other sections following the same pattern */}
      </CardContent>
    </Card>
  );
}

// Helper Components
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 border-b pb-1">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {children}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  isEditing,
  onChange,
}: {
  id?: string;
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      {isEditing ? (
        <Input id={id} value={value} onChange={onChange} />
      ) : (
        <p className="text-sm text-gray-700 h-9 flex items-center">
          {value || "No especificado"}
        </p>
      )}
    </div>
  );
}
