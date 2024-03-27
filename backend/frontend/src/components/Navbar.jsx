import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { baseURLClient } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { userImage } = useContext(AudioContext);

  const { user } = useContext(AuthContext);

  async function submitLogout(e) {
    e.preventDefault();

    try {
      await baseURLClient.post("/api/logout", { withCredentials: true });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="h-[64px] border-gray-200 bg-indigo-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/images/colourwheel.png"
            className="h-8"
            alt="Colourwheel Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">
            ColourWheel
          </span>
        </div>
        <div
          className="group relative flex items-center space-x-3 rtl:space-x-reverse md:order-2 md:space-x-0"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="me-1 capitalize text-white">{user?.username}</span>
          <div
            className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
            id="user-menu-button"
          >
            <span className="sr-only">Open user menu</span>

            <img
              className="h-8 w-8 rounded-full"
              src={userImage}
              alt="user photo"
            />
          </div>
          {user && (
            <div
              className="absolute z-50 my-4 hidden list-none divide-y divide-gray-100 whitespace-nowrap rounded-lg bg-white text-base shadow group-hover:block dark:divide-gray-600 dark:bg-gray-700"
              id="user-dropdown"
            >
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <button
                    onClick={submitLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col rounded-lg p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0  md:p-0">
            <li>
              <Link
                to="/"
                className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/dashboard"
                  className="block rounded px-3 py-2 text-white hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
