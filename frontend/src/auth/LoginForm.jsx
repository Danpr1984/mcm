import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = ({ setLoginForm }) => {
  const { csrf, setIsAuthenticated, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  const login = async (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(isResponseOk)
      .then((data) => {
        const { user } = data;
        setIsAuthenticated(true);
        setUser(user);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-100 w-full">
      <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
        Log in to your account
      </h1>

      <form className="mt-6" onSubmit={login}>
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Email Address"
            className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border bg-gray-200 px-4 py-3 focus:border-blue-500
            focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="mt-2 text-right">
          <p className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
            Forgot Password?
          </p>
        </div>

        <button
          type="submit"
          className="mt-6 block w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold
          text-white hover:bg-indigo-400 focus:bg-indigo-400"
        >
          Log In
        </button>
      </form>

      <hr className="my-6 w-full border-gray-300" />

      <button
        type="button"
        className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 hover:cursor-not-allowed hover:bg-gray-100 focus:cursor-not-allowed focus:bg-gray-100"
        disabled
      >
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            className="h-6 w-6"
            viewBox="0 0 48 48"
          >
            <defs>
              <path
                id="a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              />
            </defs>
            <clipPath id="b">
              <use xlinkHref="#a" overflow="visible" />
            </clipPath>
            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
            <path
              clipPath="url(#b)"
              fill="#EA4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#34A853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#4285F4"
              d="M48 48L17 24l-4-3 35-10z"
            />
          </svg>
          <span className="ml-4">Log in with Google</span>
        </div>
      </button>

      <p className="mt-8">
        Need an account?{" "}
        <button
          onClick={() => setLoginForm(false)}
          className="font-semibold text-blue-500 hover:text-blue-700"
        >
          Create an account
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
