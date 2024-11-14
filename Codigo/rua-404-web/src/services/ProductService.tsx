// src/services/ProductService.ts

import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { Product } from "../models/Product";

const api = "http://localhost:8080/";

export const getProductsApi = async (): Promise<Product[] | void> => {
  try {
    const response = await axios.get<Product[]>(`${api}products`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductByIdApi = async (productId: number): Promise<Product | void> => {
  try {
    const response = await axios.get<Product>(`${api}products/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProductApi = async (productId: number, updatedProduct: Product): Promise<Product | void> => {
  try {
    const response = await axios.put<Product>(`${api}products/${productId}`, updatedProduct);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProductApi = async (newProduct: Omit<Product, "id">): Promise<Product | void> => {
  try {
    const response = await axios.post<Product>(`${api}products`, newProduct);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProductApi = async (productId: number): Promise<void> => {
  try {
    await axios.delete(`${api}products/${productId}`);
  } catch (error) {
    handleError(error);
  }
};
