'use client'

import { ColumnDef } from "@tanstack/react-table"

export const simpleTableColumns = [
    {
        accessorKey: 'property',
        header: 'Property',
        cell: ({ row }) => {
            let property = row.getValue('property');

            return (
                <div className="flex w-44 md:w-auto">
                    {property}
                </div>
            )
        },
    },
    {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => {
            let value = row.getValue('value');
            let desc = '';
            let uom_desc = '';
            let long_desc = '';

            if(value == true){
                value = 'Yes'
            } else if(value == false) {
                value = 'No'
            }

            if (row.original.desc != undefined) {
                desc = row.original.desc
            }
            if (row.original.uom_desc != undefined) {
                uom_desc = row.original.uom_desc;
            }

            if (row.original.long_desc != undefined) {
                long_desc = row.original.long_desc;
            }

            //return <div className="text-right font-medium">{value} {uom_desc} {desc}</div>
            return (
                <div className="flex">
                    {value} {uom_desc}{desc}
                </div>
            )
        },
    }
]