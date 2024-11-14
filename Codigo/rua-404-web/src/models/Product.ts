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
  id: number;
  name: string;
  productType: string;
  size: string;
  collab: string;
  price: number;
  quantity: number;
  lastUpdated: string;
  url: string;
}