import React, { useContext } from "react";
import { ContextShoppingCard } from "../../Context";
import { CheckIcon, PlusIcon } from "@heroicons/react/16/solid";

function Card(item) {
  const context = useContext(ContextShoppingCard);

  const showProduct = () => {
    context.openProductDetail();
    context.setProductShow(item);
  };

  const renderIcon = () => {
    const isInCart = context.cartProducts.find(cartProduct => cartProduct.id === item.id  )
    return (
      <div
        onClick={(e) => {
          e.stopPropagation()
          if(isInCart?.id) return false
          context.addProductToCart(e, item)}
        }
        className="absolute right-0 top-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
      >
        {isInCart?.id ?
        <CheckIcon className="h-6 w-6" color='green'/>
        :
        <PlusIcon className="h-6 w-6" /> 
        }
      </div>
    );
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={showProduct}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {item.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={item.images.length > 1 ? item.images[0] : item.category.image}
          alt="headphones"
        />
        {renderIcon()}
      </figure>
      <p className="flex justify-between items-center">
        <span className="text-sm font-light">{item.title}</span>
        <span className="text-lg font-medium">${item.price}</span>
      </p>
    </div>
  );
}

export default Card;
