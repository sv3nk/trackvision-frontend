'use client'

export const GeneralInformationTableColumns = [
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
                <div className="">
                    {value} {uom_desc}{desc}
                </div>
            )
        },
    }
]

export const AdditiveListColumns = [
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            let description = row.getValue('description');

            return (
                <div className="flex w-44 md:w-auto">
                    {description}
                </div>
            )
        },
    },
    {
        accessorKey: 'containment',
        header: 'Containment',
        cell: ({ row }) => {
            let value = row.getValue('containment');

            return (
                <div className="">
                    {value}
                </div>
            )
        },
    }
]

export const MaterialOriginListColumns = [
    {
        accessorKey: 'material_orign',
        header: 'Material Origin',
        cell: ({ row }) => {
            let material_origin = row.getValue('material_orign');

            return (
                <div className="flex w-52 md:w-auto">
                    {material_origin}
                </div>
            )
        },
    },
    {
        accessorKey: 'percentage',
        header: 'Percentage',
        cell: ({ row }) => {
            let value = row.getValue('percentage');

            return (
                <div className="">
                    {value}%
                </div>
            )
        },
    }
]

export const PackagingComponentColumns = [
    {
        accessorKey: 'component_description',
        header: 'Component ',
        cell: ({ row }) => {
            let component_description = row.getValue('component_description');

            return (
                <div className="">
                    {component_description}
                </div>
            )
        },
    },
    {
        accessorKey: 'weight',
        header: 'Weight',
        cell: ({ row }) => {
            let value = row.getValue('weight');
            let uom = '';

            if (row.original.weight_uom_description != undefined) {
                uom = row.original.weight_uom_description;
            }

            return (
                <div className="text-right">
                    {value}{uom}
                </div>
            )
        },
    },
    {
        accessorKey: 'separability_description',
        header: 'Separability',
        cell: ({ row }) => {
            let value = row.getValue('separability_description');

            return (
                <div className="flex">
                    {value}
                </div>
            )
        },
    },
    {
        accessorKey: 'surface_coverage',
        header: 'Surface Coverage',
        cell: ({ row }) => {
            let value = row.getValue('surface_coverage');

            return (
                <div className="text-right">
                    {Math.round(value)}%
                </div>
            )
        },
    }
]