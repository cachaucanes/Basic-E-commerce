import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextShoppingCard } from "../../Context";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";

const toUpperOrLower = (lowerOrUpper, item) => {
  const textofilter = `${item.slice(0, 1)[lowerOrUpper]()}${item.slice(1)}`;
  return textofilter;
};

const ItemNav = (item) => {
  const textofilter = item.filter && toUpperOrLower("toUpperCase", item.name);

  return (
    <li>
      <NavLink
        to={item.to}
        onClick={() => {
          if(item.filter){
            item.context.setCategory(textofilter)
          }
          else if(item.onClick){
            item.onClick()
          }
        }}
        className={`capitalize ${({ isActive }) =>
          isActive ? "underline underline-offset-8" : ""}`
        }
      >
        {item.name}
      </NavLink>
    </li>
  );
};
const Navbar = () => {
  const context = useContext(ContextShoppingCard);
  const itemsLeft = context.productsCategory.map((item) => ({
    name: item,
    to: `/${toUpperOrLower("toLowerCase", item)}`,
    filter: true,
  }));

  const isAuth = () => {
    if(!context.signOutState) return { name: "SignOut", to: "/sign-in",  onClick: () => context.handleSingOut() }
    return { name: "SignIn", to: "/sign-in"}
  }

  const itemsRight = [
    { name: "My Orders", to: "/my-orders" },
    { name: "My Account", to: "/my-account" },
    isAuth(),
    
    
  ];
  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "underline underline-offset-8" : ""
            }
            to="/"
            onClick={() => context.setCategory('')}
          >
            All
          </NavLink>
        </li>
        {itemsLeft.map((item, index) => (
          <ItemNav {...item} key={index} context={context} />
        ))}
      </ul>
      <ul className="flex items-center  gap-3">
        <li className="text-black/60">cachauca@gmail.com</li>
        {itemsRight.map((item, index) => (
          <ItemNav {...item} key={index} context={context} />
        ))}
        <li onClick={context.openCheckoutSideMenu} className="text-black/60 flex items-center cursor-pointer">
          <ShoppingBagIcon className="h-6 w-6" />
          {context.cartProducts.length}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
