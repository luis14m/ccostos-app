"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createCCosto } from "@/services/ccostoService";
import { useRouter } from 'next/navigation';
import { CCostoFormData, initialCCostoFormData } from "@/types/supabase/ccosto";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(4, { message: "El nombre es requerido" }),
  codigo: z
    .string()
    .min(9, { message: "El código es requerido" })
    .max(10, { message: "El código no puede tener más de 10 caracteres" }),
  //motivo: z.string().min(2, { message: "El motivo es requerido" }),
  fecha_inicio: z.string().min(1, { message: "La fecha de inicio es requerida" }),
  fecha_termino: z.string().min(1, { message: "La fecha de término es requerida" })
});

export default function CreateForm() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string>("");
  const router = useRouter();

  const form = useForm<CCostoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialCCostoFormData,
  });

  const onSubmit = async (data: CCostoFormData) => {
    setLoading(true);
    try {
      const result = await createCCosto(data);
      
      if (result?.success) {
        setMensaje("Centro de costo guardado con éxito ✅");
        form.reset();
        router.push("/ccostos");
      } else {
        const errorMessage = result?.error || "Error desconocido";
        setMensaje(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje(error instanceof Error ? error.message : "Error al guardar el centro de costo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black mb-8 text-center">
        Registro de Centro de Costos
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del Centro de Costo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder="CC-000001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          

          <FormField
            control={form.control}
            name="fecha_inicio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha Inicio</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fecha_termino"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha Término</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/rendiciones")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>

          {mensaje && (
            <p className={`text-center mt-4 ${mensaje.includes("Error") ? "text-red-500" : "text-green-500"}`}>
              {mensaje}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}