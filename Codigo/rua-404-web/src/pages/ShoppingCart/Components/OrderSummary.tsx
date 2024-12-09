import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { CheckCheckIcon } from "lucide-react";

type OrderSummaryProps = {
  summary: {
    subtotal: number;
    pickup: number;
    tax: number;
    total: number;
  };
  applyVoucher: (e: React.FormEvent<HTMLFormElement>) => void;
  proceedToCheckout: () => void;
};

const OrderSummary = ({
  summary,
  applyVoucher,
  proceedToCheckout,
}: OrderSummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);
    setIsModalOpen(true);

    // Simulating an API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);

      // Navigate to the other screen after a short delay
      setTimeout(() => {
        setIsModalOpen(false);
        proceedToCheckout(); // Navigate to the other screen
      }, 2000); // Delay for the green check display
    }, 3000); // Simulate loading for 3 seconds
  };

  return (
    <>
      <div className="space-y-4 rounded-sm border border-gray-200 bg-[#fdfdfd] p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Resumo do pedido
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Produtos
              </dt>
              <dd className="text-base font-normal text-gray-600 dark:text-white">
                {summary.subtotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Taxa de entrega
              </dt>
              <dd className="text-base font-normal text-gray-600 dark:text-white">
                {summary.tax.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Subtotal
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              {summary.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </dd>
          </dl>
        </div>

        <div className="space-y-4 rounded-sm border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <form className="space-y-4" onSubmit={applyVoucher}>
            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Tem cupom de desconto?
              </label>
              <div className="flex flex-row items-center space-x-2">
                <input
                  type="text"
                  id="voucher"
                  className="block w-2/3 rounded-sm border border-gray-300 bg-[#fafafa] p-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Código de cupom"
                />
                <button
                  type="submit"
                  className="flex w-1/3 items-center justify-center rounded-sm bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </form>
        </div>

        <button
          onClick={handleCheckout}
          className="flex w-full items-center justify-center rounded-sm bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Finalizar compra
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ou
          </span>
          <a
            href="/store"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
          >
            Continuar comprando
            <FaChevronRight size={10} />
          </a>
        </div>
      </div>

      {/* Modal for order confirmation */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center justify-center space-y-4 p-8 font-regular">
          {isLoading ? (
            <>
              <CircularProgress size={48} color="inherit" />
              <p className="text-gray-700 dark:text-white">
                Estamos finalizando o seu pedido...
              </p>
            </>
          ) : isComplete ? (
            <>
              <div className="text-green-500">
                <CheckCheckIcon size={48} />
              </div>
              <p className="text-gray-700 dark:text-white">
                Pedido finalizado com sucesso!
              </p>
            </>
          ) : null}
        </div>
      </Dialog>
    </>
  );
};

export default OrderSummary;
