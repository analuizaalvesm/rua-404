import React from "react";
import { FaChevronRight } from "react-icons/fa6";

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
          onClick={proceedToCheckout}
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

      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700 text-center">
          Meios de Pagamento
        </p>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg/1200px-Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg.png" // Substitua pelo caminho da imagem do Pix
            alt="Pagamento por Pix"
            className="w-16 items-center justify-center mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
