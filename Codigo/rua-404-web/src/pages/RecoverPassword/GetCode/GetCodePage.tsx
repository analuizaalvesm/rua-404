import React, { CSSProperties, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRecoverPassword } from "../../../context/useRecoverPassword";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/button";

type Props = {};

type RegisterForm = {
  email: string;
};

const validation = Yup.object().shape({
    email: Yup.string().email("E-mail inválido.").required("Campo obrigatório.")
});

const GetCodePage = (props: Props) => {
    const { getCode } = useRecoverPassword();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterForm>({ resolver: yupResolver(validation) });
      const [showPassword, setShowPassword] = useState(false);

    const handleRecoverPassword = async (form: RegisterForm) => {
        getCode(form.email);
    };

    return (
        <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:my-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Recuperar senha
              </h1>
              <h5>
                Para sua segurança, enviaremos um código de 4 dígitos no seu e-mail para validar a redefinição da senha.
              </h5>
              <form
                className="space-y-4 md:space-y-4"
                onSubmit={handleSubmit(handleRecoverPassword)}
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
                    <p className="text-red-500 text-xs pt-1">{errors.email.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  disabled={Object.keys(errors).length > 0}
                  type="submit"
                  className="w-full py-5 rounded-lg"
                >
                  Continuar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
};

export default GetCodePage;