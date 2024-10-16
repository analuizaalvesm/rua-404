import { useCallback, useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/Button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination/pagination";
import { cn } from "@/lib/utils";
import SideBar from "./components/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

const productTypes = ["Print", "Adesivo", "Quadro", "Camisa"];
const sizes = ["Tamanho único", "XS", "S", "M", "L", "XL"];
const collabs = ["Caxim", "NOID", "BH Conecta", "4.0.4 ORIGINALS"];

type Products = {
  id: number;
  name: string;
  productType: string;
  size: string;
  collab: string;
  price: number;
  quantity: number;
  lastUpdated: number[];
  url: string;
};

const StorePage = (props: Props) => {
  const navigate = useNavigate();

  // Estados separados para cada filtro
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCollabs, setSelectedCollabs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Products[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const productsPerPage = 12;

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
        if (response.data.length === 0) return;
        else {
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

  const handleProductTypeChange = (type: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleCollabChange = (collab: string) => {
    setSelectedCollabs((prev) =>
      prev.includes(collab) ? prev.filter((c) => c !== collab) : [...prev, collab]
    );
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        selectedProductTypes.length > 0
          ? selectedProductTypes.includes(product.productType)
          : true
      )
      .filter((product) =>
        selectedSizes.length > 0 ? selectedSizes.includes(product.size) : true
      )
      .filter((product) =>
        selectedCollabs.length > 0 ? selectedCollabs.includes(product.collab) : true
      )
      .filter((product) =>
        product.price >= priceRange
      )
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [
    products,
    selectedProductTypes,
    selectedSizes,
    selectedCollabs,
    priceRange,
    searchTerm,
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleNavigateProductDetails = (productId: number, products: any) => {
    navigate(`/product/${productId}`, { state: { productId: productId, products: products } });
  };

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900 pb-10">
        <div className="mx-auto px-16">
          <div className="flex justify-between items-center w-full mb-4 pt-6">
            <div className="text-left">
              <p className="text-lg leading-8 font-semibold">Filtros</p>
            </div>
            <div className="flex items-center w-1/4">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="flex-1 border border-gray-300 p-2 rounded-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button className="ml-2 rounded-none h-full">Pesquisar</Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <SideBar
              productType={productTypes}
              sizes={sizes}
              collabs={collabs}
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
                    <Card
                      key={product.id}
                      {...props}
                      onClick={() => handleNavigateProductDetails(product.id, currentProducts)}
                      className="relative group transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={product.url}
                          alt={product.name}
                          className="object-cover w-full h-80"
                        />
                        <button className="absolute bottom-0 left-0 right-0 mt-4 py-2 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition duration-150">
                          Adicionar ao Carrinho
                        </button>
                      </div>
                      <div className="p-6 pt-0">
                        <CardHeader>
                          <CardTitle className="pt-4">{product.name}</CardTitle>
                          <CardDescription>
                            {product.productType === "Print" ? "Impressão" : product.productType} da primeira coleção autoral lançada em 2024.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xl font-bold mt-2">
                            {`R$ ${product.price.toFixed(2).replace(".", ",")}`}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center">Nenhum produto encontrado.</p>
                )}
              </div>
            </main>
          </div>
        </div>

        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="text-black hover:bg-transparent"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  // disabled={currentPage === 1}
                >
                  Anterior
                </PaginationPrevious>
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    className={cn(
                      "px-3 py-1 rounded",
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    )}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 5 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationNext
                  className="text-black hover:bg-transparent"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  // disabled={currentPage === totalPages}
                >
                  Próximo
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
};

export default StorePage;
