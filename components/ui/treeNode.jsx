'use client'

import { Handle } from '@xyflow/react';
import Image from 'next/image'

export function TreeNode(data) {

    console.log(data)

    let imageSrc = data.data.primaryImage;
    if (imageSrc == null) {
        imageSrc = '/placeholder.png'
    } else {
        imageSrc = 'https://rcycledemo.trackvision.ai/assets/' + data.data.primaryImage;
    }

    const refLink = '/gtin/' + data.data.gtin + '/lot/' + data.data.lot;

    let dateElement = new Date(data.data.eventTime);

    let day = dateElement.getDate();
    day = day < 10 ? "0" + day : day;
    let month = dateElement.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const year = dateElement.getFullYear();
    let hour = dateElement.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let minutes = dateElement.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = dateElement.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const resultDate = day + '.' + month + '.' + year + ' - ' + hour + ':' + minutes + ':' + seconds;

    return (
        <div className="flex flex-col grow rounded-md w-[320px] h-[255px] p-1">
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
                    {data.data.type}
                </div>
            </div>
            <div className='bg-white p-1 mt-1 rounded-sm shadow-sm'>
                <div className='grid grid-cols-3 border rounded-sm bg-white text-xs py-2 px-2 overflow-hidden'>
                    <div className='flex flex-col col-span-1 gap-1'>
                        <div className='pb-1 border-b'>Product</div>
                        <div className='pb-1 border-b'>Name</div>
                        <div className='pb-1 border-b'>ID</div>
                        <div className='pb-1 border-b'>Quantity</div>
                        <div className='pb-1 border-b'>GLN</div>
                        <div className='pb-1 border-b'>GLN Name</div>
                        <div>Date</div>
                    </div>
                    <div className='flex flex-col col-span-2 gap-1 text-nowrap overflow-hidden'>
                        <div className='pb-1 border-b'>{data.data.productName}</div>
                        <div className='pb-1 border-b'>{data.data.detailedName}</div>
                        <div className='pb-1 border-b'><a href={refLink} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:text-blue-300'>01/{data.data.gtin}/10/{data.data.lot}</a></div>
                        <div className='pb-1 border-b'>{Math.round(data.data.quantity)} {data.data.quantityUom}</div>
                        <div className='pb-1 border-b'>{data.data.gln}</div>
                        <div className='pb-1 border-b'>{data.data.glnName}</div>
                        <div>{resultDate}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}