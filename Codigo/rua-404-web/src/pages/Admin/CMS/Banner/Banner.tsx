import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import axios from "axios";
import { Label } from "@/components/ui/Label/label";
import { BannerFormData } from "../types";

const Banner = () => {
  const [formData, setFormData] = useState<BannerFormData>({
    id: 0,
    texto: "",
    descricao: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState<String>("");

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/cms/listar-banners`
      );
      setItems(response.data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBanner = async (data: BannerFormData) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/cms/salvar-banner?id=0&texto=${data.texto}&descricao=${data.descricao}`
      );
      fetchBanner();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBanner = async (data: BannerFormData) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/cms/atualizar-banner?id=${data.id}&texto=${data.texto}&descricao=${data.descricao}`
      );
      fetchBanner();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollection = async (id: number) => {
    console.log(id);
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8080/api/cms/deletarBanner?id=${id}`
      );
      fetchBanner();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isEditing && items.length >= 1) {
      setError("Apenas um banner pode ser criado. Edite o banner existente.");
      return;
    }
    if (isEditing) {
      await updateBanner(formData);
    } else {
      await createBanner(formData);
    }
    resetForm();
  };

  const handleEdit = (collection: any) => {
    setFormData(collection);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: 0, texto: "", descricao: "" });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <CardHeader className="bg-white border border-gray-200 mb-5 items-start p-4 rounded-sm">
        <CardTitle className="font-medium">Gerenciar Banner</CardTitle>
      </CardHeader>
      <Card className="p-4 mb-5 rounded-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Label htmlFor="name" className="text-sm">
              Nome
            </Label>
            <Input
              placeholder="Nome da coleção"
              value={formData.texto}
              onChange={(e) =>
                setFormData({ ...formData, texto: e.target.value })
              }
              className="w-full !mt-1 !mb-2"
            />

            <Label htmlFor="description" className="text-sm">
              Descrição
            </Label>
            <textarea
              placeholder="Descrição"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              className="w-full !mt-1 p-3 border rounded-lg resize-none focus:ring-2 text-sm focus:ring-blue-500"
              rows={2}
            />
            <div className="flex space-x-2">
              <Button type="submit">
                {isEditing ? "Atualizar" : "Criar"} Coleção
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          </form>
        </CardContent>
      </Card>

      <Card className="p-4 rounded-sm">
        <CardContent>
          <Table className="w-full">
            <TableHeader className="bg-gray-100 text-gray-700">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Nenhum dado encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((banner: BannerFormData) => (
                  <TableRow key={banner.id}>
                    <TableCell>{banner.texto}</TableCell>
                    <TableCell>{banner.descricao}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(banner)}
                        className="text-sm"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => banner.id && deleteCollection(banner.id)}
                        className="text-sm"
                      >
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Banner;
