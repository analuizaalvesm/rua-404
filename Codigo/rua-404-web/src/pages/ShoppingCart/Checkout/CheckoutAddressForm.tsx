import { useState } from "react";
import { CircularProgress, Modal, Radio, IconButton } from "@mui/material";
import { FiPlusCircle, FiTrash, FiX } from "react-icons/fi";

const CheckoutAddressForm = () => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [address, setAddress] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    number: "",
    complemento: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
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

  const handleSaveAddress = () => {
    if (addresses.length < 2) {
      setAddresses([...addresses, address]);
      setSelectedAddress(addresses.length);
      setAddress({
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        number: "",
        complemento: "",
      });
      setShowModal(false);
    }
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);

    if (selectedAddress === index) {
      setSelectedAddress(0);
    } else if (selectedAddress > index) {
      setSelectedAddress((prev) => prev - 1);
    }
  };

  const renderAddressCard = (address: any, index: number) => (
    <div
      key={index}
      className="flex justify-between items-center border p-4 rounded"
    >
      <div>
        <p>{`${address.rua}${address.number && `, ` + address.number}`}</p>
        <p>{`${address.bairro} - ${address.cidade}/${address.estado}`}</p>
        <p>{`CEP: ${address.cep}`}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Radio
          checked={selectedAddress === index}
          onChange={() => setSelectedAddress(index)}
          color="default"
        />
        <IconButton onClick={() => handleRemoveAddress(index)}>
          <FiTrash size={16} color={"#ef4444"} />
        </IconButton>
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 bg-white rounded-sm p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 pb-4">
        Endereço de Entrega
      </h3>
      <div className="space-y-4">
        {addresses.map((addr, index) => renderAddressCard(addr, index))}

        {addresses.length < 2 && (
          <div
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center border border-dashed p-6 rounded text-center cursor-pointer space-y-1"
          >
            <FiPlusCircle size={22} color={"#6b7280"} />
            <p className="text-gray-500">Cadastrar novo endereço</p>
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="flex items-center justify-center h-screen w-full">
          <div className="p-6 bg-white rounded shadow-md mx-auto w-full max-w-xl">
            <div className="border-b border-gray-200 mb-4">
              <h4 className="text-xl font-semibold">Cadastrar Endereço</h4>
              <p className="text-sm font-regular text-gray-500 mb-4 mt-1">
                O endereço cadastrado será utilizado para entrega dos pedidos.
              </p>
            </div>
            <form className="space-y-4 font-regular">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                  <div className="relative">
                    <label className="block text-sm font-medium">CEP</label>
                    <input
                      type="text"
                      name="cep"
                      maxLength={8}
                      value={address.cep}
                      onChange={handleCepChange}
                      className="block w-full p-2 pr-8 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                    />
                    {loading && <CircularProgress size={16} />}
                  </div>
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium">Rua</label>
                  <input
                    type="text"
                    name="rua"
                    value={address.rua}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Número</label>
                  <input
                    type="text"
                    name="number"
                    value={address.number}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium">Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={address.bairro}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-sm font-medium">
                    Complemento
                  </label>
                  <input
                    type="text"
                    name="complemento"
                    value={address.complemento}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={address.cidade}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium">Estado</label>
                  <input
                    type="text"
                    name="estado"
                    value={address.estado}
                    onChange={handleInputChange}
                    className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={handleSaveAddress}
                  className="bg-black text-white text-sm px-4 py-2.5 rounded-sm hover:bg-gray-800"
                >
                  Salvar endereço
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-red-500 text-sm px-2 py-2 bg-transparent hover:underline"
                >
                  Descartar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutAddressForm;
