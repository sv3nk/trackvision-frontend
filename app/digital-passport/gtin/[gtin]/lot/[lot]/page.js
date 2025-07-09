
export default async function Page({ params }) {
    const { gtin, lot } = await params
    return <div>GTIN: {gtin} LOT: {lot}</div>
}