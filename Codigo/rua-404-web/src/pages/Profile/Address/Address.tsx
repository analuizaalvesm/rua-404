import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/ProfileService";
import { useAuth } from "@/context/useAuth";
import { User } from "@/models/User";
import { CircularProgress } from "@mui/material";

const Address = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [address, setAddress] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    number: "",
    complemento: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile(user?.email || "");
        if (userData) {
          setUserData(userData);
          setEditableUser({ ...userData });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleCepChange = async (e: any) => {
    const cep = e.target.value;
    setAddress((prev) => ({ ...prev, cep }));

    if (cep.length === 8) {
      setLoading(true);
      try {
        const response = await new Promise<Response>((resolve, reject) => {
          setTimeout(async () => {
            try {
              const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
              resolve(res);
            } catch (error) {
              reject(error);
            }
          }, 1000);
        });

        const data = await response.json();
        if (!data.erro) {
          setAddress({
            cep,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            number: "",
            complemento: "",
          });
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Endereço</h1>
        <p className="text-sm text-gray-500 font-regular">
          Gerencie as informações do seu endereço. Os dados serão utilizados
          para entrega dos pedidos.
        </p>
      </div>
      <form className="space-y-5">
        <div className="w-3/6 pr-1">
          <label className="block text-sm font-medium">CEP</label>
          <div className="relative mt-1 w-full">
            <input
              type="text"
              name="cep"
              placeholder="00000-000"
              value={address.cep}
              onChange={handleCepChange}
              className="block w-full p-2 pr-8 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
              maxLength={8}
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <CircularProgress
                  size={16}
                  style={{
                    color: "#000",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="w-4/6">
            <label className="block text-sm font-medium">Rua</label>
            <input
              type="text"
              name="rua"
              placeholder="Nome da rua"
              value={address.rua}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
            />
          </div>
          <div className="w-2/6">
            <label className="block text-sm font-medium">Número</label>
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={address.number}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Bairro</label>
          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={address.bairro}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
          />
        </div>
        <div className="w-3/6 pr-1">
          <label className="block text-sm font-medium">Complemento</label>
          <input
            type="text"
            name="complemento"
            placeholder="Complemento"
            value={address.complemento}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
          />
        </div>
        <div className="flex flex-row space-x-2">
          <div className="w-3/6">
            <label className="block text-sm font-medium">Cidade</label>
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={address.cidade}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
            />
          </div>
          <div className="w-3/6">
            <label className="block text-sm font-medium">Estado</label>
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={address.estado}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 pt-2">
          <button
            type="submit"
            onClick={() => console.log("Salvar endereço")}
            className="bg-black text-white text-sm px-6 py-2.5 rounded-sm hover:bg-gray-800"
          >
            Salvar
          </button>
          <button
            type="submit"
            onClick={() => console.log("Descartar alterações")}
            className="text-red-500 text-sm px-2 py-2 bg-transparent hover:underline"
          >
            Descartar alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
