import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";

const api = "http://localhost:8080/auth/";
const customerApi = "http://localhost:8080/customer/";

export const getUserProfile = async (email: String) => {
  try {
    console.log("getUserProfile", email);
    const response = await axios.get<User>(`${api}${email}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserProfile = async (user: User) => {
  console.log("porque", user);
  try {
    const response = await axios.put(`${customerApi}${user.customer_id}`, user);
    console.log("caraio", response.data);
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
