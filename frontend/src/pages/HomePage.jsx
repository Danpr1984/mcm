import { useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const HomePage = () => {
  const [loginForm, setLoginForm] = useState(true);
  return (
    <section className="flex h-[calc(100vh-64px)] flex-col items-center justify-center bg-indigo-600 p-1 md:flex-row lg:p-0">
      <div className="hidden w-full md:w-1/2 lg:block xl:w-2/3">
        <img
          src="images/colourwheel.png"
          alt=""
          className="g mx-auto flex max-h-[calc(100vh-64px)] object-cover"
        />
      </div>

      <div
        className="mx-auto flex w-full items-center justify-center rounded-lg bg-white px-6 pb-6 md:w-1/2 md:max-w-md lg:h-full lg:max-w-full lg:rounded-none
        lg:px-16 xl:w-1/3 xl:px-12"
      >
        {loginForm ? (
          <LoginForm setLoginForm={setLoginForm} />
        ) : (
          <RegisterForm setLoginForm={setLoginForm} />
        )}
      </div>
    </section>
  );
};

export default HomePage;
