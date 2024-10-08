import { ChevronRightIcon, CalendarDateRangeIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";
import React from "react";

const OrdersCard = (props) => {
  const { totalPrice, totalProducts, date } = props;

  return (
    <div className="flex justify-between items-center mb-3 border border-black/15 p-4 w-full rounded-lg">
      <div className="flex justify-between w-full">
        <p className="flex flex-col">
          <span className="font-light flex items-center gap-1">
            <CalendarDateRangeIcon className="w-4 h-4"/>
            {date}
            </span>
          <span className="font-light flex items-center gap-1">
          <ShoppingBagIcon className="w-4 h-4"/>
            {`${totalProducts} articles`}             
            </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="w-6 h-6 cursor-pointer text-black" />
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
