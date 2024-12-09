import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Order } from "@/models/Order";
import { FaTimes } from "react-icons/fa";
import { FaArrowRight, FaCheck, FaTruck, FaBoxOpen } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";

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
      <div>
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
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

  const ProductsCard: React.FC<{ order: Order }> = () => {
    return (
      <div className="w-full md:w-1/3">
        <div className="flex flex-col gap-2 text-gray-800 text-base border border-gray-200 p-5 !bg-[#F5F5F5]">
          <h3 className="font-medium leading-tight">Produtos</h3>

          <svg
            className="my-1 w-full"
            width="1216"
            height="2"
            viewBox="0 0 1216 2"
            fill="none"
          >
            <path d="M0 1H1216" stroke="#D1D5DB"></path>
          </svg>

          <div className="flex flex-col gap-2">
            {order?.produtos.map((produto) => (
              <div key={produto.id}>
                <p>
                  {produto.quantity}x {produto.name} tamanho {produto.size}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AdressCard: React.FC<{ order: Order }> = () => {
    return (
      <div className="w-full md:w-1/3">
        <div className="flex flex-col gap-2 text-gray-800 text-base border border-gray-200 p-5 !bg-[#F5F5F5]">
          <h3 className="font-medium leading-tight">Endereço de entrega</h3>

          <svg
            className="my-1 w-full"
            width="1216"
            height="2"
            viewBox="0 0 1216 2"
            fill="none"
          >
            <path d="M0 1H1216" stroke="#D1D5DB"></path>
          </svg>

          <div className="flex flex-col gap-2">
            <div>
              <p>
                {order?.usuario.first_name} {order?.usuario.last_name}
              </p>
              <p>
                {order?.usuario.address.rua}, {order?.usuario.address.numero},{" "}
                {order?.usuario.address.complemento}
              </p>
              <p>
                {order?.usuario.address.bairro}, {order?.usuario.address.cidade}
                /{order?.usuario.address.estado}
              </p>
              <p>CEP: {order?.usuario.address.cep}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HelpCard: React.FC = () => {
    return (
      <div className="flex flex-row mt-20 mb-3 gap-3 items-center">
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
            <div className="mt-20 flex flex-col md:flex-row items-start gap-8">
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
