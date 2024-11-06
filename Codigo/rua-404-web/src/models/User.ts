export type User = {
  customer_id: number;
  store_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
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
};


export type UserProfile = {
  email: string;
};