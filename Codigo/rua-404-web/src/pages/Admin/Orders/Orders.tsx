import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Order } from "@/models/Order";
import { FiCalendar, FiShoppingBag, FiSearch } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

const Orders: React.FC = () => {
    const [orders, setOrderList] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        axios
            .get(`http://localhost:8080/orders`)
            .then((response) => {
                setOrderList(response.data);
                setFilteredOrders(response.data);
                console.log("Orders fetched:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const handleStatusChange = (orderId: number, status: string) => {
        axios
            .put(`http://localhost:8080/orders/${orderId}/status?status=${status}`)
            .then((response) => {
                alert(response.data);
                console.log("response:", response);
                const updatedOrders = orders.map((order) => {
                    if (order.id === orderId) {
                        return { ...order, status };
                    }
                    return order;
                });
                setOrderList(updatedOrders);
                setFilteredOrders(updatedOrders);
            })
            .catch((error) => {
                alert(error.response.data);
                console.error("Error updating order status:", error);
            });
    }

    const handleSearch = () => {
        console.log("searchQuery:", searchQuery);
        const query = searchQuery.toLowerCase();
        const filtered = orders.filter(
            (order) =>
                (order.id && order.id.toString().includes(query)) ||
                (order.usuario.first_name && order.usuario.first_name.toLowerCase().includes(query)) ||
                order.usuario.last_name && order.usuario.last_name.toLowerCase().includes(query)
        );
        setFilteredOrders(filtered);
    };

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
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-2 py-1 text-xs rounded-full items-center 
                                ${order.status === "PENDENTE"
                                    ? "bg-yellow-100 text-yellow-600 border border-yellow-200"
                                    : order.status === "PRONTO"
                                        ? "bg-orange-100 text-orange-600 border border-orange-200"
                                        : order.status === "ENVIADO"
                                            ? "bg-blue-100 text-blue-600 border border-blue-200"
                                            : order.status === "ENTREGUE"
                                                ? "bg-green-100 text-green-600 border border-green-200"
                                                : order.status === "CANCELADO"
                                                    ? "bg-red-100 text-red-600 border border-red-200"
                                                    : "bg-green-100 text-green-600 border border-green-200"
                                }`}
                        >
                            <option value="PENDENTE">PENDENTE</option>
                            <option value="PRONTO">PRONTO</option>
                            <option value="ENVIADO">ENVIADO</option>
                            <option value="ENTREGUE">ENTREGUE</option>
                            <option value="CANCELADO">CANCELADO</option>
                        </select>

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
                <div className="mb-4 flex gap-4 justify-between w-full">
                    <div className="flex flex-col w-1/3">
                        <div className="flex gap-2 items-center">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Pesquisar por id ou nome"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="text-sm w-full p-2 pl-10 border border-gray-200 rounded-md shadow-sm"
                                />
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-primary text-white font-regular text-sm rounded-md px-3 py-2 border border-black"
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <main className="max-w-xl">
                <div className="flex flex-col gap-6">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
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
