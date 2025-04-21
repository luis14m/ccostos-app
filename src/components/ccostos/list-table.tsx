"use client";

import { useState, useCallback, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getCCostos } from "@/services/ccostoService";
import { createColumns } from "@/app/ccostos/columns";
import { CCosto } from "@/types/supabase/ccosto";

type ListTableProps = {
  data: CCosto[];
};

export default function ListTable({ data }: ListTableProps) {
  const [tableData, setTableData] = useState<CCosto[]>(data);

  const refreshData = useCallback(async () => {
    const newData = await getCCostos();
    setTableData(newData);
  }, []);

  // Use useMemo to memoize columns with refreshData dependency
  const columns = useMemo(() => createColumns(refreshData), [refreshData]);

  return (
    
        <DataTable 
          data={tableData} 
          columns={() => columns} // Pass memoized columns directly
        />
      
  
  );
}
