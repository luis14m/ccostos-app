"use server";
import { createSupabaseClient } from "@/utils/supabase/server";
import { CCosto, CCostoCreate, ccostoResponse } from "@/types/supabase/ccosto";

  export async function createCCosto(ccosto: CCostoCreate): Promise<ccostoResponse> {
    try {
      const supabase = await createSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }


    const { data, error } = await supabase
      .from("ccostos")
      .insert([{
        ...ccosto,
        user_id: user.id,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

      if (error) {
        console.error('Error creating ccosto:', error);
        return {
          success: false,
          error: error.message
        };
      }
  
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error in creaCCosto:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  export async function getCCostos(): Promise<CCosto[]> {
    
    const supabase = await createSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
  
    const { data, error } = await supabase
      .from('ccostos')
      .select('*')
      .eq('user_id', user.id)
      .order('nombre', { ascending: true });
  
    if (error) throw error;
    return data || [];
  }
  
  export async function getCCostoById(id: string): Promise<CCosto | null> {
    
    const supabase = await createSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user === null || user === undefined) {
      throw new Error('User not authenticated');
    }
    try {
      const { data, error } = await supabase
        .from('ccostos')
        .select('*')
        .eq('user_id', user.id)
        .single();
  
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching CCosto:', error);
      throw error;
    }
  }
  
  export async function updateCCosto(id: string, ccosto: Partial<CCosto>): Promise<void> {
    const supabase = await createSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user === null || user === undefined) {
      throw new Error('User not authenticated');
    }
    
    try {
      const { error } = await supabase
        .from('ccostos')
        .update(ccosto)
        .eq('id', id)
        .eq('user_id', user.id);
  
      if (error) throw error;
    } catch (error) {
      console.error('Error updating CCosto:', error);
      throw error;
    }
  }
  
    export async function deleteCCosto(id: string): Promise<void> {  
      const supabase = await createSupabaseClient();
    try {
      const { error } = await supabase
        .from('ccostos')
        .delete()
        .eq('id', id);
  
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting CCosto:', error);
      throw error;
    } 
  }

