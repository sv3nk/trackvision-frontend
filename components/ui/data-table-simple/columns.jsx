'use client'

import { ColumnDef } from "@tanstack/react-table"

export const simpleTableColumns = [
    {
        accessorKey: 'property',
        header: 'Property'
    },
    {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => {
            let value = row.getValue('value');
            let desc = '';
            let uom_desc = '';

            if(row.original.desc != undefined) {
                desc = row.original.desc
            }
            if(row.original.uom_desc != undefined) {
                uom_desc = row.original.uom_desc;
            }

            //return <div className="text-right font-medium">{value} {uom_desc} {desc}</div>
            return (
                <div className="text-right font-medium">
                    {value} {uom_desc}{desc}
                </div>
            )
        },
    }
]