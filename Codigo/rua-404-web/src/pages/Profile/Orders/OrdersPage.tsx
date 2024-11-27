import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { getUserProfile } from "@/services/ProfileService";
import { Order } from "@/models/Order";
import { FaArrowLeft } from "react-icons/fa6";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";

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
                            .get(`http://localhost:8080/orders/customer/${userData?.customer_id}`)
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
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const OrderCard = ({ order }: { order: Order }) => {
        const handleCardClick = () => {
            navigate(`/`);
        };

        return (
            <div onClick={handleCardClick} className="cursor-pointer hover:border">
                <div className="border border-gray-300">
                    <div className="flex justify-between items-center !bg-[#F5F5F5] p-3">
                        <span className="font-semibold text-black">
                            Pedido #{order.id}
                        </span>
                    </div>
                    <svg className="mt-0 pt-2 w-full" width="1216" height="2" viewBox="0 0 1216 2"
                        fill="none">
                        <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>
                    <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                        <FiCalendar className="inline-block mr-1" />
                        Data: {formatData(order.data)}
                    </div>
                    <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                        <FiShoppingBag className="inline-block mr-1" />
                        Itens: {order.produtos.length}
                    </div>
                    <svg className="mt-0 pt-2 w-full" width="1216" height="2" viewBox="0 0 1216 2"
                        fill="none">
                        <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>

                    <div className="flex justify-between items-center pt-3 px-3 pb-3 border-t border-gray-100">
                        <span
                            className={`px-2 py-1 text-xs rounded-full items-center 
                                ${ order.status === "PENDENTE"
                                    ? "bg-yellow-100 text-yellow-600 border border-yellow-200"
                                    : order.status === "CANCELADO"
                                        ? "bg-red-100 text-red-600 border border-red-200"
                                        : "bg-green-100 text-green-600 border border-green-200"
                                }`}
                            >
                            {order.status}
                        </span>
                        <div className="font-bold text-gray-900">
                            Total:{" "}
                            {order.valorTotal.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-medium font-orbitron-regular mb-1">Pedidos</h2>
            </div>
            <main className="max-w-xl">
                <div className="flex flex-col gap-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    ) : (
                        <section className="flex items-center h-[50vh] dark:bg-gray-50 dark:text-gray-800">
                            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                                <div className="max-w-xl text-center">
                                    <p className="text-2xl font-orbitron-semibold md:text-4xl">
                                        PEDID0S N0T F0UND
                                    </p>
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