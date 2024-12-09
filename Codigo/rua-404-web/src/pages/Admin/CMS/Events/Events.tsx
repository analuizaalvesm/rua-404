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
import { EventFormType } from "../types";
import axios from "axios";
import { Label } from "@radix-ui/react-label";

const Events = () => {
  const [formData, setFormData] = useState<EventFormType>({
    idEvento: 0,
    name: "",
    texto: "",
    url: "",
    imgUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEditing) {
      await updateEvent(formData);
    } else {
      await createEvent(formData);
    }
    resetForm();
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/cms/listar-eventos`
      );
      setItems(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (data: EventFormType) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/cms/salvar-eventos?idEvento=0&name=${data.name}&texto=${data.texto}&url=${data.url}&imgUrl=${data.imgUrl}`
      );
      await fetchEvents();
      setError(null);
    } catch (err: any) {
      console.error("Create Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (data: EventFormType) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/api/cms/atualizar-eventos?idEvento=${data.idEvento}&name=${data.name}&texto=${data.texto}&url=${data.url}&imgUrl=${data.imgUrl}`
      );
      await fetchEvents();
      setError(null);
    } catch (err: any) {
      console.error("Update Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8080/api/cms/deletar-eventos?id=${id}`
      );
      await fetchEvents();
      setError(null);
    } catch (err: any) {
      console.error("Delete Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: any) => {
    setFormData(event);
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({ idEvento: 0, name: "", texto: "", url: "", imgUrl: "" });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <CardHeader className="bg-white border border-gray-200 mb-5 items-start p-4 rounded-sm">
        <CardTitle className="font-medium">Gerenciar Eventos</CardTitle>
      </CardHeader>
      <Card className="p-4 mb-5 rounded-sm">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label htmlFor="name" className="text-sm">
              Nome
            </Label>
            <Input
              placeholder="Nome do evento"
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

            <Label htmlFor="description" className="text-sm">
              Descrição
            </Label>
            <Input
              placeholder="URL"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full !mt-1 !mb-2"
            />
            <Label htmlFor="imgUrl" className="text-sm">
              URL da Imagem
            </Label>
            <Input
              placeholder="URL da Imagem"
              value={formData.imgUrl}
              onChange={(e) =>
                setFormData({ ...formData, imgUrl: e.target.value })
              }
              className="w-full !mt-1"
            />
            <div className="flex space-x-2">
              <Button type="submit">
                {isEditing ? "Atualizar" : "Criar"} Evento
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
                <TableHead>Imagem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>URL</TableHead>
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
                items.map((event: EventFormType) => (
                  <TableRow
                    key={event.idEvento}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      {event.imgUrl ? (
                        <img
                          src={event.imgUrl}
                          alt={event.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "Sem imagem"
                      )}
                    </TableCell>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.texto}</TableCell>
                    <TableCell>
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {event.url}
                      </a>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(event)}
                          className="text-sm"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            event.idEvento && deleteEvent(event.idEvento)
                          }
                          className="text-sm"
                        >
                          Deletar
                        </Button>
                      </div>
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

export default Events;
