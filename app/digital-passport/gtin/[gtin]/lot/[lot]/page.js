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
import { GeneralInformationTableColumns } from "@/components/ui/data-table-simple/columns";
import { camelCaseToTitleCase } from "@/lib/utils";


export default async function Page({ params }) {
    const { gtin, lot } = await params;

    const calculationData = await getCalculationOuput(gtin, lot);
    const mainElement = calculationData[calculationData.length - 1];
    const primaryImage = 'https://rcycledemo.trackvision.ai/assets/' + mainElement.primaryImage;
    let lotOverviewArray = [];
    let productionDetailsArray = [];
    let boxesArray = [];
    //const ingredientList = await getIngredientsList(gtin, lot);
    //const materialOriginList = await getMaterialOriginList(gtin, lot);
    //const componentDetailsList = await getComponentDetailsList(gtin, lot);
    //const additiveList = await getAdditiveList(gtin, lot);
    //const recyclabilityList = await getRecyclabilityList(gtin, lot);
    //const recommendedUseList = await getRecommendedUseList(gtin, lot);

    // Create array of data to be shown by in tables.
    // Necessary, because data is provided in JSON objects but tables require an array
    for (let key in mainElement) {
        if (key != 'id' && key != 'primaryImage' && key != 'share') {
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
                boxesArray.push({
                    boxName: camelCaseToTitleCase(key),
                    rowArray: rowArray
                })
            }

        }
    }

    productionDetailsArray.sort((a, b) => a.order - b.order)

    return (
        <div className="flex flex-col gap-4 w-full md:max-w-6xl">
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
            {boxesArray.length ? (
                boxesArray.map(box => (
                    <div key={box.boxName} className="rounded-xl shadow-sm p-4 pt-2">
                        <div className="pb-2 font-medium">
                            {box.boxName}
                        </div>
                        <DataTableSimple columns={GeneralInformationTableColumns} data={box.rowArray} />
                    </div>
                ))
            ) : (
                <div>no data</div>
            )}
        </div>
    )
}