import React from "react";
import { Calendar, ShoppingBag, User, MapPin, DollarSign } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card/card";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select/select";
import { Separator } from "@/components/ui/Separator/separator";
import "./OrderCard.css";
import { Order } from "@/models/Order";

// Types
export interface Product {
  id: string;
  name: string;
  quantity: number;
  size: string;
}

export interface Address {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Usuario {
  first_name: string;
  last_name: string;
  email: string;
  telefone: string;
  address: Address | null;
}

const formatData = (data: string) => {
  const date = new Date(data);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const OrderCard: React.FC<{
  order: Order;
  handleStatusChange: (orderId: number, status: string) => void;
}> = ({ order, handleStatusChange }) => {
  const getStatusColors = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200";
      case "PRONTO":
        return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200";
      case "ENVIADO":
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200";
      case "ENTREGUE":
        return "bg-green-100 text-green-700 border-green-200 hover:bg-green-200";
      case "CANCELADO":
        return "bg-red-100 text-red-700 border-red-200 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200";
    }
  };

  return (
    <Card className="order-card w-full mx-auto overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4 px-6 border-b border-gray-200">
        <div className="w-full flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Pedido #{order.id}</h3>
          <div>
            <Select
              defaultValue={order.status}
              onValueChange={(value) => handleStatusChange(order.id, value)}
            >
              <SelectTrigger
                className={cn(
                  "h-7 px-3 py-1 text-xs rounded-full border",
                  getStatusColors(order.status)
                )}
              >
                <SelectValue placeholder={order.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDENTE">PENDENTE</SelectItem>
                <SelectItem value="PRONTO">PRONTO</SelectItem>
                <SelectItem value="ENVIADO">ENVIADO</SelectItem>
                <SelectItem value="ENTREGUE">ENTREGUE</SelectItem>
                <SelectItem value="CANCELADO">CANCELADO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-4 space-y-4">
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span>Data: {formatData(order.data)}</span>
        </div>

        <div className="flex text-sm text-gray-600">
          <ShoppingBag
            size={16}
            className="text-gray-400 mt-1 mr-2 flex-shrink-0"
          />
          <div className="w-full">
            <div className="font-medium mb-1">Itens:</div>
            <ul className="space-y-1 pl-2">
              {order.produtos.map((product) => (
                <li key={product.id} className="flex items-start">
                  <span className="text-gray-800">
                    {product.quantity} - {product.size} - {product.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
            Dados da Entrega
          </div>

          <div className="flex items-start text-sm text-gray-600 gap-2">
            <User size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <span className="font-medium text-gray-800">
                {order.usuario.first_name} {order.usuario.last_name}
              </span>
              <div className="text-gray-500">{order.usuario.email}</div>
              <div className="text-gray-500">{order.usuario.telefone}</div>
            </div>
          </div>

          <div className="flex items-start text-sm text-gray-600 gap-2">
            <MapPin size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            <div>
              {order.usuario.address === null ? (
                <span className="text-gray-500 italic">
                  Endereço não cadastrado
                </span>
              ) : (
                <>
                  <div className="text-gray-800">
                    {order.usuario.address.rua}, {order.usuario.address.numero}
                    {order.usuario.address.complemento &&
                      `, ${order.usuario.address.complemento}`}
                  </div>
                  <div className="text-gray-500">
                    {order.usuario.address.bairro}
                  </div>
                  <div className="text-gray-500">
                    {order.usuario.address.cidade}/
                    {order.usuario.address.estado} - CEP:{" "}
                    {order.usuario.address.cep}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex items-center">
          <DollarSign size={18} className="mr-1 text-gray-500" />
          <span className="font-bold text-gray-900">
            {order.valorTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
