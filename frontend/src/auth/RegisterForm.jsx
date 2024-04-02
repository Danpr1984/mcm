import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { baseURLClient } from "../App";

const RegisterForm = ({ setIsLoggingIn }) => {
  const { whoami, setIsAuthenticated } = useContext(AuthContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const navigate = useNavigate();

  async function submitRegistration(event) {
    event.preventDefault();

    try {
      const { data } = await baseURLClient.post("/api/register", {
        username: username,
        password: password,
        re_password: re_password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-100 w-full">
      <h1 className="mt-12 text-xl font-bold leading-tight md:text-2xl">
        Register your account
      </h1>

      <form className="mt-6" onSubmit={submitRegistration}>
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Email Address"
            className={`mt-2 w-full rounded-lg border ${
              errorMessages.username && "border-red-600"
            } bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none`}
            autoFocus
            autoComplete="true"
            required
          />
          {errorMessages.username && (
            <span className="text-xs font-semibold text-red-600">
              {errorMessages.username}
            </span>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`mt-2 w-full rounded-lg border ${
              errorMessages.password && "border-red-600"
            } bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none`}
            required
          />
          {errorMessages.password && (
            <span className="text-xs font-semibold text-red-600">
              {errorMessages.password}
            </span>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={re_password}
            onChange={(event) => setRePassword(event.target.value)}
            className={`mt-2 w-full rounded-lg border ${
              errorMessages.re_password && "border-red-600"
            } bg-gray-200 px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none`}
            required
          />
          {errorMessages.re_password && (
            <span className="text-xs font-semibold text-red-600">
              {errorMessages.re_password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 block w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold
          text-white hover:bg-indigo-400 focus:bg-indigo-400"
        >
          Register Now
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
          <span className="ml-4">Register in with Google</span>
        </div>
      </button>

      <p className="mt-8">
        Have an account?{" "}
        <button
          onClick={() => setIsLoggingIn(true)}
          className="font-semibold text-blue-500 hover:text-blue-700"
        >
          Log in now!
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
