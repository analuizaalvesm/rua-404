import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "@/models/Order";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

const Orders: React.FC = () => {
    const navigate = useNavigate();

    const [orders, setOrderList] = useState<Order[]>([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/orders`)
            .then((response) => {
                setOrderList(response.data);
                console.log("Orders fetched:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const formatData = (data: string) => {
        const date = new Date(data);
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const OrderCard = ({ order }: { order: Order }) => {
        return (
            <div>
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
                    <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                        <SlLocationPin className="inline-block mr-1" />
                        Endereço: {order.usuario.address === null
                            ? "Endereço não cadastrado"
                            : order.usuario.address.rua}
                    </div>
                    <svg className="mt-0 pt-2 w-full" width="1216" height="2" viewBox="0 0 1216 2"
                        fill="none">
                        <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>

                    <div className="flex justify-between items-center pt-3 px-3 pb-3 border-t border-gray-100">
                        <span
                            className={`px-2 py-1 text-xs rounded-full items-center 
                                ${order.status === "PENDENTE"
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
                <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
            </div>
            <main className="max-w-xl">
                <div className="flex flex-col gap-6">
                    {orders.length > 0 ? (
                        orders.map((order) => <OrderCard key={order.id} order={order} />)
                    ) : (
                        <section className="flex items-left">
                            <div className="container flex flex-col items-left justify-center mx-auto">
                                <div className="max-w-xl text-left">
                                    <div className="mb-8 dark:text-gray-600">
                                        <p>Nenhum pedido foi encontrado.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Orders;
