import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./useAuth";
import axios from "axios";

interface CartItem {
  id: number;
  nomeProduto: string;
  valorTotal: number;
  valorPorProduto: number;
  quantidade: number;
  status: string;
  url: string;
  productType: string;
  size: string;
  collab: string;
}

interface Product {
  name: string;
  productType: string;
  size: string;
  collab: string;
  price: number;
  url: string;
  lastUpdated: any;
}

interface CartContextType {
  cartItems: CartItem[];
  updateQuantity: (id: number, newQuantity: number) => Promise<void>;
  removeItem: (id: number) => void;
  cartCount: number;
  addProductToCart: (product: Product, quantity: number) => Promise<void>;
  closeCart: (idCart: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { userId } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/carrinho`, {
        params: { id: userId },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      const url = `http://localhost:8080/carrinho?quantidade=${newQuantity}&idCarrinho=${id}`;
      await axios.put(url, null, {
        params: { id: userId },
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantidade: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating item quantity:", error);
      throw error;
    }
  };

  const findExistingCartItem = (product: Product): CartItem | undefined => {
    return cartItems.find((item) => item.nomeProduto === product.name);
  };

  const addProductToCart = async (product: Product, quantity: number) => {
    try {
      const existingItem = findExistingCartItem(product);
      console.log("sadjhasdjsadhjasdhasdjasdh", existingItem);
      if (existingItem) {
        const newQuantity = existingItem.quantidade + quantity;
        await updateQuantity(existingItem.id, newQuantity);
      } else {
        await axios.post(
          `http://localhost:8080/carrinho`,
          {
            name: product.name,
            productType: product.productType,
            size: product.size,
            collab: product.collab,
            price: product.price,
            url: product.url,
            lastUpdated: product.lastUpdated,
            quantity: quantity,
          },
          {
            params: { id: userId },
          }
        );
      }
      await fetchCartItems();
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
    }
  };

  const removeItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/carrinho`, {
        params: { id },
      });
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantidade,
    0
  );

  const closeCart = async () => {
    try {
      await axios.post(`http://localhost:8080/carrinho/fecharCarrinho`, null, {
        params: { id: userId },
      });
      setCartItems([]);
    } catch (error) {
      console.error("Error closing cart:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateQuantity,
        removeItem,
        cartCount,
        addProductToCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
