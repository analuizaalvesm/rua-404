import { Address } from "./Address";

export type User = {
  customer_id: number;
  store_id?: number;
  first_name: string;
  last_name: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  email: string;
  address: Address;
  active: boolean;
  create_data?: string;
  last_update?: string;
  password?: string;
  recuperationCode?: string;
  dataSendCode?: string;
  loginToken?: string;
  code?: string;
  sendCode?: string;
  codeExpiration?: string;
  username?: string;
  token?: string;
  id?: number;
  profilePicture?: any;
  role: string | null;
};

export type UserProfile = {
  email: string;
};
