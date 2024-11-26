export type Order = {
  id: string;
  date: string;
  status: "Concluído" | "Pendente" | "Cancelado";
  total: number;
  items: number;
};

export type User = {
  customer_id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  create_data: string | null;
  status: "active" | "inactive" | "deactivated";
  orders?: Order[];
};
