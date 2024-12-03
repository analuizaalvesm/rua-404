import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Order } from "@/models/Order";
import { FaArrowLeft } from "react-icons/fa6";

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

    const formatData = (data: string) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    interface StepperProps {}

    const Stepper: React.FC<StepperProps> = () => {
        return (
            <div>
                <ol className="flex items-center w-full mb-4 sm:mb-5">
                    <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                            <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                            </svg>
                        </div>
                    </li>
                    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                            <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                            </svg>
                        </div>
                    </li>
                    <li className="flex items-center w-full">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                            <svg className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                            </svg>
                        </div>
                    </li>
                </ol>
                <form action="#">
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Invoice details</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username.example" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="confirm-password" id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Next Step: Payment Info
                    </button>
                </form>
            </div>
        );
    };

    const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
        const handleCancelButtonClick = () => {
            navigate(`/`);
        }

        return (
            <div>
                < Stepper />

            </div>
        );
    };

    return (
        <div className="mb-12">
            <div className="mb-6">
                <h2 className="text-xl font-medium font-orbitron-regular mb-1">Pedido #{orderId}</h2>
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
                                            <FaArrowLeft color="#fff" size={14} />
                                            Ajuda
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