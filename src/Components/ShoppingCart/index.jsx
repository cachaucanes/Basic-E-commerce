import React, { useContext } from "react";
import { ContextShoppingCard } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";

const ShoppingCart = () => {

    const context = useContext(ContextShoppingCard);

  return (
    <div
      onClick={context.openCheckoutSideMenu}
      className="text-black/60 flex items-center cursor-pointer"
    >
      <ShoppingBagIcon className="h-6 w-6" />
      {context.cartProducts.length}
    </div>
  );
};

export { ShoppingCart };
