import { useState } from "react";
import { products, defaultProducts } from "./products";
import ProductSection from "./Components/ProductSection";
import CartItem from "./Components/CartItem";
import OrderSummary from "./Components/OrderSummary";
import CartTable from "./Components/CartTable";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(products);

  const calculateSummary = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const savings = 0;
    const pickup = 0;
    const tax = 0;
    const total = subtotal - savings + pickup + tax;

    return {
      subtotal,
      savings,
      pickup,
      tax,
      total,
    };
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const summary = calculateSummary();

  return (
    <section className="bg-[#fafafa] border-t border-gray-200 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-orbitron-semibold text-gray-900 dark:text-white sm:text-2xl">
          Carrinho{" "}
          <b className="text-[16px] font-regular">
            ({cartItems.length} produtos)
          </b>
        </h2>

        <div className="mt-4 sm:mt-2 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="border border-gray-200 bg-white rounded-sm p-4">
              <CartTable
                items={cartItems}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
              {/* {cartItems.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))} */}
            </div>
            <ProductSection products={defaultProducts} />
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <OrderSummary
              summary={summary}
              applyVoucher={() => console.log("apply voucher")}
              proceedToCheckout={() => console.log("proceed")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
