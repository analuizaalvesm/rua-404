import { useState } from "react";
import { CircularProgress } from "@mui/material";

const CheckoutAddressForm = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    number: "",
    complemento: "",
  });

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setAddress((prev) => ({ ...prev, cep }));

    if (cep.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border border-gray-200 bg-white rounded-sm p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Endereço de Entrega
      </h2>

      <form className="space-y-5">
        {/* CEP Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CEP
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              name="cep"
              maxLength={8}
              placeholder="00000-000"
              value={address.cep}
              onChange={handleCepChange}
              className="block w-full p-2 pr-8 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                <CircularProgress
                  size={16}
                  className="text-gray-700 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Address Fields */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rua
            </label>
            <input
              type="text"
              name="rua"
              placeholder="Nome da rua"
              value={address.rua}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Número
            </label>
            <input
              type="text"
              name="number"
              placeholder="Número"
              value={address.number}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Additional Address Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bairro
            </label>
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={address.bairro}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Complemento
            </label>
            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              value={address.complemento}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={address.cidade}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                placeholder="Estado"
                value={address.estado}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-sm sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutAddressForm;
