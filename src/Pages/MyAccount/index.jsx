import { useContext } from "react";
import { InputForm } from "../../Components/InputForm";
import Layout from "../../Components/Layout";
import { ContextShoppingCard } from "../../Context";
import { useNavigate } from "react-router-dom";

function MyAccount({showTitle=true, classDefault, setCreateAccount=false, titleButton='Save' }) {
  const context = useContext(ContextShoppingCard);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    context.setAccountState({
      ...context.accountState,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    context.handleSingUp(context.accountState);
    if(setCreateAccount) setCreateAccount(false);
    navigate("/");
  };
  return (
    <>
      <Layout classDefault={classDefault}>
        {showTitle && <h1 className="text-3xl font-bold ">MyAccount</h1>}
        <div className="mt-6">
        <form onSubmit={handleSubmit} className="w-80">
              <div className=" border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <InputForm
                      label="Username"
                      name="username"
                      value={context.accountState.username}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <InputForm
                      label="Email"
                      name="email"
                      type="email"
                      value={context.accountState.email}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <InputForm
                      label="Password"
                      name="password"
                      type="password"
                      value={context.accountState.password}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        value={context.accountState.country}
                        onChange={handleChange}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="colombia">Colombia</option>
                        <option value="united States">United States</option>
                        <option value="canada">Canada</option>
                        <option value="mexico">Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-black text-white py-3 w-full rounded-md mt-8"
                  //onClick={context.handleCheckout}
                >
                  {titleButton}
                </button>
              </div>
            </form>
        </div>
      </Layout>
    </>
  );
}

export default MyAccount;
