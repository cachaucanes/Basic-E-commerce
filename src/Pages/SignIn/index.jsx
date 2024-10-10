import { useContext, useState } from "react";
import { InputForm } from "../../Components/InputForm";
import Layout from "../../Components/Layout";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ContextShoppingCard } from "../../Context";
import { useNavigate } from "react-router-dom";
import MyAccount from "../MyAccount";

function SignIn() {
  const context = useContext(ContextShoppingCard);
  const navigate = useNavigate();
  const [createAccount, setCreateAccount] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    context.setAccountState({
      ...context.accountState,
      [name]: value,
    });
  };

  
  const handleLogIn = (e) => {
    e.preventDefault();
    context.handleLogIn(context.accountState, navigate);
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center relative w-80 mb-6">
          {createAccount && (
            <ChevronLeftIcon
              onClick={() => setCreateAccount(false)}
              className="w-6 h-6 cursor-pointer text-black absolute left-0"
            />
          )}
          <h1 className="text-3xl font-bold ">
            {createAccount ? "SignUp" : "SignIn"}
          </h1>
        </div>

        <div className="mt-6 w-full flex justify-center">
          {!createAccount && (
            <form onSubmit={handleLogIn} className="w-80">
              <div className=" border-b border-gray-900/10 pb-12 ">
                <div className="mt-10 grid gap-x-6 gap-y-4 grid-cols-1 ">
                  <p className="text-red-600">{context.errorLogIn}</p>
                  <div className="col-span-1 w-full">
                    <InputForm
                      label="Email"
                      name="email"
                      type="email"
                      value={context.accountState.email}
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="col-span-1">
                    <InputForm
                      label="Password"
                      name="password"
                      type="password"
                      value={context.accountState.password}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  className="bg-black text-white py-3 w-full rounded-md mt-8"   
                  type="submit"               
                >
                  Log in
                </button>
                <p className="text-gray-500 underline text-center mt-4 underline-offset-4 ">Forgot my passwod</p>
                <button
                  className="border text-gray-500 py-3 w-full rounded-md mt-8"
                  onClick={() => setCreateAccount(true)}
                  type="button"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
          {createAccount && (
            <MyAccount showTitle={false} classDefault='mt-0' setCreateAccount={setCreateAccount} titleButton='Create'/>
          )}
        </div>
      </Layout>
    </>
  );
}

export default SignIn;
