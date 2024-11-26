import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { User } from "@/models/User";
import { getUserProfile } from "@/services/ProfileService";
import { Order } from "@/models/Order";
import { FaArrowLeft } from "react-icons/fa6";

const Orders: React.FC = () => {
    const { user } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [orders, setOrderList] = useState<Order[]>([]);
    const [userData, setUserData] = useState<User | null>(null);

    const orderId = state?.orderId;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile(user?.email || "");
                if (userData) {
                    setUserData(userData);
                }

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
            .get("http://localhost:8080/orders")
            .then((response) => {
                setOrderList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const formatData = (data: string) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const addDays = (data: string, days: number) => {
        const date = new Date(data);
        date.setDate(date.getDate() + days);
        return date;
    };

    useEffect(() => {
        if (!orderId) {
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Order>(
                    `http://localhost:8080/orders/${orderId}`
                );

                setOrder(response.data);

            } catch (err) {
                console.error(err);
                setError("Failed to fetch order data.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();

    }, [orderId]);

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

    const OrderCard = ({ order }: { order: Order }) => {
        const [statusText, setStatusText] = useState<string>("Aguardando confirmação");

        const handleCancelButtonClick = () => {
            setStatusText("Cancelado");
        }

        return (
            <div className="!bg-[#F5F5F5] border border-gray-300 pt-9">
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
                            className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                            Cancelar
                        </button>
                        <button
                            className="rounded-full px-7 py-3 bg-black shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-gray hover:bg-gray">
                            Comprar novamente
                        </button>
                    </div>
                </div>

                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                    <path d="M0 1H1216" stroke="#D1D5DB"></path>
                </svg>

                <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                        <div className="col-span-4 sm:col-span-1">
                            <img className="h-24 w-24 rounded-sm object-cover" src="https://placehold.co/80x80/EEE/31343C" alt="PC system All in One APPLE iMac (2023) mqrq3ro/a"></img>
                        </div>
                        <div
                            className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                            <h6 className="text-xl mb-1 leading-9 text-black mb-3 whitespace-nowrap">
                                {
                                    order.produtos.map((product) => (
                                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                            <p className="font-semibold">{product.name}</p>
                                            <span className="font-normal text-base leading-8 text-gray-500 whitespace-nowrap">
                                                Tam.: {product.size}
                                            </span>
                                            <span className="font-normal text-base leading-8 text-gray-500 whitespace-nowrap">
                                                Quant.: {product.quantity}
                                            </span>
                                        </div>
                                    ))
                                }
                            </h6>
                            <p className="font-normal text-base leading-8 text-gray-500 mb-8 whitespace-nowrap">
                                By: RUA 404
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                        <div className="flex flex-col justify-center items-start max-sm:items-center">
                            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                Status
                            </p>
                            <p className="font-semibold text-base leading-8 text-black-500 text-left whitespace-nowrap">
                                {statusText}
                            </p>
                        </div>
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

                <svg className="mt-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                    fill="none">
                    <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>

                <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                    <div className="flex max-sm:flex-col-reverse items-center">
                    </div>
                    <p className="py-6 font-medium text-xl leading-8 text-black max-sm:py-4">
                        <span className="text-gray-500">
                            Total:
                        </span> &nbsp;R${order.valorTotal}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-medium font-orbitron-regular mb-1">Pedidos</h2>
            </div>
            <main className="w-full">
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

            <svg className="mt-9 w-full" width="1216" height="0" viewBox="0 0 1216 2"
                fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" />
            </svg>
        </div>
    );
};

export default Orders;