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
import { CollectionFormType } from "../types";
import axios from "axios";
import { Label } from "@/components/ui/Label/label";

const Colecoes = () => {
  const [formData, setFormData] = useState<CollectionFormType>({
    id: 0,
    name: "",
    texto: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/cms/listar-colecoes`
      );
      setItems(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (data: CollectionFormType) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/cms/salvar-colecoes?id=0&name=${data.name}&texto=${data.texto}`
      );
      fetchCollections();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCollection = async (data: CollectionFormType) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/cms/atualizar-colecoes?id=${data.id}&name=${data.name}&texto=${data.texto}`
      );
      fetchCollections();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCollection = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8080/api/cms/deletar-colecoes?id=${id}`
      );
      fetchCollections();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEditing) {
      await updateCollection(formData);
    } else {
      await createCollection(formData);
    }
    resetForm();
  };

  const handleEdit = (collection: any) => {
    setFormData(collection);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ id: 0, name: "", texto: "" });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CardHeader className="bg-white border border-gray-200 mb-5 items-start p-4 rounded-sm">
        <CardTitle className="font-medium">Gerenciar Coleções</CardTitle>
      </CardHeader>
      <Card className="p-4 mb-5 rounded-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Label htmlFor="name" className="text-sm">
              Nome
            </Label>
            <Input
              placeholder="Nome da coleção"
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
                {isEditing ? "Atualizar" : "Criar"} Coleção
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
                items.map((collection: CollectionFormType) => (
                  <TableRow key={collection.id}>
                    <TableCell>{collection.name}</TableCell>
                    <TableCell>{collection.texto}</TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(collection)}
                        className="text-sm"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          collection.id && deleteCollection(collection.id)
                        }
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

export default Colecoes;
