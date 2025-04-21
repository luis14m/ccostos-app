import NavBar from "@/components/nav-bar";
import React from "react";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/utils/supabase/server";
import { getCCostos } from "@/services/ccostoService";

import ListTable from "@/components/ccostos/list-table";

export default async function CCostosPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    const ccostos = await getCCostos();

    return (
      <div className="flex-1 w-full flex flex-col gap-12 p-8">
        <NavBar />
        <div className="container mx-auto border-2 border-gray-300 p-4">
          
          <div className="mt-16 bg-gray-100 p-4 my-4">
            <h1 className="text-2xl font-bold text-center">Listado de Centro de Costos</h1>
          </div>
          <ListTable
            data={ccostos}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching ccostos:", error);

    throw error;
  }
}
