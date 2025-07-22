'use client'

import { Handle, Position } from '@xyflow/react';
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function TreeNode(data) {

    let imageSrc = data.data.primaryImage;
    if (imageSrc == null) {
        imageSrc = '/placeholder.png'
    } else {
        imageSrc = 'https://rcycledemo.trackvision.ai/assets/' + data.data.primaryImage;
    }

    return (
        <div className="flex flex-col grow rounded-md w-[320px] h-[260px] p-1">
            <Handle type="target" position={data.targetPosition} />
            <Handle type="source" position={data.sourcePosition} />
            <div className='flex flex-row shadow-sm rounded-sm bg-white'>
                <div className='aspect-square max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] rounded-sm relative'>
                    <Image
                        src={imageSrc}
                        fill={true}
                        priority={false}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        alt='Picture of component'
                        className="object-cover rounded-sm"
                    />
                </div>
                <div className='flex items-center text-xs p-2'>
                    {data.data.productName}
                </div>
            </div>
            <div className='bg-white p-1 mt-1 rounded-sm shadow-sm'>
                <div className='grid grid-cols-3 border rounded-sm bg-white text-xs py-2 px-2 overflow-hidden'>
                    <div className='flex flex-col col-span-1 gap-1'>
                        <div className='pb-1 border-b'>Name</div>
                        <div className='pb-1 border-b'>GTIN</div>
                        <div className='pb-1 border-b'>Lot</div>
                        <div className='pb-1 border-b'>Production Step</div>
                        <div className='pb-1 border-b'>Quantity</div>
                        <div className='pb-1 border-b'>Share</div>
                        <div>Date</div>
                    </div>
                    <div className='flex flex-col col-span-2 gap-1 text-nowrap overflow-hidden'>
                        <div className='pb-1 border-b'>{data.data.detailedName}</div>
                        <div className='pb-1 border-b'>{data.data.gtin}</div>
                        <div className='pb-1 border-b'>{data.data.lot}</div>
                        <div className='pb-1 border-b'>{data.data.productionStep}</div>
                        <div className='pb-1 border-b'>{data.data.quantity} {data.data.quantityUom}</div>
                        <div className='pb-1 border-b'>{data.data.share}</div>
                        <div>{data.data.eventTime}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}