import { Button } from "@/components/ui/Button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const products = [
  {
    id: 1,
    name: "Produto 1",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 1.",
  },
  {
    id: 2,
    name: "Produto 2",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 2.",
  },
  {
    id: 3,
    name: "Produto 3",
    price: "$39.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 3.",
  },
  {
    id: 4,
    name: "Produto 1",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 1.",
  },
  {
    id: 5,
    name: "Produto 2",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 2.",
  },
  {
    id: 6,
    name: "Produto 3",
    price: "$39.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 3.",
  },
  {
    id: 7,
    name: "Produto 1",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 1.",
  },
  {
    id: 8,
    name: "Produto 2",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 2.",
  },
  {
    id: 9,
    name: "Produto 3",
    price: "$39.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 3.",
  },
  {
    id: 10,
    name: "Produto 1",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 1.",
  },
  {
    id: 11,
    name: "Produto 2",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 2.",
  },
  {
    id: 12,
    name: "Produto 3",
    price: "$39.99",
    image: "https://via.placeholder.com/150",
    description: "Descrição do produto 3.",
  },
];

const StorePage = (props: Props) => {
  return (
    <div className="w-screen">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-center py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card className={cn("w-[380px]")} {...props}>
                <CardHeader>
                  <img src={product.image} alt={product.name} />
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold mt-2">{product.price}</p>
                </CardContent>
                <CardFooter>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150">
                    Adicionar ao Carrinho
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;
