import { useEffect, useState } from "react";
import { Product } from "../../../models/Product";
import {
  getProductsApi,
  deleteProductApi,
  createProductApi,
} from "../../../services/ProductService";
import {
  FiChevronDown,
  FiEdit,
  FiPlus,
  FiSearch,
  FiTrash,
} from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/dropdown-menu";
import { Button } from "@/components/ui/Button/button";
import PaginationControl from "../Components/PaginationControl";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";
import { TableFooter } from "@mui/material";
import DeleteModal from "../Components/DeleteModal";
import ProductModal from "../Components/ProductModal";

const ITEMS_PER_PAGE = 10;

const Stock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("Mais antigo");

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProductsApi();
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleDeleteProduct = async () => {
    if (productToDelete !== null) {
      await deleteProductApi(productToDelete);
      fetchProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleAddProduct = async (formData: any) => {
    try {
      await createProductApi(formData);
      await fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEditProduct = async (formData: any) => {
    try {
      if (editProduct) {
        await createProductApi(formData);
        await fetchProducts();
        setShowEditModal(false);
        setEditProduct(null);
      }
    } catch (error) {
      console.log("Failed to update the product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
    switch (criteria) {
      case "Nome (A-Z)":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
      case "Nome (Z-A)":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name))
        );
        break;
      case "Preço (maior)":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => b.price - a.price)
        );
        break;
      case "Preço (menor)":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => a.price - b.price)
        );
        break;
      case "Quantidade (maior)":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => b.quantity - a.quantity)
        );
        break;
      case "Quantidade (menor)":
        setFilteredProducts(
          [...filteredProducts].sort((a, b) => a.quantity - b.quantity)
        );
        break;
      default:
        break;
    }
  };

  const openDeleteModal = (id: number) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + 10;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-full">
      <main>
        <div>
          <h1 className="text-2xl font-bold mb-4">Estoque de Produtos</h1>
          <div className="mb-4 flex gap-4 justify-between w-full">
            <div className="flex flex-col w-1/4">
              <div className="flex gap-2 items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Pesquisar produto"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm w-full p-2 pl-10 border border-gray-200 rounded-md shadow-sm"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-primary text-white font-regular text-sm rounded-md px-3 py-2 shadow-sm border border-black"
                >
                  Pesquisar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-10 text-gray-600 font-regular"
                    >
                      {sortCriteria}
                      <FiChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-44 font-regular"
                  >
                    <DropdownMenuItem onClick={() => handleSort("Nome (A-Z)")}>
                      Nome (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("Nome (Z-A)")}>
                      Nome (Z-A)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("Quantidade (maior)")}
                    >
                      Quantidade (maior)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("Quantidade (menor)")}
                    >
                      Quantidade (menor)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("Preço (maior)")}
                    >
                      Preço (maior)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("Preço (menor)")}
                    >
                      Preço (menor)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <div className="text-sm text-gray-500"></div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 bg-primary text-white font-regular text-sm rounded-md px-3 py-2 border border-black shadow-sm"
                >
                  <FiPlus size={16} />
                  Adicionar Produto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Table className="w-full text-left border-collapse">
            <TableHeader className="border-b">
              <TableRow>
                <TableCell className="font-semibold bg-white pl-4 rounded-tl-md">
                  ID
                </TableCell>
                <TableCell className="font-semibold bg-white pl-4 rounded-tl-md">
                  Produto
                </TableCell>
                <TableCell className="px-6 py-3 bg-white text-sm font-semibold">
                  Nome
                </TableCell>
                <TableCell className="px-6 py-3 bg-white text-sm font-semibold">
                  Categoria
                </TableCell>
                <TableCell className="px-6 py-3 bg-white text-sm font-semibold">
                  Preço
                </TableCell>
                <TableCell className="px-6 py-3 bg-white text-sm font-semibold">
                  Quantidade
                </TableCell>
                <TableCell className="px-6 py-3 bg-white text-sm font-semibold">
                  Tamanhos
                </TableCell>
                <TableCell className="font-semibold pr-4 text-right bg-white rounded-tr-md">
                  Ações
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className={`hover:bg-gray-50 ${
                      index !== currentProducts.length - 1 &&
                      "border-b border-gray-100"
                    } ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <TableCell className="px-5">#{product.id}</TableCell>
                    <TableCell className="px-6 py-4">
                      <img
                        src={product.url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-sm"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col">{product.name}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {product.productType}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {product.quantity} unidade(s)
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex space-x-2">
                        {product.size.split(",").map((size) => (
                          <span
                            key={size}
                            className="px-2 py-1 text-xs bg-gray-200 rounded"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 space-x-2 text-right">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="px-2.5 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(product.id)}
                        className="px-2.5 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        <FiTrash size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <TableCell
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum produto encontrado.
                  </TableCell>
                </tr>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} className="p-0">
                  <div className="bg-white h-1 rounded-br-md rounded-bl-md" />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <PaginationControl
          startIndex={startIndex}
          endIndex={endIndex}
          filteredUsers={filteredProducts}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          type="produtos"
        />
      </main>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteProduct}
        type="produto"
      />

      {showAddModal && (
        <ProductModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={(formData) => {
            handleAddProduct(formData);
          }}
          mode="add"
        />
      )}

      {showEditModal && editProduct && (
        <ProductModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={(formData) => handleSaveEditProduct(formData)}
          initialData={editProduct}
          mode="edit"
        />
      )}
    </div>
  );
};

export default Stock;
