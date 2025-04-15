import Navbar from '@/components/Navbar'
import React from 'react'
import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/utils/supabase/server';
import { DataTable } from '@/components/data-table';

export default  function page() {
   return (
      <div className="flex-1 w-full flex flex-col gap-12 p-8">
        <div className="container mx-auto">
        
          <h1 className="text-2xl font-bold"></h1>
          <Navbar />
         
        </div>
      </div>
    )
}   
