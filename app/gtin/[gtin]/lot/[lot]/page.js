import { getCalculationOuput, getIngredientsList, getMaterialOriginList, getComponentDetailsList, getAdditiveList, getRecyclabilityList, getRecommendedUseList } from "@/lib/data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { DataTableSimple } from "@/components/ui/data-table-simple/data-table-simple";
import { simpleTableColumns } from "@/components/ui/data-table-simple/columns";
import { camelCaseToTitleCase } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tree } from "@/components/tree";
import { notFound } from "next/navigation";
import { ChartPieLabelList } from "@/components/ui/chart-pie-label-list";
import { ChartPieCustomShape } from "@/components/ui/chart-pie-custom-shape";


export default async function Page({ params }) {
    const { gtin, lot } = await params;

    const calculationData = await getCalculationOuput(gtin, lot);
    const mainElement = calculationData[calculationData.length - 1];
    let primaryImage = '/placeholder.png'

    if (calculationData.length == 0) {
        notFound()
    }

    if ('primaryImage' in mainElement) {
        if (mainElement.primaryImage != null) {
            primaryImage = 'https://rcycledemo.trackvision.ai/assets/' + mainElement.primaryImage;
        }
    }
    let boxesArray = [];
    // This is only used for the accordion state, so that all boxes are open by default
    let boxesNameArray = [];

    const ingredientList = await getIngredientsList(gtin, lot);
    //console.log(ingredientList)
    //const materialOriginList = await getMaterialOriginList(gtin, lot);
    //const componentDetailsList = await getComponentDetailsList(gtin, lot);
    //const additiveList = await getAdditiveList(gtin, lot);
    //const recyclabilityList = await getRecyclabilityList(gtin, lot);
    //const recommendedUseList = await getRecommendedUseList(gtin, lot);

    // Create array of data to be shown by in tables.
    // Necessary, because data is provided in JSON objects but tables require an array
    for (let key in mainElement) {
        if (key != 'id' && key != 'primaryImage' && key != 'share' && key != 'parent') {
            let rowArray = []
            for (let keyx in mainElement[key]) {
                rowArray.push({
                    property: mainElement[key][keyx].displayName,
                    value: mainElement[key][keyx].value,
                    order: mainElement[key][keyx].order,
                    uom_desc: mainElement[key][keyx].uom_desc,
                    desc: mainElement[key][keyx].desc,
                    long_desc: mainElement[key][keyx].long_desc
                })
            }

            if (rowArray.length > 0) {
                // Sort the rows depending on their order attribute
                rowArray.sort((a, b) => a.order - b.order)
                boxesArray.push({
                    boxName: camelCaseToTitleCase(key),
                    rowArray: rowArray
                })
                boxesNameArray.push(camelCaseToTitleCase(key))
            }

        }
    }

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
                <TabsContent value="data" className="flex flex-col gap-2">
                    <div className="flex justify-center rounded-xl p-2 lg:p-6 shadow-sm">
                        <Carousel className="w-full max-w-xs rounded-xl">
                            <CarouselContent>
                                <CarouselItem>
                                    <Card className="py-0 shadow-none">
                                        <CardContent className="aspect-square items-center justify-center p-6 relative">
                                            <Image
                                                src={primaryImage}
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
                    <Accordion type="multiple" collapsible="true" defaultValue={boxesNameArray}>
                        {boxesArray.length ? (
                            boxesArray.map(box => (
                                <AccordionItem key={box.boxName} value={box.boxName} className="rounded-xl shadow-sm border-none px-4 mt-4">
                                    <AccordionTrigger className='font-medium text-base pt-2 pb-2'>{box.boxName}</AccordionTrigger>
                                    <AccordionContent>
                                        <DataTableSimple columns={simpleTableColumns} data={box.rowArray} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        ) : (
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Error</AccordionTrigger>
                                <AccordionContent>
                                    No calculation data available for this product.
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                    <ChartPieCustomShape data={ingredientList} />
                </TabsContent>
                <TabsContent value="tree" className="">
                    <Tree data={calculationData} />
                </TabsContent>
                <TabsContent value="documents" className="flex flex-col gap-4">
                    Documents
                </TabsContent>
            </Tabs>
        </div>
    )
}