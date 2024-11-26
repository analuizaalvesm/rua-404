import { useEffect, useState } from "react";
import { Product } from "../../../models/Product";
import {
  getProductsApi,
  deleteProductApi,
  createProductApi,
} from "../../../services/ProductService";

const Stock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    productType: "",
    size: "",
    collab: "",
    price: 0,
    quantity: 0,
    lastUpdated: new Date().toISOString(),
    url: "",
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProductsApi();
    if (data) setProducts(data);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete !== null) {
      await deleteProductApi(productToDelete);
      fetchProducts();
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleAddProduct = async () => {
    await createProductApi(newProduct);
    fetchProducts();
    setShowAddModal(false);
    setNewProduct({
      name: "",
      productType: "",
      size: "",
      collab: "",
      price: 0,
      quantity: 0,
      lastUpdated: new Date().toISOString(),
      url: "",
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleSaveEditProduct = async () => {
    if (editProduct) {
      await createProductApi(editProduct);
      setShowEditModal(false);
      setEditProduct(null);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductAdminCard = ({ product }: { product: Product }) => (
    <div className="border rounded p-4 shadow-md flex flex-col">
      <h3 className="font-semibold">{product.name}</h3>
      <p>Type: {product.productType}</p>
      <p>Size: {product.size}</p>
      <p>Collab: {product.collab}</p>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleEditProduct(product)}
          className="px-4 py-2 border border-black text-white rounded hover:bg-black hover:text-white transition"
        >
          Editar
        </button>
        <button
          onClick={() => {
            setProductToDelete(product.id);
            setShowDeleteModal(true);
          }}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );

  const renderInputField = (
    label: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type = "text"
  ) => (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded p-2"
      />
    </div>
  );

  return (
    <div className="max-w-full">
      <section className="dark:bg-gray-900 pb-10">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex items-center mb-4 space-x-4">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 flex-1"
            />
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition"
            >
              Adicionar Produto
            </button>
          </div>

          <main className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductAdminCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </main>
        </div>
      </section>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este produto?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Adicionar Novo Produto</h2>
            <form className="flex flex-col space-y-4">
              {renderInputField("Nome", newProduct.name, (e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              )}
              {renderInputField(
                "Tipo de Produto",
                newProduct.productType,
                (e) =>
                  setNewProduct({ ...newProduct, productType: e.target.value })
              )}
              {renderInputField("Tamanho", newProduct.size, (e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              )}
              {renderInputField("Colaboração", newProduct.collab, (e) =>
                setNewProduct({ ...newProduct, collab: e.target.value })
              )}
              {renderInputField(
                "Preço",
                newProduct.price,
                (e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  }),
                "number"
              )}
              {renderInputField(
                "Quantidade",
                newProduct.quantity,
                (e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: parseInt(e.target.value, 10),
                  }),
                "number"
              )}
              {renderInputField("URL da Imagem", newProduct.url, (e) =>
                setNewProduct({ ...newProduct, url: e.target.value })
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddProduct}
                  type="button"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Editar Produto</h2>
            <form className="flex flex-col space-y-4">
              {renderInputField("Nome", editProduct.name, (e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              )}
              {renderInputField(
                "Tipo de Produto",
                editProduct.productType,
                (e) =>
                  setEditProduct({
                    ...editProduct,
                    productType: e.target.value,
                  })
              )}
              {renderInputField("Tamanho", editProduct.size, (e) =>
                setEditProduct({ ...editProduct, size: e.target.value })
              )}
              {renderInputField("Colaboração", editProduct.collab, (e) =>
                setEditProduct({ ...editProduct, collab: e.target.value })
              )}
              {renderInputField(
                "Preço",
                editProduct.price,
                (e) =>
                  setEditProduct({
                    ...editProduct,
                    price: parseFloat(e.target.value),
                  }),
                "number"
              )}
              {renderInputField(
                "Quantidade",
                editProduct.quantity,
                (e) =>
                  setEditProduct({
                    ...editProduct,
                    quantity: parseInt(e.target.value, 10),
                  }),
                "number"
              )}
              {renderInputField("URL da Imagem", editProduct.url, (e) =>
                setEditProduct({ ...editProduct, url: e.target.value })
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEditProduct}
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
