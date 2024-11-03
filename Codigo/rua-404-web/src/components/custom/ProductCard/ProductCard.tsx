import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card/card";
import { Products } from "../../../models/Product";

interface ProductCardProps {
  product: Products;
  onClick: (id: number, products: Products[]) => void;
  currentProducts: Products[];
}

const ProductCard = ({
  product,
  onClick,
  currentProducts,
}: ProductCardProps) => {
  return (
    <Card
      onClick={() => onClick(product.id, currentProducts)}
      className="relative group transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex flex-col"
    >
      <div className="relative h-[300px]">
        <img
          src={product.url}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <button className="absolute bottom-0 left-0 right-0 py-2 bg-black text-white opacity-0 group-hover:opacity-100 transition duration-150">
          Adicionar ao Carrinho
        </button>
      </div>

      <CardHeader className="p-2 flex-grow flex flex-col justify-center">
        <CardTitle className="text-xl font-orbitron-bold text-center px-4 pt-2">
          {product.name}
        </CardTitle>
        <CardDescription className="text-center flex-grow flex items-center justify-center px-2 pt-1">
          <span>
            {product.productType === "Print"
              ? "Impressão"
              : product.productType}{" "}
            da primeira coleção autoral lançada em 2024.
          </span>
        </CardDescription>
        <CardContent className="w-full text-center pt-2 pb-2">
          <p className="text-xl font-bold">
            {`R$ ${product.price.toFixed(2).replace(".", ",")}`}
          </p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
