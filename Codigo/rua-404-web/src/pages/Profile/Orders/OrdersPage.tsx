import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getUserProfile } from "@/services/ProfileService";
import { Order } from "@/models/Order";
import { FaArrowLeft } from "react-icons/fa6";

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("Fetching user profile...");
      try {
        const userData = await getUserProfile(user?.email || "");
        console.log("User data fetched:", userData);
        if (userData) {
          if (userData?.customer_id !== 0) {
            console.log("Customer ID:", userData?.customer_id);
            axios
              .get(
                `http://localhost:8080/orders/customer/${userData?.customer_id}`
              )
              .then((response) => {
                setOrderList(response.data);
                console.log("Orders fetched:", response.data);
              })
              .catch((error) => {
                console.error("Error fetching orders:", error);
              });
          } else {
            console.log("Customer ID is 0");
          }
        } else {
          console.log("User data is null");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      console.log("User is defined:", user);
      fetchUserProfile();
    } else {
      console.log("User is not defined");
    }
  }, [user]);

  const formatData = (data: string) => {
    return data !== null ? data.replace(/-/g, "/") : data;
  };

  const addDays = (data: string, days: number) => {
    const date = new Date(data);
    date.setDate(date.getDate() + days);
    return date;
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const handleCancelButtonClick = () => {
      navigate(`/`);
    };

    return (
      <div className="border border-gray-300 pt-9 !bg-[#F5F5F5]">
        <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
          <div className="data">
            <p className="font-medium text-lg leading-4 text-black whitespace-nowrap">
              Pedido: #{order.id}
            </p>
            <p className="font-medium text-lg leading-4 text-black mt-3 whitespace-nowrap">
              Data: {formatData(order.data)}
            </p>
          </div>
          <div className="flex items-center gap-3 max-md:mt-5">
            <button
              onClick={handleCancelButtonClick}
              className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={() =>
                navigate(`/profile/order/${order.id}`, {
                  state: { orderId: order.id },
                })
              }
              className="rounded-full px-7 py-3 bg-black shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-gray hover:bg-gray"
            >
              Detalhes
            </button>
          </div>
        </div>

        <svg
          className="my-9 w-full"
          width="1216"
          height="2"
          viewBox="0 0 1216 2"
          fill="none"
        >
          <path d="M0 1H1216" stroke="#D1D5DB"></path>
        </svg>
        <div className="flex max-md:flex-col items-center gap-8 px-3 md:px-11 justify-stretch lg:gap-64">
          <div className="flex max-lg:flex-col items-center gap-8 lg:gap-32 justify-between">
            <div className="col-span-4 sm:col-span-1">
              <img
                className="h-24 w-24 rounded-sm object-cover"
                src={order.produtos[0].url}
                alt="Product"
              ></img>
            </div>
            <div className="flex flex-col justify-center items-start max-sm:items-center">
              <p className="font-semibold text-lg text-black leading-8 mb-2 text-left whitespace-nowrap">
                {order.produtos[0].nome}{" "}
                {order.produtos.length > 1 ? "e mais..." : ""}
              </p>
              <p className="font-normal text-base leading-8 text-gray-500 text-left whitespace-nowrap">
                By: RUA 404
              </p>
            </div>
          </div>

          <div>
            <div className="items-center justify-center">
              <div className="flex flex-col justify-center items-start max-sm:items-center">
                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                  Previsão de entrega
                </p>
                <p className="font-semibold text-base leading-8 text-black text-left whitespace-nowrap">
                  {formatData(addDays(order.data, 15).toISOString())}
                </p>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="mt-9 w-full"
          width="1216"
          height="2"
          viewBox="0 0 1216 2"
          fill="none"
        >
          <path d="M0 1H1216" stroke="#D1D5DB" />
        </svg>

        <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
          <span
            className={`font-bold
                            ${
                              order.status === "PENDENTE"
                                ? "text-yellow-600"
                                : order.status === "CANCELADO"
                                ? "text-red-500"
                                : "text-green-600"
                            }`}
          >
            {order.status}
          </span>
          <p className="py-6 font-medium text-xl leading-8 text-black max-sm:py-4">
            <span className="text-gray-500">Total:</span> &nbsp;
            {order.valorTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-xl font-medium font-orbitron-regular mb-1">
          Pedidos
        </h2>
      </div>
      <main className="max-full">
        <div className="flex flex-col gap-8">
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <section className="flex items-center h-[50vh] dark:bg-gray-50 dark:text-gray-800">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-xl text-center">
                  <div className="mt-4 mb-8 dark:text-gray-600">
                    <p>Parece que você ainda não fez pedidos.</p>
                    <p>Não se preocupe, temos o que você procura.</p>
                  </div>
                  <button
                    rel="noopener noreferrer"
                    onClick={() => navigate("/store")}
                    className="px-4 py-2 font-medium rounded text-white"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <FaArrowLeft color="#fff" size={14} />
                      Loja
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

export default OrdersPage;
