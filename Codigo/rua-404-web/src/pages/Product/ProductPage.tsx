import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getUserProfile } from "@/services/ProfileService";
import { useCart } from "@/context/useCart";

interface Product {
  id: number;
  name: string;
  size: string;
  collab: string;
  quantity: number;
  price: number;
  productType: string;
  lastUpdated: any;
  url: string;
}

const ProductPage: React.FC = () => {
  const { user } = useAuth();
  const { addProductToCart } = useCart();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);

  const getUrl = window.location.pathname;
  const getProductIdByUrl = getUrl.split("/")[2];
  const productId = state?.productId || getProductIdByUrl;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await getUserProfile(user?.email || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const randomProducts = productList.sort(() => Math.random() - Math.random());

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product>(
          `http://localhost:8080/products/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      await addProductToCart(product, quantity);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Produto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 flex flex-col items-end ">
              <div>
                <img
                  src={product.url}
                  alt={product.name}
                  className="h-auto rounded-lg shadow-md mb-4 transition-opacity duration-300"
                  id="mainImage"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/384";
                  }}
                  style={{ width: "500px" }}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-orbitron-semibold mb-2">
                {product.name}
              </h2>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < 4.5 ? "black" : "none"}
                    stroke="black"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>
              <p className="text-gray-600 mb-4">ID: RS00{product.id}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">{`R$ ${product.price
                  .toFixed(2)
                  .replace(".", ",")}`}</span>
              </div>

              <p className="text-gray-700 mb-6">
                {product.productType === "Print"
                  ? "Impressão"
                  : product.productType}{" "}
                da primeira coleção autoral lançada em 2024.
              </p>

              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantidade:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity state
                  className="w-12 text-center rounded-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex space-x-2 mb-6">
                <button
                  className="bg-black flex gap-3 items-center text-white px-12 py-2 rounded-none hover:bg-gray-600 focus:outline-none focus:ring-0 focus:border-0"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  <FiShoppingCart size={20} />
                  {addingToCart ? "Adicionando..." : "Adicionar ao carrinho"}
                </button>
                <button className="bg-transparent flex items-center text-gray-800 px-2.5 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-0 focus:border-0">
                  <FiHeart size={20} />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Descrição do Produto:
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  <span>
                    O {product.productType.toLowerCase()} Rua 4.0.4 é impresso
                    em papel fine art, garantindo cores vibrantes. O quadro é
                    finalizado com moldura de madeira MDF preta.
                  </span>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10 mx-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-center md:mb-0">
              Produtos Relacionados
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-4 sm:mt-8">
            {randomProducts.slice(0, 5).map((relatedProduct: any, index) => (
              <div
                key={product.id}
                className="space-y-3 overflow-hidden rounded-sm border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <a className="overflow-hidden rounded">
                  <img
                    className="mx-auto h-44 w-full object-cover rounded-sm"
                    src={relatedProduct.url}
                    alt={`${relatedProduct.name} image`}
                  />
                </a>
                <div>
                  <a
                    href={relatedProduct.href}
                    className="text-lg font-orbitron-semibold pr-8 leading-tight text-gray-900 hover:underline dark:text-white"
                  >
                    {relatedProduct.name}
                  </a>
                  <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                    {relatedProduct.description}
                  </p>
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
                      navigate(`/product/${relatedProduct.id}`, {
                        state: { productId: relatedProduct.id },
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
      </section>
    </div>
  );
};

export default ProductPage;
