import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/Table/table";
import { Button } from "@/components/ui/Button/button";
import { BiShoppingBag } from "react-icons/bi";
import { Trash2 } from "lucide-react";
import { User } from "../Users/userTypes";

type UserTableProps = {
  users: User[];
  onDelete: (userId: number) => void;
  onDetails: (user: User) => void;
  currentPage: number;
  itemsPerPage: number;
};

const UserTable = ({
  users,
  onDelete,
  onDetails,
  currentPage,
  itemsPerPage,
}: UserTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Data de Criação</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentUsers.map((user) => (
          <TableRow key={user.customer_id}>
            <TableCell>{user.customer_id}</TableCell>
            <TableCell>
              {user.first_name} {user.last_name}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {new Date(user.create_data || "").toLocaleDateString()}
            </TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="sm" onClick={() => onDetails(user)}>
                  <BiShoppingBag />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(user.customer_id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
