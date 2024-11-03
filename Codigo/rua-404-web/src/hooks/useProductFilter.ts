import { useMemo, useState } from "react";
import { Products } from "../models/Product";

export const useProductFilter = (products: Products[]) => {
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCollabs, setSelectedCollabs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
        selectedCollabs.length > 0
          ? selectedCollabs.includes(product.collab)
          : true
      )
      .filter((product) => product.price >= priceRange)
      .filter((product) =>
        searchTerm
          ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      );
  }, [
    products,
    selectedProductTypes,
    selectedSizes,
    selectedCollabs,
    priceRange,
    searchTerm,
  ]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

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
      prev.includes(collab)
        ? prev.filter((c) => c !== collab)
        : [...prev, collab]
    );
    setCurrentPage(1);
  };

  return {
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
  };
};