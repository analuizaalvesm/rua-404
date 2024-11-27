import { useEffect, useState } from "react";
import {
  deleteUserProfile,
  getAllUsersProfile,
} from "../../../services/ProfileService";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/Table/table";
import { Button } from "@/components/ui/Button/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/DropdownMenu/dropdown-menu";
import { Card, CardTitle } from "@/components/ui/Card/card";
import { Trash2 } from "lucide-react";
import { BiShoppingBag } from "react-icons/bi";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import DeleteModal from "../Components/DeleteModal";
import DetailsModal from "../Components/DetailsModal";
import PaginationControl from "../Components/PaginationControl";
import { User, Order } from "./userTypes";

const ITEMS_PER_PAGE = 10;

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<string>("Mais antigo");

  useEffect(() => {
    fetchUsers();
  }, []);

  const generateMockOrders = (count: number): Order[] => {
    const statuses = ["Concluído", "Pendente", "Cancelado"];
    return Array.from(
      { length: count },
      (_, i): Order => ({
        id: `${1000 + i}`,
        date: new Date(
          Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
        ).toLocaleDateString("pt-BR"),
        status: statuses[
          Math.floor(Math.random() * statuses.length)
        ] as Order["status"],
        total: parseFloat((Math.random() * 500 + 20).toFixed(2)),
        items: Math.floor(Math.random() * 10) + 1,
      })
    );
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getAllUsersProfile();
      if (data) {
        const usersWithStatus = data.map((user: User) => ({
          ...user,
          status: "active",
          orders: generateMockOrders(3),
        }));
        setUsers(usersWithStatus);
        setFilteredUsers(usersWithStatus);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        (user.first_name && user.first_name.toLowerCase().includes(query)) ||
        (user.last_name && user.last_name.toLowerCase().includes(query)) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleDeleteUser = async () => {
    if (userToDelete !== null) {
      const success = await deleteUserProfile(userToDelete);
      if (success) {
        fetchUsers();
      }
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const openDeleteModal = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (user: User) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Data não disponível";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      switch (criteria) {
        case "A-Z":
          return (a.first_name || "").localeCompare(b.first_name || "");
        case "Z-A":
          return (b.first_name || "").localeCompare(a.first_name || "");
        case "Mais recente":
          return (b.customer_id || 0) - (a.customer_id || 0);
        case "Mais antigo":
          return (a.customer_id || 0) - (b.customer_id || 0);
        default:
          return 0;
      }
    });

    setFilteredUsers(sortedUsers);
  };

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="max-w-full">
      <section>
        <div>
          <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
          <div className="mb-4 flex gap-4 justify-between w-full">
            <div className="flex flex-col w-1/3">
              <div className="flex gap-2 items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Pesquisar por nome ou email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-sm w-full p-2 pl-10 border border-gray-200 rounded-md shadow-sm"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-primary text-white font-regular text-sm rounded-md px-3 py-2 border border-black"
                >
                  Pesquisar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-10 text-gray-600 font-regular"
                    >
                      {sortCriteria}
                      <FiChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-44 font-regular"
                  >
                    <DropdownMenuItem onClick={() => handleSort("A-Z")}>
                      Nome (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("Z-A")}>
                      Nome (Z-A)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSort("Mais recente")}
                    >
                      Mais recente
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("Mais antigo")}>
                      Mais antigo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-10 text-gray-600 font-regular"
                    >
                      Status
                      <FiChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-44 font-regular"
                  >
                    <DropdownMenuItem
                      onClick={() => console.log("aqui vai filtrar por status")}
                    >
                      Ativo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("aqui vai filtrar por status")}
                    >
                      Inativo
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <main>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : currentUsers.length > 0 ? (
              <>
                <Card className="px-6 pt-6 pb-3 rounded-lg border-none bg-white">
                  <div className="pb-4">
                    <CardTitle className="font-semibold">
                      Todos os usuários{" "}
                      <span className="font-regular text-gray-500">
                        ({users.length})
                      </span>
                    </CardTitle>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell className="font-semibold text-gray-600 pl-4 bg-gray-50 rounded-tl-md">
                          ID
                        </TableCell>
                        <TableCell className="font-semibold text-gray-600 bg-gray-50">
                          Nome
                        </TableCell>
                        <TableCell className="font-semibold text-gray-600 bg-gray-50">
                          Email
                        </TableCell>
                        <TableCell className="font-semibold text-gray-600 bg-gray-50">
                          Data de Criação
                        </TableCell>
                        <TableCell className="font-semibold text-gray-600 bg-gray-50">
                          Status
                        </TableCell>
                        <TableCell className="font-semibold text-gray-600 pr-4 bg-gray-50 text-right rounded-tr-md">
                          Ações
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((user) => (
                        <TableRow key={user.customer_id}>
                          <TableCell>
                            <div className="pl-2 py-2 text-gray-400">
                              {user.customer_id}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{formatDate(user.create_data)}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-600"
                                  : user.status === "inactive"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {user.status === "active"
                                ? "Ativo"
                                : user.status === "inactive"
                                ? "Inativo"
                                : "Desativado"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                className="shadow-none rounded-sm"
                                variant="outline"
                                size="sm"
                                onClick={() => openDetailsModal(user)}
                              >
                                <BiShoppingBag className="h-4 w-4" />
                              </Button>
                              <Button
                                className="shadow-none rounded-sm"
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  openDeleteModal(user.customer_id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
                <PaginationControl
                  startIndex={startIndex}
                  endIndex={endIndex}
                  filteredUsers={filteredUsers}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  type="usuários"
                />
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum usuário encontrado.</p>
              </div>
            )}
          </main>
        </div>
      </section>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteUser}
        type="usuário"
      />

      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
