import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QrCodePix } from "qrcode-pix";

interface CartItem {
  id: number;
  nomeProduto: string;
  quantidade: number;
  valorPorProduto: number;
  url: string;
}

interface Summary {
  subtotal: number;
  total: number;
}

interface CheckoutState {
  cartItems: CartItem[];
  summary: Summary;
}

const Checkout = (): JSX.Element => {
  const { state } = useLocation();
  const { cartItems, summary } = state as CheckoutState;

  const [qrCode, setQrCode] = useState<string>("");
  const [rawPix, setRawPix] = useState<string>("");

  useEffect(() => {
    async function generatePixCode() {
      const qrCodePix = QrCodePix({
        version: "01",
        key: "47d2aa41-d663-44d2-8008-2e573adfb138",
        value: summary.total,
        city: "Belo Horizonte",
        name: "Ana Luiza Machado Alves",
      });

      setRawPix(qrCodePix.payload());
      setQrCode(await qrCodePix.base64());
    }

    generatePixCode();
  }, [summary.total]);

  return (
    <section className="bg-[#fafafa] border-t border-gray-200 py-8 dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="space-y-2">
          <h2 className="text-xl font-orbitron-semibold text-gray-900 dark:text-white sm:text-2xl">
            Seu pedido foi realizado com sucesso!
          </h2>
          <p className="text-gray-600">
            O pagamento deve ser feito via PIX. Escaneie o QR Code ou copie o
            código abaixo e cuidaremos do resto.
          </p>
        </div>

        <div className="mt-4 sm:mt-6 md:gap-6 lg:flex lg:items-start xl:gap-6">
          <div className="w-full lg:max-w-2xl xl:max-w-2xl">
            <div className="border border-gray-200 bg-[#fdfdfd] rounded-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Itens do Carrinho ({cartItems.length} itens)
              </h3>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center pt-4 ${
                    index === cartItems.length - 1
                      ? ""
                      : "border-b border-gray-200 pb-4"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.nomeProduto}
                    className="w-24 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-xl text-gray-900 dark:text-white">
                      {item.nomeProduto}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-300">
                      Quantidade: {item.quantidade}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300">
                      Preço Unitário:{" "}
                      {item.valorPorProduto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-gray-200 bg-[#fdfdfd] rounded-sm p-4 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Resumo do Pedido
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <p
                      key={item.id}
                      className="flex justify-between text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-gray-600">
                        {item.nomeProduto}
                        <span className="text-sm text-gray-400 pl-2">
                          ({item.quantidade} unidade{item.quantidade > 1 && "s"}
                          )
                        </span>
                      </span>
                      <span>
                        {(
                          item.valorPorProduto * item.quantidade
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </p>
                  ))}
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Taxa de entrega
                    </dt>
                    <dd className="text-base font-normal text-gray-600 dark:text-white">
                      {summary.total - summary.subtotal > 0
                        ? (summary.total - summary.subtotal).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )
                        : "Grátis"}
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
            </div>
          </div>

          <div className="w-full mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            {/* PIX Payment */}
            <div className="border border-gray-200 bg-[#fdfdfd] rounded-sm p-4 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Pague com PIX
              </h3>
              {qrCode ? (
                <>
                  <img
                    src={qrCode}
                    alt="QR Code PIX"
                    className="w-48 h-48 mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Escaneie o QR Code ou copie o código abaixo para pagar:
                  </p>
                  <p className="bg-gray-100 dark:bg-gray-800 text-xs p-2 rounded overflow-x-auto text-gray-700 dark:text-gray-300">
                    {rawPix}
                  </p>
                </>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  Carregando QR Code...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
