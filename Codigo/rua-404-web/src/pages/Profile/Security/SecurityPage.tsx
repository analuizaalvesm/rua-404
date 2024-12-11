import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { getUserProfile, deleteUser } from "@/services/ProfileService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecurityPage: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [form, setForm] = useState<LoginForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile(user?.email || "");
        if (userData) {
          setUserData(userData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log("form", form);
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("As senhas não coincidem, digite novamente.", {
        position: "top-center",
      });
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("A senha deve possuir no mínimo 8 caracteres.", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/management/update-password`,
        {
          id: userData?.customer_id,
          senhaAtual: form.currentPassword,
          novaSenha: form.newPassword,
        }
      );
      console.log("Resposta recebida:", response);

      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!", {
          position: "top-center",
        });
        logout();
        navigate("/login");
      } else {
        toast.error("Erro ao alterar senha. Tente novamente mais tarde.", {
          position: "top-center",
        });

        if (response.status === 204) {
          console.error(
            "Erro ao alterar senha! Senha atual incorreta.",
            response
          );
        } else {
          console.error("Erro genérico.", response);
        }
      }
    } catch (err) {
      console.error("Erro capturado no catch:", err);
      toast.error("Erro ao alterar senha. Tente novamente mais tarde.", {
        position: "top-center",
      });
    }
  };

  const handleDeleteUser = async () => {
    if (userData) {
      const success = await deleteUser(userData.customer_id);
      console.log("success", success);
      if (success) {
        logout();
        alert("Usuário deletado com sucesso.");
      } else {
        alert("Erro ao deletar usuário.");
      }
    }
  };

  return (
    <div className="max-w-full">
      <h2 className="text-xl font-medium font-orbitron-regular mb-1">
        Segurança
      </h2>

      <svg
        className="my-6 w-full"
        width="1216"
        height="2"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1H1216" stroke="#D1D5DB"></path>
      </svg>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h2 className="mb-1 text-lg font-medium leading-tight tracking-tight text-gray-900 dark:text-white">
              Alterar senha
            </h2>
            <p className="text-gray-500 text-sm">
              Atualize a senha associada a sua conta.
            </p>
          </div>

          <div className="col-span-2">
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleUpdatePassword}
            >
              <div>
                <label
                  htmlFor="current-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Senha atual
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="••••••••"
                  defaultValue={form.currentPassword}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="••••••••"
                  defaultValue={form.newPassword}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  defaultValue={form.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Eu aceito os
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                      href="#"
                    >
                      Termos e Condições
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-black text-white text-sm px-6 py-2.5 rounded-sm hover:bg-gray-800"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </section>

      <svg
        className="my-9 w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="1216"
        height="2"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1H1216" stroke="#D1D5DB"></path>
      </svg>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h2 className="mb-1 text-lg font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
              Deletar conta
            </h2>
            <p className="text-gray-500 text-sm">
              Não precisa mais dos nossos serviços? Você pode deletar sua conta
              aqui. Essa ação não é reversível. Todas as informações associadas
              a sua conta serão deletadas permanentemente.
            </p>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              onClick={handleDeleteUser}
              className="bg-red-600 text-white text-sm px-6 py-2.5 rounded-sm hover:bg-red-800"
            >
              Sim, deletar minha conta.
            </button>
          </div>
        </div>
      </section>

      <svg
        className="mt-9 w-full"
        width="1216"
        height="0"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1H1216" stroke="#D1D5DB" />
      </svg>
    </div>
  );
};

export default SecurityPage;
