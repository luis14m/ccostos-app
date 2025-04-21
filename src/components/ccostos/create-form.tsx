"use client";

import { Control, useForm } from "react-hook-form";
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
import { CCostoFormData, Estado, initialCCostoFormData } from "@/types/supabase/ccosto";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } 
from "@/components/ui/select";

// Esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(4, { message: "El nombre es requerido" }),
  codigo: z
    .string()
    .min(3, { message: "El código es requerido" })
    .max(5, { message: "El código no puede tener más de 5 caracteres" }),
  //motivo: z.string().min(2, { message: "El motivo es requerido" }),
  fecha_inicio: z.string().min(1, { message: "La fecha de inicio es requerida" }),
  fecha_termino: z.string().min(1, { message: "La fecha de término es requerida" }),
  estado: z
  .string()
  .min(3, { message: "El código es requerido" })
  
});

export default function CreateForm() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string>("");
  const router = useRouter();

  const form = useForm<CCostoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialCCostoFormData,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
   
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input className="w-full md:w-[400px]" placeholder="Nombre" {...field} />
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
                  <Input className="w-full md:w-[100px]" placeholder="OE##" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Estado */}
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="fecha_inicio"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Fecha Inicio</FormLabel>
                  <FormControl>
                    <Input type="date" className="w-full md:w-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fecha_termino"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Fecha Término</FormLabel>
                  <FormControl>
                    <Input type="date"  className="w-full md:w-[150px]"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/ccostos")} // Cambia la ruta según sea necesario
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
   
  );
}