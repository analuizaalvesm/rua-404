import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type LoginForm = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email("E-mail inválido.").required("Campo obrigatório."),
  password: Yup.string()
    .min(8, "A senha deve possuir no mínimo 8 dígitos.")
    .max(16, "A senha é grande demais.")
    .required("Campo obrigatório."),
});

const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(validation) });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (form: LoginForm) => {
    localStorage.setItem("userEmail", form.email);

    login(form.email, form.password);
  };

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:my-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Entre na sua conta
              </h1>
              <form
                className="space-y-4 md:space-y-4"
                onSubmit={handleSubmit(handleLogin)}
              >
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
                    <p className="text-red-500 text-xs pt-1">
                      {errors.email.message}
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
                    Senha
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
                <div className="flex items-center justify-end">
                  <a
                    href="/get-code"
                    className="text-sm text-black font-medium text-primary-600 hover:text-slate-500 dark:text-primary-500"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Button
                  disabled={Object.keys(errors).length > 0}
                  type="submit"
                  className="w-full py-5 rounded-lg"
                >
                  Entrar
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Ainda não tem uma conta?{" "}
                  <a
                    href="/register"
                    className="font-medium text-black hover:text-slate-500"
                  >
                    Cadastre-se
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
