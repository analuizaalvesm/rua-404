export type Admin = {
  admin_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  active: boolean;
  create_data: string;
  last_update: string;
  token: string;
  id: number;
  profilePicture: any;
};

export type AdminProfile = {
  email: string;
};
