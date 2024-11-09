import { useState } from "react";
import * as Yup from "yup";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// TEMPORÁRIO!!!!
const ADMIN_CREDENTIALS = {
  email: "admin",
  password: "admin",
};

type LoginForm = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Campo obrigatório."),
  password: Yup.string().required("Campo obrigatório."),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(validation) });

  // Função temporária para realizar o login de administrador
  const handleLogin = (form: LoginForm) => {
    if (
      form.email === ADMIN_CREDENTIALS.email &&
      form.password === ADMIN_CREDENTIALS.password
    ) {
      console.log("Login efetuado com sucesso!");
      navigate("/admin/dashboard");
    } else {
      console.log("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="bg-gray-50 font-regular">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div>
            <h2 className="text-gray-800 text-center text-2xl font-orbitron-bold mb-4">
              Painel de Administrador
            </h2>
          </div>

          <div className="px-8 py-6 rounded-sm bg-white shadow">
            <form
              className="mt-2 space-y-4"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  E-mail
                </label>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-sm outline-black"
                    placeholder="Insira o e-mail"
                    {...register("email")}
                  />
                  <FiUser
                    color="#b2b2b2"
                    size={16}
                    className="absolute right-4"
                  />
                </div>
                {errors.email ? (
                  <p className="text-red-500 text-xs pt-2">
                    {errors.email.message}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Senha
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-sm outline-black"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 cursor-pointer"
                  >
                    {showPassword ? (
                      <FiEye size={16} className="text-gray-400" />
                    ) : (
                      <FiEyeOff size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>
                {errors.password ? (
                  <p className="text-red-500 text-xs pt-2">
                    {errors.password.message}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 bg-black text-black border-gray-300 rounded"
                  />
                  <label
                    id="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Lembrar senha
                  </label>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-sm text-white bg-black hover:bg-gray-800 focus:outline-none"
                >
                  Entrar
                </button>
              </div>
              <p className="text-gray-400 text-sm !mt-8 text-center">
                © 2024 Rua 404. Todos os direitos reservados.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
