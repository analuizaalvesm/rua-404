import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useManagement } from "../../context/useManagement";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui//input-otp";

type Props = {};

type RegisterForm = {
    email: string;
};

const validation = Yup.object().shape({
    email: Yup.string().email("E-mail inválido.").required("Campo obrigatório.")
});

const ValidadeCodePage = (props: Props) => {
    const { validateCode } = useManagement();
    const {
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({ resolver: yupResolver(validation) });

    const handleRecoverPassword = async (form: RegisterForm) => {
        // validateCode(form.email);
    };

    return (
        <div className="max-w-full">
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:my-24 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Verificação
                            </h1>
                            <h5>
                                Enviamos um código de verificação para o e-mail <b>exemplo@email.com</b>
                            </h5>
                            <form
                                className="space-y-4 md:space-y-4"
                                onSubmit={handleSubmit(handleRecoverPassword)}
                            >
                                <div>
                                    <label
                                        htmlFor="codigo"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Código
                                    </label>
                                    <InputOTP maxLength={4} className={`border w-20 h-auto text-white p-3 rounded-md block bg-black focus:border-2 focus:outline-none appearance-none`} >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <Button
                                    disabled={Object.keys(errors).length > 0}
                                    type="submit"
                                    className="w-full py-5 rounded-lg"
                                >
                                    Continuar
                                </Button>
                                <div className="flex justify-center">
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Não recebeu um código?{" "}
                                        <a
                                            href="/get-code"
                                            className="font-medium text-black hover:text-slate-500"
                                        >
                                            Reenviar
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

export default ValidadeCodePage;