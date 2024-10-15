import React from "react";

type SideBarProps = {
    categories: string[];
    selectedCategories: string[];
    handleCategoryChange: (category: string) => void;
    priceRange: number;
    setPriceRange: (price: number) => void;
};

const SideBar: React.FC<SideBarProps> = ({
    categories,
    selectedCategories,
    handleCategoryChange,
    priceRange,
    setPriceRange,
}) => {
  return (
    <aside className="w-full md:w-1/6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Categorias</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={category}
                name={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor={category} className="ml-2 text-sm">
                {category}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Faixa de Preço</h3>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm mt-1">Até R$ {priceRange * 10},00</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
