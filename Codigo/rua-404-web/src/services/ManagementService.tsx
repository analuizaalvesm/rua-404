import axios from "axios";
import { handleError } from "../utils/handlers/ErrorHandler";
import { User } from "../models/User";

const api = "http://localhost:8080/";

export const getCodeApi = async (email: string) => {
    try {
        const data = await axios.post(api + "management/get-code", {
            email: email,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const validateCodeApi = async (code: string) => {
    try {
        const data = await axios.post<User>(api + "management/validate-code", {
            code: code,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const changePasswordApi = async (email: string, password: string) => {
    try {
        const data = await axios.post<User>(api + "management/change-password", {
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};