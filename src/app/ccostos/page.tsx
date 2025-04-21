import Navbar from '@/components/Navbar'
import React from 'react'
import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/utils/supabase/server';
import { getCCostos } from '@/services/ccostoService';
import { CCosto } from '@/types/supabase/ccosto';
import { createColumns } from './columns';
import ListTable from '../../components/ccostos/list-table';

export default async function page() {

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
      <div className="container mx-auto">
        
        <Navbar />
        <br />
        <br />
        <h1 className="text-2xl-center font-bold" >Centros de Costos</h1>
        <ListTable<CCosto>
          data={ccostos}    
          columns={createColumns} // Pasamos la función directamente, no su ejecución
        />
      </div>
    </div>
  );
} catch (error) {
  console.error("Error fetching ccostos:", error);

  throw error;
}
