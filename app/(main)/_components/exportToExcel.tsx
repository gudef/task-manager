"use client";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from "@/components/ui/button";


interface DataTableProps<TData> {
    data: TData[]
}

export function ExportToExcel<TData>({
    data,
}: DataTableProps<TData>) {


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, "exportedData.xlsx");
    };

    return (

        <div>
            <Button onClick={() => exportToExcel()}>Export to Excel</Button>
        </div>
    )


}