
export default async function Page({ params }) {
    const { gtin } = await params
    return <div>GTIN: {gtin}</div>
}