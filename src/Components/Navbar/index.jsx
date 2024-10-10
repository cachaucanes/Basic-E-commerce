import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextShoppingCard } from "../../Context";
import { ShoppingCart } from "../ShoppingCart";

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
        className={({ isActive }) =>
          isActive ? "underline underline-offset-8 capitalize" : "capitalize"}
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
    if(!context.signOutState) return { name: "SignOut", to: "/sign-in",  onClick: () => context.handleSingOut(), hide:false }
    return { name: "SignIn", to: "/sign-in", hide: false}
  }

  const itemsRight = [
    { name: "My Orders", to: "/my-orders", hide: context.signOutState },
    { name: "My Account", to: "/my-account", hide: context.signOutState},
    isAuth(),
    
    
  ];
  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink style={{textDecoration: 'none'}} to="/">Shopi</NavLink>
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
        {!context.signOutState && <li className="text-black/60">{context.accountState.email}</li>}
        {itemsRight.map((item, index) => !item.hide && (<ItemNav {...item} key={index} context={context} />))}
        <ShoppingCart/>
      </ul>
    </nav>
  );
};

export default Navbar;
