
export async function getCalculationOuput(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/1dd41221-518a-4ef4-b891-a78d7cdd96cc?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();

}

export async function getIngredientsList(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/35e6186d-5694-4439-b9ad-51cecf6689a0?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();
}

export async function getMaterialOriginList(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/154c6927-e65e-439f-93ab-ff9f0e5a0968?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();
}

export async function getComponentDetailsList(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/85328c07-22a9-4308-86c5-1116951ff498?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();
}

export async function getAdditiveList(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/c506ef73-b0b1-4919-a986-5f0f0d4d61c4?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();
}

export async function getRecyclabilityList(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/5d6757c3-ff3b-426b-b006-20d3c2f343d7?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();
}

export async function getRecommendedUseList(gtin, lot) {

    const query = 'https://rcycledemo.trackvision.ai/flows/trigger/f6598401-2f14-44b6-8506-425b371624eb?gtin=' + gtin + '&lot=' + lot;

    const data = await fetch(query);

    return data.json();
}
