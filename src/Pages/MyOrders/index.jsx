import { useContext } from "react";
import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";
import { ContextShoppingCard } from "../../Context";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

function MyOrders() {
  const context = useContext(ContextShoppingCard);

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center w-90 relative mb-6">          
          <h1 className="text-3xl font-bold ">My Orders</h1>
        </div>
        {context.order.map((order, i) => (
          <Link to={`/my-order/${i}`} key={i} className="w-96">
            <OrdersCard {...order} />
          </Link>
        ))}
      </Layout>
    </>
  );
}

export default MyOrders;
