import { useState, useEffect } from "react";
import { CircularProgress, Modal, Radio, IconButton } from "@mui/material";
import { FiPlusCircle, FiTrash, FiX } from "react-icons/fi";
import { useAuth } from "@/context/useAuth";
import { getUserProfile, createAddress, getAddress, updateAddress } from "@/services/ProfileService";
import { Address } from "@/models/Address";
import { User } from "@/models/User";

const CheckoutAddressForm = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [addressData, setAddressData] = useState<Address>({
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
    });
    const [address, setAddress] = useState<Address>({
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile(user?.email || "");
                if (userData) {
                    setUserData(userData);
                    const response = await getAddress(userData.customer_id);
                    console.log("response", response);
                    const addressData = response?.data;
                    console.log("addressData", addressData);

                    if (response?.status == 200 && addressData) {
                        setAddressData(addressData);
                        setAddress({ ...addressData });
                    } else {
                        setAddress({
                            cep: "",
                            rua: "",
                            numero: "",
                            complemento: "",
                            bairro: "",
                            cidade: "",
                            estado: ""
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, "");
        setAddress((prev) => ({ ...prev, cep }));

        if (cep.length === 8) {
            setLoading(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setAddressData({
                        cep,
                        rua: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        estado: data.uf,
                        numero: "",
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

    const handleSaveAddress = async () => {
        if (userData) {
            if (addressData === null) {
                const newAddress = await createAddress(userData.customer_id, address);
                if (newAddress) {
                    saveNewAddress(newAddress);
                }
            } else if (JSON.stringify(address) !== JSON.stringify(addressData)) {
                try {
                    console.log("address:", address);
                    const updatedAddress = await updateAddress(userData.customer_id, address);
                    console.log("updatedAddress:", updatedAddress);
                    if (updatedAddress) {
                        saveNewAddress(updatedAddress);
                    }
                } catch (error) {
                    alert("Ocorreu um erro ao tentar salvar as alterações.");
                }
            } else {
                alert("Nenhuma alteração foi detectada.");
                console.log("address", address);
                console.log("addressData", addressData);
            }
            setShowModal(false);

        } else {
            alert("Ocorreu um erro ao tentar salvar as alterações.");
        }
    };

    const saveNewAddress = async (updatedAddress: Address) => {
        setAddress({ ...updatedAddress });
        const addressObj = {
            cep: updatedAddress.cep,
            rua: updatedAddress.rua,
            numero: updatedAddress.numero,
            complemento: updatedAddress.complemento,
            bairro: updatedAddress.bairro,
            cidade: updatedAddress.cidade,
            estado: updatedAddress.estado
        };

        setAddress(addressObj);

        alert("As informações foram atualizadas com sucesso!");
    };

    const handleRemoveAddress = () => {
        // CHAMAR ROTA DE EXCLUIR O ENDEREÇO
        setAddressData({
            cep: "",
            rua: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: ""
        });
    };

    const isAddressEmpty = (address: Address) => {
        return (
            !address.rua &&
            !address.numero &&
            !address.complemento &&
            !address.bairro &&
            !address.cidade &&
            !address.estado &&
            !address.cep
        );
    };

    return (
        <div className="border border-gray-200 bg-white rounded-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 pb-4">
                Endereço de Entrega
            </h3>
            <div className="space-y-4">
                {addressData && !isAddressEmpty(addressData) ? (
                    <div
                        key=""
                        className="flex justify-between items-center border p-4 rounded"
                    >
                        <div>
                            <p>{`${addressData.rua}${addressData.numero && `, ` + addressData.numero}${addressData.complemento && `, ` + addressData.complemento}`}</p>
                            <p>{`${addressData.bairro} - ${addressData.cidade}/${addressData.estado}`}</p>
                            <p>{`CEP: ${addressData.cep}`}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <IconButton onClick={() => handleRemoveAddress()}>
                                <FiTrash size={16} color={"#ef4444"} />
                            </IconButton>
                        </div>
                    </div>
                ) : (
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
                                            name="cepModal"
                                            maxLength={8}
                                            defaultValue={address.cep}
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
                                        defaultValue={address.rua}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium">Número</label>
                                    <input
                                        type="text"
                                        name="number"
                                        defaultValue={address.numero}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-4">
                                    <label className="block text-sm font-medium">Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        defaultValue={address.bairro}
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
                                        defaultValue={address.complemento}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium">Cidade</label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        defaultValue={address.cidade}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded-sm shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium">Estado</label>
                                    <input
                                        type="text"
                                        name="estado"
                                        defaultValue={address.estado}
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
