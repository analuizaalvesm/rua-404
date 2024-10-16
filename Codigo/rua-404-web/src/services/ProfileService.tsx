import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";

const api = "http://localhost:8080/customer/";

export const getUserProfile = async (id: string) => {
  try {
    const response = await axios.get<User>(`${api}${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};