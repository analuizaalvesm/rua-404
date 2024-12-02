import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";
import { Address } from "../models/Address";

const api = "http://localhost:8080/auth/";
const customerApi = "http://localhost:8080/customer/";
const addressApi = "http://localhost:8080/endereco";

export const getUserProfile = async (email: String) => {
  console.log("email", email);
  try {
    const response = await axios.get<User>(`${api}${email}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserProfile = async (user: User) => {
  try {
    const response = await axios.put(`${customerApi}${user.customer_id}`, user);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUserProfile = async (customerId: number) => {
  try {
    await axios.delete(`${customerApi}${customerId}`);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
};

export const getAllUsersProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/customer`);
    return response.data;
  } catch (error) {
    handleError(error);
    return false;
  }
};

export const deleteUser = async (customerId: number) => {
  try {
    await axios.delete(`${customerApi}${customerId}`);
    return true;
  } catch (error) {
    handleError(error);
    return false;
  }
}

export const createAddress = async (customerId: number, address: Address) => {
  try {
    const response = await axios.post(`${addressApi}?idCliente=${customerId}`, address);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export const getAddress = async (customerId: number) => {
  try {
    const response = await axios.get(`${addressApi}?idCliente=${customerId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export const updateAddress = async (customerId: number, address: Address) => {
  try {
    const response = await axios.put(`${addressApi}?idCliente=${customerId}`, address);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}