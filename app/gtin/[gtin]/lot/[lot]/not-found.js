import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotFound() {
    return (
        <div className="flex flex-col w-full md:max-w-6xl">
            <Tabs defaultValue="data" className="flex flex-col gap-3">
                <div className="flex justify-center md:justify-normal">
                    <TabsList className="shadow-sm">
                        <TabsTrigger className="px-4" value="data">Data</TabsTrigger>
                        <TabsTrigger className="px-4" value="tree">Tree</TabsTrigger>
                        <TabsTrigger className="px-4" value="documents">Documents</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="data" className="flex flex-col gap-4">
                    <div className="flex justify-center rounded-xl p-2 lg:p-6 shadow-sm">
                        <Carousel className="w-full max-w-xs rounded-xl">
                            <CarouselContent>
                                <CarouselItem>
                                    <Card className="py-0 shadow-none">
                                        <CardContent className="aspect-square items-center justify-center p-6 relative">
                                            <Image
                                                src={"/placeholder.png"}
                                                fill={true}
                                                priority={false}
                                                loading="lazy"
                                                placeholder="blur"
                                                blurDataURL="/placeholder.png"
                                                alt="Picture of the author"
                                                className="bg-gray-500 rounded-xl object-cover"
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem>
                                    <Card className="py-0 shadow-none">
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">Image 2</span>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem>
                                    <Card className="py-0 shadow-none">
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">Image 3</span>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className=" hidden md:inline-flex" />
                            <CarouselNext className=" hidden md:inline-flex" />
                        </Carousel>
                    </div>
                    <div className="rounded-xl shadow-sm p-4 pt-2 bg-red-400">
                        <div className="pb-2 font-medium">
                            No data
                        </div>
                        Sorry, we cannot find data related to this product in our system.
                    </div>
                </TabsContent>
                <TabsContent value="tree" className="">
                    <div className="rounded-xl shadow-sm p-4 pt-2 bg-red-400">
                        <div className="pb-2 font-medium">
                            No data
                        </div>
                        Sorry, we cannot find data related to this product in our system.
                    </div>
                </TabsContent>
                <TabsContent value="documents" className="">
                    <div className="rounded-xl shadow-sm p-4 pt-2 bg-red-400">
                        <div className="pb-2 font-medium">
                            No data
                        </div>
                        Sorry, we cannot find data related to this product in our system.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}