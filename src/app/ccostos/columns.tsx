"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { EditDialog } from "@/components/ccostos/edit-dialog";

import { CCosto } from "@/types/supabase/ccosto";
import { deleteCCosto, updateCCosto } from "@/services/ccostoService";
import { toast } from "sonner"; // Replace toast import

// Example type for createColumns
export const createColumns = (refreshData: () => Promise<void>): ColumnDef<CCosto>[] => {
  return [
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
      header: "Creado en",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        // Use a fixed format instead of toLocaleString()
        return date.toISOString().replace('T', ' ').split('.')[0];
      }
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        const ccosto = row.original;
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [selectedCCosto, setSelectedCCosto] = useState<CCosto | null>(null);

        const handleEdit = (ccosto: CCosto) => {
          setIsDialogOpen(true);
          setSelectedCCosto(ccosto);
        };

        const handleDelete = async (id: string) => {
          if (!window.confirm("¿Estás seguro de eliminar?")) return;

          try {
            await deleteCCosto(id);
            await refreshData(); // Using the passed refreshData function
            toast.success("Centro de costo eliminado", {
              description: "El registro se ha eliminado correctamente"
            });
          } catch (error) {
            console.error("Error al eliminar el ccosto:", error);
            toast.error("Error", {
              description: "Hubo un error al eliminar el centro de costo"
            });
          }
        };

        const handleClose = () => {
          setIsDialogOpen(false);
          setSelectedCCosto(null);
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
              <EditDialog
                ccosto={selectedCCosto}
                onClose={handleClose}
                onSave={async (updatedCCosto) => {
                  try {
                    await updateCCosto(updatedCCosto.id, updatedCCosto);
                    handleClose();
                    await refreshData(); // Using the passed refreshData function
                    toast.success("Centro de costo actualizado", {
                      description: "Los cambios se han guardado correctamente"
                    });
                  } catch (error) {
                    console.error("Error al actualizar:", error);
                    toast.error("Error", {
                      description: "Error al actualizar el centro de costo"
                    });
                  }
                }}
              />
            )}
          </>
        );
      },
    },
  ];
};


