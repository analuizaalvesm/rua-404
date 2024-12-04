import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Order } from "@/models/Order";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

const Orders: React.FC = () => {
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
                    <div className="text-sm text-gray-500 font-regular flex items-start px-3">
                        <FiShoppingBag className="inline-block mr-1" />
                        Itens:
                        <div className="flex flex-col">
                            {order.produtos.map((product) => (
                                <div key={product.id} className="flex items-center pl-2">
                                    {product.quantity} - {product.size} - {product.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <svg className="mt-0 pt-2 w-full" width="1216" height="2" viewBox="0 0 1216 2"
                        fill="none">
                        <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>
                    <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                        DADOS DA ENTREGA
                    </div>
                    <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                        <CgProfile className="inline-block mr-1" />
                        {order.usuario.first_name} {order.usuario.last_name} - {order.usuario.email} - {order.usuario.telefone}
                    </div>
                    <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                        <SlLocationPin className="inline-block mr-1" />
                        {order.usuario.address === null
                            ? "Endereço não cadastrado"
                            : <>
                                {order.usuario.address.rua + ", " + order.usuario.address.numero + ", " + order.usuario.address.complemento} - {order.usuario.address.bairro}<br />
                                {order.usuario.address.cidade}/{order.usuario.address.estado} - CEP: {order.usuario.address.cep}
                            </>
                        }
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

                        {/* <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown divider <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>

                        <div id="dropdownDivider" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                            </ul>
                            <div className="py-2">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
                            </div>
                        </div> */}

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
