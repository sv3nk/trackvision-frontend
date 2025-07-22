'use client'

import { Handle, Position } from '@xyflow/react';
import Image from 'next/image'

export function TreeNode(data) {

    let imageSrc = data.data.primaryImage;
    if(imageSrc == null) {
        imageSrc = '/placeholder.png'
    } else {
        imageSrc = 'https://rcycledemo.trackvision.ai/assets/' + data.data.primaryImage;
    }

    return (
        <div className="flex flex-col grow shadow-sm rounded-md w-[200px] h-[200px] bg-gray-50 p-1">
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
                        className="object-cover rounded-sm"
                    />
                </div>
                <div className='flex items-center text-xs p-2'>
                    {data.data.productName}
                </div>
            </div>
            <div className='grid grid-cols-2 rounded-sm shadow-sm bg-white mt-1 text-xs py-1 px-2'>
                <div className='flex flex-col gap-1 bg-amber-100'>
                    <p>Name</p>
                    <p>LGTIN</p>
                    <p>Production Step</p>
                    <p>Quantity</p>
                    <p>Date</p>
                </div>
                <div className='flex flex-col bg-blue-200 text-right'>
                    Values
                </div>
            </div>
        </div>
    )
}