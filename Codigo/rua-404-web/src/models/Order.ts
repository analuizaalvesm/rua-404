import { Product } from "./Product";
import { User } from "./User";

export type Orders = {
    id: number;
    data: string;
    produtos: Product[];
    valorTotal: number;
    status: string;
    usuario: User;
  };
  
  export interface Order {
    id: number;
    data: string;
    produtos: Product[];
    valorTotal: number;
    status: string;
    usuario: User;
}