import { getCalculationOuput, getIngredientsList, getMaterialOriginList, getComponentDetailsList, getAdditiveList, getRecyclabilityList, getRecommendedUseList } from "@/lib/data";


export default async function Page({ params }) {
    const { gtin, lot } = await params;

    const calculationData = await getCalculationOuput(gtin, lot);
    //const ingredientList = await getIngredientsList(gtin, lot);
    //const materialOriginList = await getMaterialOriginList(gtin, lot);
    //const componentDetailsList = await getComponentDetailsList(gtin, lot);
    //const additiveList = await getAdditiveList(gtin, lot);
    //const recyclabilityList = await getRecyclabilityList(gtin, lot);
    //const recommendedUseList = await getRecommendedUseList(gtin, lot);


    return (
        <div>
            
        </div>
    )
}