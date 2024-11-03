import { Button } from "@/components/ui/Button/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full mb-4 pt-6">
      <div className="text-left mb-2 md:mb-0 hidden md:block">
        <p className="text-lg leading-8 font-semibold">Filtros</p>
      </div>
      <div className="flex items-center w-full md:w-1/4">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          className="flex-1 text-sm border border-gray-300 p-2 rounded-none h-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <Button
          className="ml-2 rounded-none h-10 flex items-center"
          onClick={handleSearch}
        >
          Pesquisar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
