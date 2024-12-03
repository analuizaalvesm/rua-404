import { useState } from "react";
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
import { CommonFormType } from "../types";
import axios from "axios";
import { Label } from "@/components/ui/Label/label";

const Collabs = () => {
  const [formData, setFormData] = useState<CommonFormType>({
    id: 0,
    name: "",
    texto: "",
    url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEditing) {
      await updateCollab(formData);
    } else {
      await createCollab(formData);
    }
    resetForm();
  };

  const fetchCollabs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/cms/listar-collabs`
      );
      setItems(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCollab = async (data: CommonFormType) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/cms/salvar-collabs?id=0&name=${data.name}&texto=${data.texto}`
      );
      fetchCollabs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCollab = async (data: CommonFormType) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/cms/atualizar-collabs?id=${data.id}&name=${data.name}&texto=${data.texto}`
      );
      fetchCollabs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollab = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8080/api/cms/deletar-collabs?id=${id}`
      );
      fetchCollabs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collab: any) => {
    setFormData(collab);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: 0, name: "", texto: "", url: "" });
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CardHeader className="bg-white border border-gray-200 mb-5 items-start p-4 rounded-sm">
        <CardTitle className="font-medium">Gerenciar Colaborações</CardTitle>
      </CardHeader>
      <Card className="p-4 mb-5 rounded-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Label htmlFor="name" className="text-sm">
              Nome
            </Label>
            <Input
              placeholder="Nome da colaboração"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full !mt-1 !mb-2"
            />

            <Label htmlFor="description" className="text-sm">
              Descrição
            </Label>
            <textarea
              placeholder="Descrição"
              value={formData.texto}
              onChange={(e) =>
                setFormData({ ...formData, texto: e.target.value })
              }
              className="w-full !mt-1 p-3 border rounded-lg resize-none focus:ring-2 text-sm focus:ring-blue-500"
              rows={2}
            />
            <div className="flex space-x-2">
              <Button type="submit">
                {isEditing ? "Atualizar" : "Criar"} Collab
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              )}
            </div>
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
                items.map((collab: CommonFormType) => (
                  <TableRow key={collab.id}>
                    <TableCell>{collab.name}</TableCell>
                    <TableCell>{collab.texto}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(collab)}
                        className="text-sm"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => collab.id && deleteCollab(collab.id)}
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

export default Collabs;
