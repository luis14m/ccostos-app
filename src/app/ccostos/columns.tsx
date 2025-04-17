"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { EditForm } from "@/components/edit-form";

import { CCosto } from "@/types/supabase/ccosto";
import { deleteCCosto, updateCCosto } from "@/services/ccostoService";

// Example type for createColumns
export const createColumns = (refreshData: () => Promise<void>): ColumnDef<CCosto, any>[] => [
  
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
  },
  
  {
    id: "codigo",
    accessorKey: "codigo",
    header: "Código",
  },
  {
    id: "estado",
    accessorKey: "estado",
    header: "Estado",
  },
  {
    id: "fecha_inicio",
    accessorKey: "fecha_inicio",
    header: "Fecha Inicio",
  },
  {
    id: "fecha_termino",
    accessorKey: "fecha_termino",
    header: "Fecha Término",
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Fecha Creación",
  },
  
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const ccosto = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [selectedCCosto, setSelectedCCosto] = useState<CCosto | null>(null);

      const handleEdit = (ccosto: CCosto) => {
        setSelectedCCosto(ccosto);
        setIsDialogOpen(true);
      };

      const handleClose = () => {
        setIsDialogOpen(false);
        setSelectedCCosto(null);
      };

      const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de eliminar?")) return;

        try {
          await deleteCCosto(id);
          refreshData(); // Trigger table refresh
        } catch (error) {
          console.error("Error al eliminar el gasto:", error);
          alert("Hubo un error al eliminar el gasto");
        }
      };
      return (
        <>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleEdit(ccosto)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            
          </Button>

          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleDelete(ccosto.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
     
          </Button>

          {selectedCCosto && (
            <EditForm
              ccosto={selectedCCosto}
              onClose={handleClose}
              onSave={async (updatedCCosto) => {
                try {
                  await updateCCosto(updatedCCosto.id, updatedCCosto);
                  handleClose();
                  refreshData(); // Replace window.location.reload() with refreshData
                } catch (error) {
                  console.error("Error al actualizar:", error);
                  alert("Error al actualizar la rendición");
                }
              }}
            />
          )}
          
        </>
      );
    },
  },
];
