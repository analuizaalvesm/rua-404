import { useState } from "react";
import { Link } from "react-router-dom";
import UserOne from "@/assets/images/blue_dog.jpg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover/popover";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

interface DropdownUserProps {
  name?: string | null;
  logout?: () => void;
}

const DropdownUser = ({ name, logout }: DropdownUserProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center gap-4">
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {name}
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
          <button
            onClick={logout}
            className="flex items-center px-2 pt-4 pb-0 gap-2 text-sm text-red-500 bg-white font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <FiLogOut size={16} />
            Sair
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DropdownUser;
