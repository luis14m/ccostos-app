"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


import { useState } from "react";
import { EditForm } from "@/components/EditForm";

import { updateExpense, deleteExpense } from "@/services/supabase/expenseService";
import { ccosto } from "@/types/supabase/ccosto";


const createColumns = (onDataChange: () => void): ColumnDef<ccosto>[] => [
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => {
      const expense = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

      const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
        setIsDialogOpen(true);
      };

      const handleClose = () => {
        setIsDialogOpen(false);
        setSelectedExpense(null);
      };

      const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de eliminar?"))
          return;

        try {
          await deleteExpense(id);
          onDataChange(); // Trigger table refresh
        } catch (error) {
          console.error("Error al eliminar el gasto:", error);
          alert("Hubo un error al eliminar el gasto");
        }
      };
      return (
        <> </>
    );
  },
}
];

export { createColumns };