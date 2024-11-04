import { FiHeart } from "react-icons/fi";
import { defaultProducts } from "../products";

const ProductSection = ({ products = defaultProducts }) => {
  return (
    <div className="hidden xl:mt-8 xl:block">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        People also bought
      </h3>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <a href={product.href} className="overflow-hidden rounded">
              <img
                className="mx-auto h-44 w-44 dark:hidden"
                src={product.imageLightMode}
                alt={`${product.name} image`}
              />
              <img
                className="mx-auto hidden h-44 w-44 dark:block"
                src={product.imageDarkMode}
                alt={`${product.name} image`}
              />
            </a>
            <div>
              <a
                href={product.href}
                className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
              >
                {product.name}
              </a>
              <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                <span className="line-through">${product.originalPrice}</span>
              </p>
              <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                ${product.salePrice}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2.5">
              <button
                data-tooltip-target={`favourites-tooltip-${index + 1}`}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <FiHeart className="h-5 w-5" />
              </button>
              <div
                id={`favourites-tooltip-${index + 1}`}
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              >
                Add to favourites
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <button
                type="button"
                onClick={() => product.onAddToCart?.(product)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
