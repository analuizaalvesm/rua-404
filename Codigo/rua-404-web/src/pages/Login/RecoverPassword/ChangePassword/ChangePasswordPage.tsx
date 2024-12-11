import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "./ChangePasswordPage.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

type LoginForm = {
  password: string;
};

const validation = Yup.object().shape({
  password: Yup.string()
    .min(8, "A senha deve possuir no mínimo 8 dígitos.")
    .max(16, "A senha é grande demais.")
    .required("Campo obrigatório."),
});

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(validation) });
  const email = localStorage.getItem("userEmail");
  const code = localStorage.getItem("userCode");

  const handleChangePassword = async (form: LoginForm) => {
    try {
      const response = await axios.post<AxiosResponse>(
        `http://localhost:8080/api/management/change-password`,
        {
          email: email,
          code: code,
          password: form.password,
        }
      );
      console.log("Resposta recebida:", response);

      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!", {
          position: "top-center",
        });
        navigate("/login");
      } else {
        console.error("Erro na validação do código:", response);
        toast.error("Erro na validação do código, tente novamente.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Erro capturado no catch:", err);
      toast.error("Erro na validação do código, tente novamente.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:my-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Redefinir senha
              </h1>
              <form
                className="space-y-4 md:space-y-4"
                onSubmit={handleSubmit(handleChangePassword)}
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nova senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("password")}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="bg-transparent absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 border-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {errors.password ? (
                    <p className="text-red-500 text-xs pt-1">
                      {errors.password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("password")}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="bg-transparent absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 border-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {errors.password ? (
                    <p className="text-red-500 text-xs pt-1">
                      {errors.password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-right">
                  <ul className="custom-list">
                    <li className="custom-list-item">Min. 8 caracteres</li>
                    <li className="custom-list-item">
                      Incluir 1 letra maiúscula e 1 minúscula
                    </li>
                    <li className="custom-list-item">Incluir um número</li>
                    <li className="custom-list-item">
                      Incluir um caratere especial
                    </li>
                  </ul>
                </div>
                <Button
                  disabled={Object.keys(errors).length > 0}
                  type="submit"
                  className="w-full py-5 rounded-lg"
                >
                  Alterar senha
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePasswordPage;
