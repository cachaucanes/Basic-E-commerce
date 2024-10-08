//Primero todo lo de react
import { useRoutes, BrowserRouter } from "react-router-dom";
//Segundo las paginas
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import Navbar from "../../Components/Navbar";
import { ProviderShoppingCard } from "../../Context";
//Tercero el css

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/Basic-E-commerce", element: <Home /> },
    { path: "/clothes", element: <Home /> },
    { path: "/electronics", element: <Home /> },
    { path: "/furnitures", element: <Home /> },
    { path: "/toys", element: <Home /> },    

    { path: "/miscellaneous", element: <Home /> },
    { path: "/shoes", element: <Home /> },
    { path: "/tshirt", element: <Home /> },
    { path: "/phone", element: <Home /> },        
    { path: "/furniture", element: <Home /> },        

    { path: "/Others", element: <Home /> },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order/last", element: <MyOrder /> },
    { path: "/my-order/:id", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ProviderShoppingCard>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ProviderShoppingCard>
  );
};

export default App;
