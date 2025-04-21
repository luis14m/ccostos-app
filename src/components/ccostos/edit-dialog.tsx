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

import { CCosto, Estado } from "@/types/supabase/ccosto";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CCostoEditProps {
  ccosto: CCosto;
  onClose: () => void; // Función para cerrar el diálogo
  onSave: (updatedCCosto: CCosto) => Promise<void>;
}

export function EditDialog({ ccosto, onClose, onSave }: CCostoEditProps) {
  const [editedCCosto, setEditedCCosto] = useState<CCosto>({ ...ccosto });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          <DialogTitle>Editar CCosto</DialogTitle>
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
              <Label>Codigo</Label>
              <Input
                name="codigo"
                value={editedCCosto.codigo}
                onChange={handleChange}
                disabled={true}
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
              <Label>Fecha Termino</Label>
              <Input
                name="fecha_termino"
                type="date"
                value={editedCCosto.fecha_termino}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Estado</Label>
              <Select
                value={editedCCosto.estado}
                onValueChange={(value) =>
                  setEditedCCosto((prev) => ({
                    ...prev,
                    estado: value,
                  }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccione un estado" />
                </SelectTrigger>
                <SelectContent>
                  {Estado.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
