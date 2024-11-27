import { Button } from "@/components/ui/Button/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/Card/card";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";
import { User } from "../Users/userTypes";

type DetailsModalProps = {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
};

const DetailsModal = ({ isOpen, user, onClose }: DetailsModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Pedidos do usuário</DialogTitle>
      </DialogHeader>
      {user && user.orders && (
        <div className="space-y-4">
          {user.orders.map((order) => (
            <Card
              key={order.id}
              className="border rounded-md h-auto gap-2 shadow-none"
            >
              <div className="flex justify-between items-center bg-gray-100 p-3">
                <span className="font-semibold text-gray-700">
                  Pedido #{order.id}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full items-center ${
                    order.status === "Concluído"
                      ? "bg-green-100 text-green-600 border border-green-200"
                      : order.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-600 border border-yellow-200"
                      : "bg-red-100 text-red-600 border border-red-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                <FiCalendar className="inline-block mr-1" />
                Data: {order.date}
              </div>
              <div className="text-sm text-gray-500 font-regular flex items-center px-3">
                <FiShoppingBag className="inline-block mr-1" />
                Itens: {order.items}
              </div>
              <div className="font-bold text-gray-900 pt-2 px-3 pb-3 border-t border-gray-100">
                Total:{" "}
                {order.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
      <DialogFooter>
        <Button
          variant="secondary"
          className="hover:bg-red-500 hover:text-white"
          onClick={onClose}
        >
          Fechar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DetailsModal;
