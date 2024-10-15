import { useEffect, useState } from "react";
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
import { allProducts } from "./products";
import SideBar from "./components/SideBar";

type Props = {};

const categories = ["Categoria A", "Categoria B", "Categoria C"];

const StorePage = (props: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredProducts = selectedCategories.length
    ? allProducts
        .filter(
          (product) =>
            selectedCategories.includes(product.category) &&
            Number(product.price.replace("R$ ", "").replace(",", ".")) >=
              priceRange * 10
        )
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : allProducts
        .filter(
          (product) =>
            Number(product.price.replace("R$ ", "").replace(",", ".")) >=
            priceRange * 10
        )
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900 pb-10">
        <div className="mx-auto px-4">
          <div className="flex items-center w-1/4 mb-6 pt-6">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              className="flex-1 border border-gray-300 p-2 rounded"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button className="ml-2">Pesquisar</Button>
          </div>

          <div className="flex flex-col md:flex-row">
            <SideBar
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />

            <main className="w-full md:ml-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentProducts.map((product) => (
                  <Card key={product.id} {...props}>
                    <img
                      src={product.image}
                      alt={product.name}
                      height="100"
                      width="200"
                      className="object-cover w-full h-48"
                    />
                    <div className="p-6 pt-0">
                    <CardHeader>
                      <CardTitle className="pt-4">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                      <p className="text-xl font-bold mt-2">{product.price}</p>
                    </CardContent>
                    <CardFooter>
                      <button className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-blue-700 transition duration-150">
                        Adicionar ao Carrinho
                      </button>
                    </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>

        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                        ? "bg-blue-600 text-white"
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
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
