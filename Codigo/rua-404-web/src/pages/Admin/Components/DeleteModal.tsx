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
  type?: string;
};

const DeleteModal = ({ isOpen, onClose, onDelete, type }: DeleteModalProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader className="gap-2">
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogDescription className="font-regular w-[70%]">
          Tem certeza que deseja excluir este {type}? Esta ação não pode ser
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
