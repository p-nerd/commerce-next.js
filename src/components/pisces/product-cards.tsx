import { NoResults } from "../ui2/typography";
import ProductCard, { TProductCardData } from "./ProductCard";

const ProductCards = (p: { title: string; data: TProductCardData[] }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-3xl font-bold">{p.title}</h3>
            {!p.data.length && <NoResults />}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
                {p.data.map((item: TProductCardData) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductCards;
