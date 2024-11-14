import { NavLink, useLocation } from "react-router-dom";

const Orders = () => {
  const location = useLocation();
  const { pathname } = location;

    return (
      <div>
            <div className="max-w-xl">
                <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
                    <ul className="flex max-sm:flex-col sm:items-center gap-x-10 gap-y-3">
                        <li className="cursor-pointer">
                            <label
                                htmlFor="pedidos"
                                className="text-sm font-medium text-gray-700 leading-8 transition-all duration-500 hover:text-black hover:underline underline"
                            >
                                Pedidos
                            </label>
                        </li>
                        <li>
                          <NavLink
                            to="/admin/orders/not-sent"
                            className={`text-sm font-medium text-gray-700 leading-8 transition-all duration-500 hover:text-black hover:underline ${
                              pathname.includes("/admin/orders/not-sent")
                            }`}
                          >
                            Ainda não enviado
                          </NavLink>
                        </li>
                        <li>
                            <label
                                htmlFor="cancelados"
                                className="text-sm font-medium text-gray-700 leading-8 transition-all duration-500 hover:text-black hover:underline"
                            >
                                Pedidos cancelados
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <div className="mt-7 border border-gray-300 pt-9">
                    <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                        <div className="data">
                            <p className="font-medium text-lg leading-4 text-black whitespace-nowrap">
                                Pedido: #11232988
                            </p>
                            <p className="font-medium text-lg leading-4 text-black mt-3 whitespace-nowrap">
                                Data: 18 de março 2024
                            </p>
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
                                <h6 className="text-xl font-semibold mb-1 leading-9 text-black mb-3 whitespace-nowrap">
                                    Adesivo XPTO
                                </h6>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
                                  <p>Dados destinatário</p>
                                  <p>Nome: João da Silva</p>
                                  <p>Endereço: Rua sete, 10 - Centro, Belo Horizonte/MG </p>
                                  <p>CEP: 30.100-50</p>
                                  <p>Telefone: (31) 99999-9999</p>
                                </p>
                                <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                        Tamanho: P
                                    </span>
                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                        Quant: 100
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                    Status
                                </p>
                                <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
                                    A enviar
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                    Enviar até
                                </p>
                                <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                                    23 de março de 2024
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
                            </span> &nbsp;R$160.00
                        </p>
                    </div>
                </div>

                <div className="mt-7 border border-gray-300 pt-9">
                    <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                        <div className="data">
                            <p className="font-medium text-lg leading-4 text-black whitespace-nowrap">
                                Pedido: #10234987
                            </p>
                            <p className="font-medium text-lg leading-4 text-black mt-3 whitespace-nowrap">
                                Data: 9 de abril 2024
                            </p>
                        </div>
                    </div>

                    <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                        fill="none">
                        <path d="M0 1H1216" stroke="#D1D5DB" />
                    </svg>

                    <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                        <div className="grid grid-cols-4 w-full">
                            <div className="col-span-4 sm:col-span-1">
                                <img className="h-24 w-24 rounded-sm object-cover" src="https://placehold.co/80x80/EEE/31343C" alt="PC system All in One APPLE iMac (2023) mqrq3ro/a"></img>
                            </div>
                            <div
                                className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                <h6 className="text-xl font-semibold mb-1 leading-9 text-black mb-3 whitespace-nowrap">
                                    Adesivo XYZ
                                </h6>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
                                  <p>Dados destinatário</p>
                                  <p>Nome: João da Silva</p>
                                  <p>Endereço: Rua sete, 10 - Centro, Belo Horizonte/MG </p>
                                  <p>CEP: 30.100-50</p>
                                  <p>Telefone: (31) 99999-9999</p>
                                </p>
                                <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                        Tamanho: P
                                    </span>
                                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                        Quant: 100
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                    Status
                                </p>
                                <p className="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">
                                    Cancelado
                                </p>
                            </div>
                            <div className="flex flex-col justify-center items-start max-sm:items-center">
                                <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                    Enviar até
                                </p>
                                <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                                    -
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
                            </span> &nbsp;R$150.00
                        </p>
                    </div>
                </div>

                <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                </svg>
            </div>
        </div>
    );
  };
  
  export default Orders;