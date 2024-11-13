import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover/popover";
import { FiShoppingCart } from "react-icons/fi";

interface CartItem {
  id: number;
  nomeProduto: string;
  valorTotal: number;
  valorPorProduto: number;
  quantidade: number;
  status: string;
  url: string;
}

interface CartDropdownProps {
  cartItems: CartItem[];
  cartCount: number;
}

const CartDropdown = ({ cartItems, cartCount }: CartDropdownProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getFinalPrice = () => {
    return cartItems
      .reduce((acc, item) => acc + item.valorPorProduto * item.quantidade, 0)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  };

  useEffect(() => {
    setIsPopoverOpen(false);
  }, [location]);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center relative cursor-pointer hover:bg-[#fafafa] px-2 py-1 rounded-lg">
          <FiShoppingCart size={20} />
          <span className="pl-2">{cartCount}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-[350px]"
      >
        <div className="max-h-64 overflow-y-auto">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2.5 cursor-pointer hover:bg-[#fafafa] ${
                    index !== cartItems.length - 1 && "border-b border-gray-200"
                  }`}
                  onClick={() => navigate(`/shopping-cart`)}
                >
                  <img
                    src={item.url || "https://via.placeholder.com/150"}
                    alt={item.nomeProduto}
                    className="w-20 h-20 rounded-sm"
                  />
                  <div className="pl-3">
                    <p className="text-xs font-regular text-gray-400">
                      {item.quantidade} unidade(s)
                    </p>
                    <p className="font-semibold text-sm line-clamp-2">
                      {item.nomeProduto}
                    </p>
                    <p className="text-sm font-regular text-gray-500">
                      {item.valorPorProduto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center font-regular text-gray-500">
              Seu carrinho está vazio!
            </p>
          )}
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={() => navigate("/shopping-cart")}
            className="mt-4 w-full bg-black text-white font-medium text-sm py-2.5 rounded-sm text-center"
          >
            Finalizar compra - {getFinalPrice()}
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default CartDropdown;
