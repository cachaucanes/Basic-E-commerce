import { useContext } from "react";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { ContextShoppingCard } from "../../Context";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Link, useLocation } from "react-router-dom";

function MyOrder() {
  const context = useContext(ContextShoppingCard);
  const location = useLocation()
  const currenPath = window.location.pathname
  const idOrder = location.pathname.split('/').slice(-1)  
    
  return (
    <>
      <Layout>
        <div className="flex items-center justify-center relative w-96 mb-6">
          <Link to="/my-orders" className="absolute left-0">
            <ChevronLeftIcon className="w-6 h-6 cursor-pointer text-black" />
          </Link>
          <h1 className="text-3xl font-bold ">My Order</h1>
        </div>
        <div className="flex flex-col w-96">
          {context?.order?.[idOrder]?.products.map((product) => (
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
              showDelete={false}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default MyOrder;
