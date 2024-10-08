import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useContext } from "react";
import { ContextShoppingCard } from "../../Context";

const OrderCard = props => {
    const context = useContext(ContextShoppingCard);
    const { title, imageUrl, price, id, showDelete=true} = props

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">        
          <img className="w-full h-full object-cover rounded-lg" src={imageUrl} alt={title} />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">${price}</p>
          {showDelete && <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.handleRemoveOrderCart(id)}
          />}
      </div>
    </div>
  );
};

export default OrderCard;
