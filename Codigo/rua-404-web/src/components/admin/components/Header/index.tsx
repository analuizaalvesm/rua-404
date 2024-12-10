import { Link } from "react-router-dom";
import DropdownUser from "../Dropdowns/DropdownUser";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "@/context/useAuth";
import { User } from "@/models/User";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/ProfileService";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("user?.email", user?.email);
        const userData = await getUserProfile(user?.email || "");
        if (userData) {
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white shadow drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-3 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-black">
              <span className="text-white font-bold text-xl">R</span>
            </div>
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <button className="bg-transparent p-0">
                  <FiSearch size={20} color={"#000"} />
                </button>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  className="w-full bg-transparent pl-6 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
          <DropdownUser
            name={
              `${userData?.first_name ?? ""} ${
                userData?.last_name ?? ""
              }`.trim() || "Administrador"
            }
            logout={logout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
