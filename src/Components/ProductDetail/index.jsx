import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useContext } from "react";
import "./styles.css";
import { ContextShoppingCard } from "../../Context";

const ProductDetail = () => {
  const context = useContext(ContextShoppingCard);  

  return (
    <aside className="product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white">
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <XMarkIcon
          className="h-6 w-6 text-black cursor-pointer"
          onClick={context.closeProductDetail}
        />
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={(context.productShow.images.length > 1) ? context.productShow.images[0] : context.productShow.category.image}
          alt={context.productShow.title}
        />
      </figure>
      <p className="flex flex-col p-6 overflow-y-scroll">
        <span className="font-medium text-2xl mb-2">${context.productShow.price}</span>
        <span className="font-medium text-md">{context.productShow.title}</span>
        <span className="font-light text-sm">{context.productShow.description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
