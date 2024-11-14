import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";

const api = "http://localhost:8080/auth/";
const customerApi = "http://localhost:8080/customer/";

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