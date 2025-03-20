import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Order } from "@/models/Order";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight, FaCheck, FaTruck, FaBoxOpen } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { Home, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardProps } from "@mui/material";

const OrderDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [order, setOrder] = useState<Order>();

  const orderId = state?.orderId;

  useEffect(() => {
    const fetchOrder = async () => {
      console.log("Fetching order...");
      try {
        axios
          .get(`http://localhost:8080/orders/${orderId}`)
          .then((response) => {
            setOrder(response.data);
            console.log("Order fetched:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching order:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (orderId) {
      console.log("orderId is defined:", orderId);
      fetchOrder();
    } else {
      console.log("orderId is not defined");
    }
  }, [orderId]);

  const Stepper: React.FC<{ status: string }> = ({ status }) => {
    const steps = [
      {
        label: "Pagamento em análise",
        description: "Aguarde enquanto confirmamos o seu pagamento.",
        status: "PENDENTE",
        icon: <MdAttachMoney />,
      },
      {
        label: "Em preparação",
        description:
          "Eba! Seu pagamento foi confirmado, estamos preparando o seu pacote.",
        status: "PRONTO",
        icon: <FaBoxOpen />,
      },
      {
        label: "A caminho",
        description: "Agora é real! Sua arte já está indo até você.",
        status: "ENVIADO",
        icon: <FaTruck />,
      },
      {
        label: "Entregue",
        description:
          "Seu RUA404 chegou! Aproveite e conta pra gente o que achou.",
        status: "ENTREGUE",
        icon: <FaCheck />,
      },
    ];

    const getStatusIndex = (status: string) => {
      return steps.findIndex((step) => step.status === status);
    };

    const currentStepIndex = getStatusIndex(status);

    return (
      <div className="relative ml-8">
        {" "}
        <ol className="text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {status !== "CANCELADO" ? (
            steps.map((step, index) => (
              <li
                key={step.status}
                className={`mb-10 ms-8 ${
                  index <= currentStepIndex ? "text-green-700" : "text-gray-500"
                }`}
              >
                <span
                  className={`absolute flex items-center justify-center w-8 h-8 
                                              ${
                                                index <= currentStepIndex
                                                  ? "bg-green-200"
                                                  : "bg-gray-100"
                                              } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 
                                              ${
                                                index <= currentStepIndex
                                                  ? "dark:bg-green-900"
                                                  : "dark:bg-gray-600"
                                              }`}
                >
                  <span
                    className={`w-3.5 h-3.5 ${
                      index <= currentStepIndex
                        ? "text-green-600"
                        : "text-gray-500"
                    } dark:text-gray-400`}
                  >
                    {step.icon}
                  </span>
                </span>
                <h3
                  className={`font-medium leading-tight ${
                    index <= currentStepIndex
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </h3>
                <p
                  className={`text-sm ${
                    index <= currentStepIndex
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>
              </li>
            ))
          ) : (
            <li className="ms-8 mb-10">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-red-100 rounded-full -start-4 ring-4 ring-white dark:ring-red-900 dark:bg-red-700">
                <svg
                  className="w-5 h-5 text-red-500 dark:text-red-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <FaTimes />
                </svg>
              </span>
              <h3 className="font-medium leading-tight text-red-600">
                Cancelado
              </h3>
              <p className="text-sm text-red-600">
                Seu pedido está cancelado. Esperamos que volte a comprar
                conosco.
              </p>
            </li>
          )}
        </ol>
      </div>
    );
  };

  const Card: React.FC<CardProps> = ({ className, children }) => {
    return (
      <div
        className={cn(
          "w-full bg-white p-6 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md",
          className
        )}
      >
        {children}
      </div>
    );
  };

  const ProductsCard: React.FC<{ order: Order }> = ({ order }) => {
    const groupedProducts = order.produtos.reduce((acc, produto) => {
      const key = produto.id || produto.name;

      if (!acc[key]) {
        acc[key] = {
          ...produto,
          quantity: 1,
        };
      } else {
        acc[key].quantity += 1;
      }

      return acc;
    }, {});

    const productsList = Object.values(groupedProducts);

    return (
      <Card className="h-full p-4">
        <div className="flex items-center mb-4 space-x-2">
          <FiPackage className="h-5 w-5 text-neutral-800" strokeWidth={1.5} />
          <h3 className="font-medium text-lg text-neutral-800">
            Produtos ({productsList.length})
          </h3>
        </div>

        <div className="h-px w-full bg-gray-100 mb-4" />

        <div className="flex flex-col">
          {productsList.map((produto, index) => (
            <div
              key={produto.id || produto.name}
              className={`group p-3 rounded-lg ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-neutral-800 text-white text-xs mr-3">
                    {produto.quantity}
                  </span>
                  <p className="font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                    {produto.name}
                  </p>
                </div>
                <span className="text-sm text-neutral-500 group-hover:text-neutral-700 transition-colors">
                  Tam: {produto.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const AdressCard: React.FC<{ order: Order }> = ({ order }) => {
    return (
      <Card className="h-full">
        <div className="flex items-center mb-4 space-x-2">
          <MapPin className="h-5 w-5 text-neutral-800" strokeWidth={1.5} />
          <h3 className="font-medium text-lg text-neutral-800">
            Endereço de entrega
          </h3>
        </div>

        <div className="h-px w-full bg-gray-100 mb-4" />

        <div className="rounded-lg bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100">
          <div className="flex items-start space-x-3 mb-3">
            <User className="h-4 w-4 text-neutral-600 mt-1" strokeWidth={1.5} />
            <p className="font-medium text-neutral-700">
              {order?.usuario.first_name} {order?.usuario.last_name}
            </p>
          </div>

          <div className="flex items-start space-x-3 mb-3">
            <Home className="h-4 w-4 text-neutral-600 mt-1" strokeWidth={1.5} />
            <div>
              <p className="text-neutral-700">
                {order?.usuario.address.rua}, {order?.usuario.address.numero}
                {order?.usuario.address.complemento &&
                  `, ${order?.usuario.address.complemento}`}
              </p>
              <p className="text-neutral-700">
                {order?.usuario.address.bairro}, {order?.usuario.address.cidade}
                /{order?.usuario.address.estado}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin
              className="h-4 w-4 text-neutral-600 mt-1"
              strokeWidth={1.5}
            />
            <p className="text-neutral-700">
              CEP: {order?.usuario.address.cep}
            </p>
          </div>
        </div>
      </Card>
    );
  };
  const HelpCard: React.FC = () => {
    return (
      <div className="flex flex-row mt-10 gap-3 items-center">
        <p className="text-gray-600 text-sm">Precisa de ajuda?</p>
        <button
          rel="noopener noreferrer"
          onClick={() => navigate("#")}
          className="px-4 py-2 font-medium rounded text-white"
        >
          <div className="flex flex-row items-center gap-2 text-sm">
            Falar no WhatsApp
            <FaArrowRight color="#fff" size={14} />
          </div>
        </button>
      </div>
    );
  };

  const OrderCard: React.FC<{ order: Order }> = () => {
    return (
      <div>
        {order ? (
          <div>
            <Stepper status={order.status} />
            <h2 className="text-xl font-medium font-orbitron-regular mb-1">
              Informações do Pedido
            </h2>
            <div className="mt-6 flex flex-col items-start gap-8">
              <ProductsCard order={order} />
              <AdressCard order={order} />
            </div>
          </div>
        ) : (
          <div>
            <p>Endereço não encontrado.</p>
          </div>
        )}
        <HelpCard />
      </div>
    );
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-xl font-medium font-orbitron-regular mb-1">
          Pedido #{orderId}
        </h2>
      </div>
      <main className="max-full">
        <div className="flex flex-col gap-8">
          {order ? (
            <OrderCard order={order} />
          ) : (
            <section className="flex items-center h-[50vh] dark:bg-gray-50 dark:text-gray-800">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-xl text-center">
                  <div className="mt-4 mb-8 dark:text-gray-600">
                    <p>Pedido não encontrado.</p>
                  </div>
                  <button
                    rel="noopener noreferrer"
                    onClick={() => navigate("#")}
                    className="px-4 py-2 font-medium rounded text-white"
                  >
                    <div className="flex flex-row items-center gap-2">
                      Ajuda
                      <FaArrowRight color="#fff" size={14} />
                    </div>
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderDetailsPage;
