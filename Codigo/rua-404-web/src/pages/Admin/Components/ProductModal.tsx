import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { Button } from "@/components/ui/Button/button";
import { ImageIcon } from "lucide-react";
import { FiChevronDown } from "react-icons/fi";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    name: string;
    productType: string;
    size: string;
    collab: string;
    price: number;
    quantity: number;
    url: string;
  };
  mode?: "add" | "edit";
};

const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {
    name: "",
    productType: "",
    size: "",
    collab: "",
    price: 0,
    quantity: 0,
    url: "",
  },
  mode = "add",
}: ProductModalProps) => {
  const [formData, setFormData] = React.useState(initialData);
  const [imagePreview, setImagePreview] = React.useState(initialData.url || "");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "price") {
      processedValue = parseFloat(value) || 0;
    } else if (name === "quantity") {
      processedValue = parseInt(value, 10) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (name === "url") {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Check if this contains the updated data
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Adicionar Novo Produto" : "Editar Produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome do produto"
                />
              </div>

              <div className="grid gap-2 relative">
                <Label htmlFor="productType">Categoria</Label>
                <div className="relative">
                  <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="block h-9 w-full px-3 font-regular border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  >
                    <option value="" disabled>
                      Selecione uma categoria
                    </option>
                    <option value="Print">Print</option>
                    <option value="Adesivo">Adesivo</option>
                    <option value="Camisa">Camisa</option>
                    <option value="Quadro">Quadro</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {/* Replace ChevronDown with your preferred icon */}
                    <FiChevronDown size={12} />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="size">Tamanhos</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Ex: P,M,G,GG"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="collab">Colaboração</Label>
                <Input
                  id="collab"
                  name="collab"
                  value={formData.collab}
                  onChange={handleChange}
                  placeholder="Nome da colaboração"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="url">URL da Imagem</Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="mt-4">
                <Label>Preview da Imagem</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-4 flex items-center justify-center h-48">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain rounded"
                      onError={() => setImagePreview("")}
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <ImageIcon size={48} />
                      <span className="mt-2">Sem imagem</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "add" ? "Adicionar" : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
