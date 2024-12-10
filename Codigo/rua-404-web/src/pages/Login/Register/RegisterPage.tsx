import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../context/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type RegisterForm = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

const validation = Yup.object().shape({
    email: Yup.string().email("E-mail inválido.").required("Campo obrigatório."),
    firstName: Yup.string().required("Campo obrigatório."),
    lastName: Yup.string().required("Campo obrigatório."),
    password: Yup.string()
        .min(8, "A senha deve possuir no mínimo 8 dígitos.")
        .max(16, "A senha é grande demais.")
        .required("Campo obrigatório."),
});

const RegisterPage = () => {
    const { register: authRegister } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({ resolver: yupResolver(validation) });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (form: RegisterForm) => {
        setLoading(true);
        try {
            authRegister(form.firstName, form.lastName, form.email, form.password);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-full">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:my-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Registre-se
                            </h1>
                            <form
                                className="space-y-4 md:space-y-4"
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
                                        id="firstName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nome"
                                        {...register("firstName")}
                                    />
                                    {errors.firstName ? (
                                        <p className="text-red-500 text-xs pt-1">
                                            {errors.firstName.message}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="nome"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Sobrenome
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Sobrenome"
                                        {...register("lastName")}
                                    />
                                    {errors.lastName ? (
                                        <p className="text-red-500 text-xs pt-1">
                                            {errors.lastName.message}
                                        </p>
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
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-black focus:bg-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 accent-black"
                                                required
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="termos"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Eu aceito os{" "}
                                                <a href="#" className="text-black hover:text-slate-500">
                                                    Termos de Uso
                                                </a>{" "}
                                                e{" "}
                                                <a href="#" className="text-black hover:text-slate-500">
                                                    Política de Privacidade
                                                </a>{" "}
                                                e desejo continuar.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    disabled={Object.keys(errors).length > 0}
                                    type="submit"
                                    className="w-full py-5 rounded-lg"
                                >
                                    {loading ? "Carregando..." : "Registrar"}
                                </Button>
                                <div className="flex justify-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-200">
                                        Já possui uma conta?{" "}
                                        <a
                                            href="/login"
                                            className="text-black hover:text-slate-500"
                                        >
                                            Faça login
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;
