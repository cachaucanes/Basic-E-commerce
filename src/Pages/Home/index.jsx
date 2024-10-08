import { useContext } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import ProductDetail from "../../Components/ProductDetail";
import { ContextShoppingCard } from "../../Context";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";
import { FaceFrownIcon } from "@heroicons/react/16/solid";

function Home() {
  const context = useContext(ContextShoppingCard);

  const handleChange = (e) => {
    context.setSearchByTitle(e.target.value);
  };
  const handleChangeCategory = (e) => {  
    context.setCategory(e.target.value)    
  };
  const renderView = () => {
    let productsBy = "products";
    if (context.searchByTitle.length > 0 || context.category) productsBy = "filteredProducts";
    let notData = false;
    if (productsBy === "filteredProducts" && context[productsBy].length < 1) {
      notData = true;
      if(!context.category) productsBy = "products";      
    }

    return (
      <>
        {notData && (
          <h1 className="flex justify-center items-center text-2xl font-bold w-full text-red-300">
            We don't habe anything <FaceFrownIcon className="ml-2 h-6 w-6 text-red-300" />
          </h1>
        )}
        <div className="grid gap-4 grid-cols-3 w-full max-w-screen-lg mt-6">
          {context[productsBy].map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </div>
      </>
    );
  };  
  

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center w-90 relative mb-6">
          <h1 className="text-3xl font-bold ">Exclusive Products</h1>
        </div>
        <input
          type="text"
          placeholder="Search a product"
          className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
          value={context.searchByTitle}
          onChange={handleChange}
        />
        <select value={context.category} onChange={handleChangeCategory} name="" id="">
          <option value=''>Select Category</option>
          {
          context.productsCategory.map(item => (
            <option key={item} value={item}>{item}</option>
          ))
          }
        </select>
        {renderView()}
        {context.isProductDetailOpen && <ProductDetail />}
        {context.isCheckoutSideMenuOpen && <CheckoutSideMenu />}
      </Layout>
    </>
  );
}

export default Home;
