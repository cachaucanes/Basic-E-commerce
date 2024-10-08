import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useContext } from "react";
import "./styles.css";
import { ContextShoppingCard } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";
import { Link } from "react-router-dom";

const CheckoutSideMenu = () => {
  const context = useContext(ContextShoppingCard);

  return (
    <aside className="checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white">
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <XMarkIcon
          className="h-6 w-6 text-black cursor-pointer"
          onClick={context.closeCheckoutSideMenu}
        />
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imageUrl={
              product.images.length > 1
                ? product.images[0]
                : product.category.image
            }
            price={product.price}
            id={product.id}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        {/* <Link to="/my-order/last"> */}
        <Link to={`/my-order/${context.order.length}`}>
          <button
            className="bg-sky-500 py-3 w-full rounded-md"
            onClick={context.handleCheckout}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
