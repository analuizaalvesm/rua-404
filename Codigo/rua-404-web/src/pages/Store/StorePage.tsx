import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Products } from "../../models/Product";
import { FILTER_CONSTANTS } from "../../models/FilterConstants";
import { useProductFilter } from "../../hooks/useProductFilter";
import SearchBar from "../../components/custom/SearchBar/SearchBar";
import ProductCard from "../../components/custom/ProductCard/ProductCard";
import PaginationControls from "../../components/custom/Pagination/PaginationControls";
import SideBar from "./components/SideBar";

const StorePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Products[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const {
    selectedProductTypes,
    selectedSizes,
    selectedCollabs,
    priceRange,
    currentPage,
    filteredProducts,
    setPriceRange,
    setCurrentPage,
    handleSearch,
    handleProductTypeChange,
    handleSizeChange,
    handleCollabChange,
  } = useProductFilter(products);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
        if (response.data.length > 0) {
          const max = response.data.reduce(
            (acc: number, product: Products) =>
              product.price > acc ? product.price : acc,
            0
          );
          setMaxPrice(max);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNavigateProductDetails = (
    productId: number,
    products: Products[]
  ) => {
    navigate(`/product/${productId}`, {
      state: { productId, products },
    });
  };

  const indexOfLastProduct = currentPage * FILTER_CONSTANTS.productsPerPage;
  const indexOfFirstProduct =
    indexOfLastProduct - FILTER_CONSTANTS.productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(
    filteredProducts.length / FILTER_CONSTANTS.productsPerPage
  );

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900 pb-10">
        <div className="mx-auto max-w-screen-2xl px-16">
          <SearchBar onSearch={handleSearch} />

          <div className="flex flex-col md:flex-row">
            <SideBar
              productType={FILTER_CONSTANTS.productTypes}
              sizes={FILTER_CONSTANTS.sizes}
              collabs={FILTER_CONSTANTS.collabs}
              maxPrice={maxPrice}
              selectedProductTypes={selectedProductTypes}
              handleProductTypeChange={handleProductTypeChange}
              selectedSizes={selectedSizes}
              handleSizeChange={handleSizeChange}
              selectedCollabs={selectedCollabs}
              handleCollabChange={handleCollabChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
            <main className="w-full md:ml-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={handleNavigateProductDetails}
                      currentProducts={currentProducts}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center">
                    Nenhum produto encontrado.
                  </p>
                )}
              </div>
            </main>
          </div>
        </div>

        <div className="mt-8">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
};

export default StorePage;
