import { FiHeart } from "react-icons/fi";
import { Products } from "@/models/Product";
import { useNavigate } from "react-router-dom";

interface ProductSectionProps {
  products: Products[];
}

const ProductSection = ({ products }: ProductSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden xl:mt-8 xl:block">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        As pessoas também compraram
      </h3>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
        {products.slice(0, 3).map((product, index) => (
          <div
            key={product.id}
            className="space-y-3 overflow-hidden rounded-sm border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <a
              onClick={() =>
                navigate(`/product/${product.id}`, {
                  state: { productId: product.id },
                })
              }
              className="overflow-hidden rounded"
            >
              <img
                className="mx-auto h-44 w-full object-cover rounded-sm"
                src={product.url}
                alt={`${product.name} image`}
              />
            </a>
            <div>
              <a className="text-lg font-orbitron-semibold pr-8 leading-tight text-gray-900">
                {product.name}
              </a>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                <span className="">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              <button
                data-tooltip-target={`favourites-tooltip-${index + 1}`}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <FiHeart className="h-5 w-5" />
              </button>
              <div
                id={`favourites-tooltip-${index + 1}`}
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-sm bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              >
                Adicionar aos favoritos
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigate(`/product/${product.id}`, {
                    state: { productId: product.id },
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-sm bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Ver produto na loja
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
