"use client"

import { useState, useCallback } from "react";
import {
  DataTable,
  DataTableProps
} from "@/components/ui/data-table"
import { getCCostos } from "@/services/ccostoService";

export default function ListTable<TData>({ data, columns }: DataTableProps<TData>) {
  const [tableData, setTableData] = useState<TData[]>(data);

  const refreshData = useCallback(async () => {
    const newData = await getCCostos();
    setTableData(newData as TData[]);
  }, []);

  return (
    <div className="rounded-md border">
      <DataTable 
        data={tableData} 
        columns={columns} // columns ya es una función que toma refreshData
      />
    </div>
  )
}


