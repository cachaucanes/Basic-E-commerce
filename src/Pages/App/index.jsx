//Primero todo lo de react
import { useRoutes, BrowserRouter, HashRouter, Navigate } from "react-router-dom";
//Segundo las paginas
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import Navbar from "../../Components/Navbar";
import { ContextShoppingCard, ProviderShoppingCard } from "../../Context";
import { useContext } from "react";
//Tercero el css

const AppRoutes = () => {
  const context = useContext(ContextShoppingCard);
  const isAthenticate = !context.signOutState

  let routes = useRoutes([
    { path: "/", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/Basic-E-commerce", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/clothes", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/electronics", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/furnitures", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/toys", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },    

    { path: "/miscellaneous", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/shoes", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/tshirt", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/phone", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },        
    { path: "/furniture", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },        
    { path: "/nuevo", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },        

    { path: "/Others", element: isAthenticate ? <Home /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/my-account", element: isAthenticate ? <MyAccount /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/my-order/last", element: isAthenticate ? <MyOrder /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/my-order/:id", element: isAthenticate ? <MyOrder /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/my-orders", element: isAthenticate ? <MyOrders /> : <Navigate replace to={'/sign-in'} /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ProviderShoppingCard>
      <HashRouter>
        <Navbar />
        <AppRoutes />
      </HashRouter>
    </ProviderShoppingCard>
  );
};

export default App;
