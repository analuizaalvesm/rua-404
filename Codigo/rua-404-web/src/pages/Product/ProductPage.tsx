import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  productType: string;
  url: string;
}

const ProductPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  const productId = state?.productId;

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

  const arrayOfImages = (product: { url: string }) => [
    product.url,
    product.url,
    product.url,
    product.url,
  ];

  // será utilizado quando o back-end retornar mais imagens de um produto
  const changeImage = (url: string) => {
    const mainImage = document.getElementById("mainImage") as HTMLImageElement;
    if (mainImage) {
      mainImage.src = url;
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

                {/* <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                  {arrayOfImages(product).map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                      onClick={() => changeImage(url)}
                    />
                  ))}
                </div> */}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-orbitron-regular mb-2">
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
                  defaultValue="1"
                  className="w-12 text-center rounded-none border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex space-x-2 mb-6">
                <button className="bg-black flex gap-3 items-center text-white px-12 py-2 rounded-none hover:bg-gray-600 focus:outline-none focus:ring-0 focus:border-0">
                  <FiShoppingCart size={20} />
                  Adicionar ao carrinho
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

      {/* Produtos Relacionados */}
      <section className="bg-gray-100 py-10 mx-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-center md:mb-0">
              Produtos Relacionados
            </h2>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/store")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-around">
            {randomProducts.slice(0, 5).map((relatedProduct: any) => (
              <div
                key={relatedProduct.id}
                className="bg-white border border-gray-300 rounded-none shadow-md p-4 w-full sm:w-72 m-1 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between min-h-[300px]" // Ajuste a altura mínima conforme necessário
                onClick={() =>
                  navigate(`/product/${relatedProduct.id}`, {
                    state: { productId: relatedProduct.id, productList },
                  })
                }
              >
                <img
                  src={relatedProduct.url}
                  alt={relatedProduct.name}
                  className="h-32 w-full object-cover rounded-none mb-2"
                />
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {relatedProduct.name}
                </h3>
                <p className="text-gray-600 mb-1 text-center">{`R$ ${relatedProduct.price
                  .toFixed(2)
                  .replace(".", ",")}`}</p>
                <button className="bg-black text-white w-full py-2 mt-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Ver Produto
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
