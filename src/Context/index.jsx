import React, { createContext, useEffect, useState } from "react";
import { totalPrice } from "../utils";

export const ContextShoppingCard = createContext();

export const ProviderShoppingCard = ({ children }) => {
  //Init account and signIn
  const [signOutState, setSignOutState] = useState(false);
  const initialStateAccount = {
    username: "",
    email: "",
    password: "",
    country: "colombia",
  };
  const [accountState, setAccountState] = useState(initialStateAccount);
  const signOut = localStorage.getItem("sign-out");
  const account = localStorage.getItem("account");
  const [errorLogIn, setErrorLogIn] = useState("");

  if (!signOut || !account) {
    localStorage.setItem("account", JSON.stringify(initialStateAccount));
    localStorage.setItem("sign-out", JSON.stringify(true));
  }

  const handleSingOut = () => {
    localStorage.setItem("sign-out", JSON.stringify(true));
    setSignOutState(true);
  };
  const handleSingUp = (account_) => {
    localStorage.setItem("account", JSON.stringify(account_));
    localStorage.setItem("sign-out", JSON.stringify(false));
    setAccountState(account_);
    setSignOutState(false);
    setErrorLogIn("");
  };

  const handleLogIn = (data, navigate) => {
    if (!data.email || !data.password) {
      setErrorLogIn("Fill in the fields.");
      return false;
    }

    let accountLocalStorage = localStorage.getItem("account");
    const parseAccount = JSON.parse(accountLocalStorage);

    if (!parseAccount?.email) {
      setErrorLogIn("The email is not registered.");
      return false;
    }

    if (data.email.toLowerCase() === parseAccount.email.toLowerCase()) {
      if (data.password === parseAccount.password) {
        setSignOutState(false);
        setErrorLogIn("");
        localStorage.setItem("sign-out", JSON.stringify(false));
        setSignOutState(false);
        navigate("/");
      } else {
        setErrorLogIn("The password is incorrect.");
        return false;
      }
    } else {
      setErrorLogIn("The email is not registered.");
      return false;
    }
  };

  useEffect(() => {
    if (signOut || account) {
      setSignOutState(JSON.parse(signOut));
      setAccountState(JSON.parse(account));
    }
  }, []);

  //Product detail - Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => {
    setIsCheckoutSideMenuOpen(false);
    setIsProductDetailOpen(true);
  };
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //Checkout Side Menu - Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  //Product detail - show product
  const [productShow, setProductShow] = useState({});

  // Shopping Cart - Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  const addProductToCart = (e, productSelected) => {
    e.stopPropagation();
    setCartProducts([...cartProducts, productSelected]);
    setIsProductDetailOpen();
    openCheckoutSideMenu();
  };

  const handleRemoveOrderCart = (id_order) => {
    const indexProduct = cartProducts.findIndex((item) => item.id === id_order);
    if (indexProduct == -1) return false;
    const newProducts = [...cartProducts];
    newProducts.splice(indexProduct, 1);

    setCartProducts(newProducts);
  };

  //Shoppig cart - order
  const [order, setOrder] = useState([]);

  const handleCheckout = () => {
    const orderToAdd = {
      // date: new Date().toDateString(),
      // date: new Date().toLocaleDateString("es-CO", {hour: 'numeric'}),
      date: new Date().toLocaleDateString("es-CO", {
        hour: "numeric",
        minute: "numeric",
      }),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };
    setOrder([...order, orderToAdd]);
    setCartProducts([]);
  };

  // Get products
  const API = "https://api.escuelajs.co/api/v1";
  const [products, setProducts] = useState([]);
  const productsCategory = products
    .map((item) => item.category.name)
    .reduce((accumulator, currentValue) => {
      let existValue = accumulator.find((item) => item === currentValue);
      if (!existValue) {
        return [...accumulator, currentValue];
      }
      return accumulator;
    }, []);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`${API}/products`);
      const data = await response.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState("");
  const [category, setCategory] = useState("");

  const filteredItemsByTitle = (products, searchByTitle, _category) => {
    return products.filter((item) => {
      if (_category) {
        if (
          item.category.name.toLowerCase() === _category.toLowerCase() &&
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        ) {
          return true;
        }
        return false;
      }
      return item.title.toLowerCase().includes(searchByTitle.toLowerCase());
    });
  };

  useEffect(() => {
    if (searchByTitle || category)
      setFilteredProducts(
        filteredItemsByTitle(products, searchByTitle, category)
      );
  }, [products, searchByTitle, category]);

  return (
    <ContextShoppingCard.Provider
      value={{
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productShow,
        setProductShow,
        cartProducts,
        addProductToCart,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        handleRemoveOrderCart,
        order,
        handleCheckout,
        products,
        setProducts,
        searchByTitle,
        setSearchByTitle,
        filteredProducts,
        setCategory,
        category,
        productsCategory,
        signOutState,
        accountState,
        setAccountState,
        handleSingOut,
        handleSingUp,
        handleLogIn,
        errorLogIn,
      }}
    >
      {children}
    </ContextShoppingCard.Provider>
  );
};
