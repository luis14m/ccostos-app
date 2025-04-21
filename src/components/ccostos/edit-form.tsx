import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { CCosto } from "@/types/supabase/ccosto";

interface CCostoEditProps {
  ccosto: CCosto;
  onClose: () => void; // Función para cerrar el diálogo
  onSave: (updatedCCosto: CCosto) => Promise<void>;
}

export function EditForm({ ccosto, onClose, onSave }: CCostoEditProps) {
  const [editedCCosto, setEditedCCosto] = useState<CCosto>(ccosto);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCCosto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(editedCCosto);
      onClose(); // Cerrar el diálogo después de guardar
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al actualizar");
    }
  };
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Rendición</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                name="nombre"
                value={editedCCosto.nombre}
                onChange={handleChange}
              />
            </div>
        
          <div>
            <Label>Fecha Inicio</Label>
            <Input
              name="fecha_inicio"
              type="date"
              value={editedCCosto.fecha_inicio}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Fecha Fin</Label>
            <Input
              name="fecha_termino"
              type="date"
              value={editedCCosto.fecha_termino}
              onChange={handleChange}
            />
          </div>
        </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
