import React, { CSSProperties, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/button";

type Props = {};

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email().required("Campo obrigatório."),
  username: Yup.string().required("Campo obrigatório."),
  password: Yup.string().min(8).max(16).required("Campo obrigatório."),
});

const RegisterPage = (props: Props) => {
  const { register: authRegister } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(validation) });
  const [loading, setLoading] = useState(false);


  const handleRegister = async (form: RegisterForm) => {
    setLoading(true);
    try {
      authRegister(form.email, form.username, form.password);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:my-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Registre-se
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleRegister)}
              >
                <div>
                  <label
                    htmlFor="nome"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nome completo"
                    {...register("username")}
                  />
                  {errors.username ? (
                    <p className="text-black">{errors.username.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-mail
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@email.com"
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="text-black">{errors.email.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password")}
                  />
                  {errors.password ? (
                    <p className="text-black">{errors.password.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-black focus:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Eu aceito os <a href="#" className="text-black hover:text-slate-500">Termos de Uso</a> e{" "} <a href="#" className="text-black hover:text-slate-500">Política de Privacidade</a> e desejo continuar.
                      </label>
                    </div>
                  </div>
                </div>
                <Button
                  disabled={Object.keys(errors).length > 0}
                  type="submit"
                  className="w-full py-5 rounded-lg"
                >
                  {loading ? (
                    "Carregando..."
                  ) : (
                    "Registrar"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
