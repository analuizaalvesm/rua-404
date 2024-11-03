import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion/accordion";

type SideBarProps = {
  productType: readonly string[];
  sizes: readonly string[];
  collabs: readonly string[];
  maxPrice: number;
  selectedProductTypes: string[];
  handleProductTypeChange: (type: string) => void;
  selectedSizes: string[];
  handleSizeChange: (size: string) => void;
  selectedCollabs: string[];
  handleCollabChange: (collab: string) => void;
  priceRange: number;
  setPriceRange: React.Dispatch<React.SetStateAction<number>>;
};

const SideBar: React.FC<SideBarProps> = ({
  productType,
  maxPrice,
  sizes,
  collabs,
  selectedProductTypes,
  selectedSizes,
  selectedCollabs,
  handleProductTypeChange,
  handleSizeChange,
  handleCollabChange,
  priceRange,
  setPriceRange,
}) => {
  return (
    <aside className="w-full md:w-1/5">
      <div className="bg-white dark:bg-gray-800 shadow mb-4">
        <div className="mb-4">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["item-1", "item-2", "item-3"]}
          >
            <AccordionItem value="item-1" className="py-1">
              <AccordionTrigger>Tipo de Produto</AccordionTrigger>
              <AccordionContent>
                {productType.map((product) => (
                  <div key={product} className="flex items-center mt-2 px-4">
                    <input
                      type="checkbox"
                      id={product}
                      name={product}
                      value={product}
                      checked={selectedProductTypes.includes(product)}
                      onChange={() => handleProductTypeChange(product)}
                      className="h-4 w-4 border border-gray-300 rounded bg-gray-50 focus:ring-black focus:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 accent-black"
                    />
                    <label htmlFor={product} className="ml-2 text-sm">
                      {product}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="py-1">
              <AccordionTrigger>Tamanhos</AccordionTrigger>
              <AccordionContent>
                {sizes.map((size) => (
                  <div key={size} className="flex items-center mt-2 px-4">
                    <input
                      type="checkbox"
                      id={size}
                      name={size}
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      className="h-4 w-4 border border-gray-300 rounded bg-gray-50 focus:ring-black focus:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 accent-black"
                    />
                    <label htmlFor={size} className="ml-2 text-sm">
                      {size}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="py-1">
              <AccordionTrigger>Collabs</AccordionTrigger>
              <AccordionContent>
                {collabs.map((collab) => (
                  <div key={collab} className="flex items-center mt-2 px-4">
                    <input
                      type="checkbox"
                      id={collab}
                      name={collab}
                      value={collab}
                      checked={selectedCollabs.includes(collab)}
                      onChange={() => handleCollabChange(collab)}
                      className="h-4 w-4 border border-gray-300 rounded bg-gray-50 focus:ring-black focus:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 accent-black"
                    />
                    <label htmlFor={collab} className="ml-2 text-sm">
                      {collab}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mb-4 px-4 pb-4">
          <h3 className="text-sm font-medium">Faixa de Preço (BRL)</h3>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 range-thumb"
            />
            <p className="text-sm mt-1">Até R$ {priceRange},00</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
