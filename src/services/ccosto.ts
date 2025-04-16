"use server";
import { createSupabaseClient } from "@/utils/supabase/server";
import { ccosto, ccostoCreate } from "@/types/supabase/ccosto";


interface CreateccostoResponse {
    success: boolean;
    error?: string;
    data?: ccosto;
  }
  
  export async function createccosto(ccosto: ccostoCreate): Promise<CreateccostoResponse> {
    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
      .from("ccostos")
      .insert([ccosto])
      .single();
  
    if (error) {
      return { success: false, error: error.message };
    }
  
    return { success: true, data };
  }
  