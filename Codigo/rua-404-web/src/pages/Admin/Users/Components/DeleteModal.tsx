import { Button } from "@/components/ui/Button/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir este usuário? Esta ação não pode ser
          desfeita.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteModal;
