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
import { GeneralInformationTableColumns, AdditiveListColumns, MaterialOriginListColumns, PackagingComponentColumns, RecyclabilityListColumns } from "@/components/ui/data-table-simple/columns";
import { camelCaseToTitleCase } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tree } from "@/components/tree";
import { notFound } from "next/navigation";
import { ChartPieCustomShape } from "@/components/ui/chart-pie-custom-shape";
import { LucideSquare } from "lucide-react";
import { DataTableSimpleHeader } from "@/components/ui/data-table-simple/data-table-simple-header";


export default async function Page({ params }) {
    const { gtin, lot } = await params;

    const calculationData = await getCalculationOuput(gtin, lot);
    const mainElement = calculationData[calculationData.length - 1];
    let primaryImage = '/placeholder.png'

    // Display not found page if no data is present
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

    const ingredientColors = ['#003a7d', '#c701ff', '#0064BE', '#008dff', '#ff73b6', '#4ecb8d', '#ff9d3a', '#f9e858', '#d83034', '#D0199A', '#E33ADB', '#D42567', '#A7B464'];

    let ingredientList = await getIngredientsList(gtin, lot);

    // Config needed for the pie chart of ingredients
    let ingredientChartConfig = {
        percentage: {
            label: "Percentage",
        },
    }

    // Restructure ingredient list array so that the pie chart can work with the data
    for (let set in ingredientList) {

        // Code values in our data contain - which is not acceptable as object properties
        const code = ingredientList[set].code
        const cleanCode = code.replace('-', '')
        ingredientList[set].code = cleanCode

        const percentageFloat = parseFloat(ingredientList[set].percentage)
        ingredientList[set].percentage = percentageFloat;
        if (set < ingredientColors.length) {
            ingredientList[set].fill = ingredientColors[set]
        } else {
            ingredientList[set].fill = '#ffffff'
        }

        let obj = {
            label: ingredientList[set].ingredient,
            percentage: ingredientList[set].percentage,
            color: "var(--chart-3)",
        }

        ingredientChartConfig[cleanCode] = obj;
    }

    const additiveList = await getAdditiveList(gtin, lot);

    const materialOriginList = await getMaterialOriginList(gtin, lot);

    const componentDetailsList = await getComponentDetailsList(gtin, lot);

    const recyclabilityList = await getRecyclabilityList(gtin, lot);

    const recommendedUseList = await getRecommendedUseList(gtin, lot);

    console.log(recommendedUseList)

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
                                <AccordionItem key={box.boxName} value={box.boxName} className="rounded-xl shadow-sm border-none px-2 md:px-4 mt-4">
                                    <AccordionTrigger className='font-medium text-base pt-2 pb-2'>{box.boxName}</AccordionTrigger>
                                    <AccordionContent className=''>
                                        <DataTableSimple columns={GeneralInformationTableColumns} data={box.rowArray} />
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
                    <Accordion type="multiple" collapsible="true" defaultValue={'ingredients'}>
                        <AccordionItem value={'ingredients'} className="rounded-xl shadow-sm border-none px-2 md:px-4 mt-2">
                            <AccordionTrigger className='font-medium text-base pt-2 pb-2'>Ingredients</AccordionTrigger>
                            <AccordionContent className=''>
                                {ingredientList.length ? (
                                    <Accordion type="single" collapsible="true">
                                        <AccordionItem value={'ingredientList'} className="rounded-xl shadow-sm border px-2 md:px-4">
                                            <AccordionTrigger className='font-medium text-base pt-2 pb-2'>Ingredient List</AccordionTrigger>
                                            <AccordionContent className=''>
                                                <div className="flex flex-col">
                                                    <ChartPieCustomShape data={ingredientList} config={ingredientChartConfig} />
                                                    <div className="flex flex-col gap-1">
                                                        {ingredientList.map(ingredient => (
                                                            <div key={ingredient.code} className="flex flex-row justify-between rounded-sm px-1 hover:bg-muted/50">
                                                                <div className="flex flex-row items-center gap-1 overflow-hidden"><LucideSquare className="h-4 w-4" color={ingredient.fill} fill={ingredient.fill} />{ingredient.ingredient}</div>
                                                                <div>{ingredient.percentage}%</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (null)}
                                {additiveList.length ? (
                                    <Accordion type="single" collapsible="true">
                                        <AccordionItem value={'additiveList'} className="rounded-xl shadow-sm border px-2 md:px-4 mt-4">
                                            <AccordionTrigger className='font-medium text-base pt-2 pb-2'>Additive List</AccordionTrigger>
                                            <AccordionContent className=''>
                                                <DataTableSimple columns={AdditiveListColumns} data={additiveList} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (null)}
                                {materialOriginList.length ? (
                                    <Accordion type="single" collapsible="true">
                                        <AccordionItem value={'materialOrigin'} className="rounded-xl shadow-sm border px-2 md:px-4 mt-4">
                                            <AccordionTrigger className='font-medium text-base pt-2 pb-2'>Material Origin List</AccordionTrigger>
                                            <AccordionContent className=''>
                                                <DataTableSimple columns={MaterialOriginListColumns} data={materialOriginList} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (null)}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    {componentDetailsList.length ? (
                        <Accordion type="single" collapsible="true">
                            <AccordionItem value={'componentDetails'} className="rounded-xl shadow-sm border-none px-2 md:px-4 mt-4">
                                <AccordionTrigger className='font-medium text-base pt-2 pb-2'>Component Details List</AccordionTrigger>
                                <AccordionContent className=''>
                                    <DataTableSimpleHeader columns={PackagingComponentColumns} data={componentDetailsList} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (null)}
                    {recyclabilityList.length ? (
                        <Accordion type="single" collapsible="true">
                            <AccordionItem value={'recyclabilityList'} className="rounded-xl shadow-sm border-none px-2 md:px-4 mt-4">
                                <AccordionTrigger className='font-medium text-base pt-2 pb-2'>Recyclability List</AccordionTrigger>
                                <AccordionContent className=''>
                                    <DataTableSimpleHeader columns={RecyclabilityListColumns} data={recyclabilityList} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (null)}
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