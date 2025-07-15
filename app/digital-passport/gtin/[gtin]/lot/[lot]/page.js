import { getCalculationOuput, getIngredientsList, getMaterialOriginList, getComponentDetailsList, getAdditiveList, getRecyclabilityList, getRecommendedUseList } from "@/lib/data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { DataTableSimple } from "@/components/ui/data-table-simple/data-table-simple";
import { simpleTableColumns } from "@/components/ui/data-table-simple/columns";


export default async function Page({ params }) {
    const { gtin, lot } = await params;

    const calculationData = await getCalculationOuput(gtin, lot);
    const mainElement = calculationData[calculationData.length - 1];
    const primaryImage = 'https://rcycledemo.trackvision.ai/assets/' + mainElement.primaryImage;
    let lotOverviewArray = [];
    let productionDetailsArray = [];
    //const ingredientList = await getIngredientsList(gtin, lot);
    //const materialOriginList = await getMaterialOriginList(gtin, lot);
    //const componentDetailsList = await getComponentDetailsList(gtin, lot);
    //const additiveList = await getAdditiveList(gtin, lot);
    //const recyclabilityList = await getRecyclabilityList(gtin, lot);
    //const recommendedUseList = await getRecommendedUseList(gtin, lot);

    for (let key in mainElement.lotOverview) {
        if (mainElement.lotOverview[key] != null) {
            lotOverviewArray.push({
                property: key,
                value: mainElement.lotOverview[key]
            })
        }
    }


    // This transformation from an object to an array is necessary, as the table expects an array of objects
    for (let key in mainElement.productionDetails) {
        if (mainElement.productionDetails[key] != null) {
            productionDetailsArray.push({
                property: key,
                value: mainElement.productionDetails[key]
            })
        }
    }

    return (
        <div className="flex flex-col justify-center gap-4">
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
            <div className="rounded-xl p-2 lg:p-6 shadow-sm">
                <DataTableSimple columns={simpleTableColumns} data={lotOverviewArray} />
            </div>
            <div className="rounded-xl p-2 lg:p-6 shadow-sm">
                <DataTableSimple columns={simpleTableColumns} data={productionDetailsArray} />
            </div>
        </div>
    )
}