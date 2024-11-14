import { useState } from "react";
import { Link } from "react-router-dom";
import UserOne from "@/assets/images/blue_dog.jpg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover/popover";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center gap-4">
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              Lucas Pires
            </span>
            <span className="block text-xs text-gray-500">Administrador</span>
          </span>

          <span className="h-12 w-12">
            <img src={UserOne} alt="User" className="rounded-full" />
          </span>
          <FiChevronDown size={20} color={"#000"} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-[3/6]"
      >
        <div>
          <ul className="flex flex-col gap-4 px-2 pb-4 border-b border-stroke dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FiUser size={16} />
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FiSettings size={16} />
                Configurações
              </Link>
            </li>
          </ul>
          <button className="flex items-center px-2 pt-4 pb-0 gap-2 text-sm text-red-500 bg-white font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <FiLogOut size={16} />
            Sair
          </button>
        </div>
      </PopoverContent>
    </Popover>

    // <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
    //   <Link
    //     onClick={() => setDropdownOpen(!dropdownOpen)}
    //     className="flex items-center gap-4"
    //     to="#"
    //   >
    // <span className="hidden text-right lg:block">
    //   <span className="block text-sm font-medium text-black dark:text-white">
    //     Lucas Pires
    //   </span>
    //   <span className="block text-xs">Administrador</span>
    // </span>

    // <span className="h-12 w-12 rounded-full">
    //   <img src={UserOne} alt="User" />
    // </span>

    //     <svg
    //       className="hidden fill-current sm:block"
    //       width="12"
    //       height="8"
    //       viewBox="0 0 12 8"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         clipRule="evenodd"
    //         d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
    //         fill=""
    //       />
    //     </svg>
    //   </Link>

    //   {/* <!-- Dropdown Start --> */}
    //   {dropdownOpen && (
    //     <div
    //       className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
    //     >
    //     </div>
    //   )}
    //   {/* <!-- Dropdown End --> */}
    // </ClickOutside>
  );
};

export default DropdownUser;
