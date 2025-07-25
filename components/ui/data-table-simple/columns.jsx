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

            // Display boolean values as yes and no instead of true and false
            if (value == true) {
                value = 'Yes'
            } else if (value == false) {
                value = 'No'
            }

            // Create date string for human readable date format
            if (row.original.property == 'Production Time') {
                let dateElement = new Date(value);

                let day = dateElement.getDate();
                day = day < 10 ? "0" + day : day;
                let month = dateElement.getMonth() + 1;
                month = month < 10 ? "0" + month : month;
                const year = dateElement.getFullYear();
                const hour = dateElement.getHours();
                const minutes = dateElement.getMinutes();
                const seconds = dateElement.getSeconds();

                const resultDate = day + '.' + month + '.' + year + ' - ' + hour + ':' + minutes + ':' + seconds;
                value = resultDate;
            }

            if (row.original.desc != undefined) {
                desc = ' - ' + row.original.desc
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