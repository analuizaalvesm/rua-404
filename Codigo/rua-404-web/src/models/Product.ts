export type Products = {
  id: number;
  name: string;
  productType: string;
  size: string;
  collab: string;
  price: number;
  quantity: number;
  lastUpdated: number[];
  url: string;
};

export interface Product {
  name: string;
  id: number;
  nome: string;
  productType: string;
  size: string;
  collab: string;
  price: number;
  quantity: number;
  lastUpdated: string;
  url: string;
}
