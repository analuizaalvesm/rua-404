import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "@/components/ui/Button/button";
import { useNavigate } from 'react-router-dom';
import { OTPInput, SlotProps } from 'input-otp'

// const validation = yup.object().shape({
//     code: yup
//         .string()
//         .required('Código é obrigatório')
//         .length(4, 'Código deve ter exatamente 4 dígitos'),
// });

type ValidateCodeForm = {
    code: string;
};

const ValidadeCodePage = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const email = localStorage.getItem("userEmail");
    const {
        handleSubmit,
        formState: { errors },
    } = useForm<ValidateCodeForm>();

    const handleValidateCode = async () => {
        try {
            const response = await axios.post<AxiosResponse>(
                `http://localhost:8080/api/management/validate-code`,
                {
                    email: email,
                    code: otp,
                },
            );

            console.log("Resposta recebida:", response);

            if (response.status === 200) {
                window.alert(response.data);

                // const stringResponse = JSON.stringify(response.data);
                // console.log("stringResponse:", stringResponse);

                // if (stringResponse == 'Código válido!') {
                //     console.log("entrou no if");
                // } else {
                //     console.log("entrou no else");
                // }

                navigate("/change-password");

            } else {
                console.error("Erro na validação do código:", response);
                window.alert("Erro na validação do código, tente novamente.");
            }

        } catch (err) {
            console.error("Erro capturado no catch:", err);
            window.alert("Erro na validação do código, tente novamente.");
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
                                Verificação
                            </h1>
                            <h5>
                                Enviamos um código de verificação para o e-mail <b>{email}</b>
                            </h5>
                            <form
                                ref={formRef}
                                className="space-y-4 md:space-y-4"
                                onSubmit={handleSubmit(handleValidateCode)}
                            >
                                <div>
                                    <label
                                        htmlFor="code"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Código
                                    </label>
                                    <div className="flex space-x-2">
                                        <OTPInput
                                            value={otp}
                                            onChange={setOtp}
                                            maxLength={4}
                                            containerClassName="group flex items-center has-[:disabled]:opacity-30"
                                            render={({ slots }) => (
                                                <>
                                                    <div className="flex">
                                                        {slots.slice(0, 4).map((slot, idx) => (
                                                            <Slot key={idx} {...slot} />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        />
                                    </div>
                                    {errors.code ? (
                                        <p className="text-red-500 text-xs pt-1">{errors.code.message}</p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <Button
                                    disabled={Object.keys(errors).length > 0}
                                    type="submit"
                                    className="w-full py-5 rounded-lg"
                                    // onClick={handleValidateCode}
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

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                'relative w-10 h-14 text-[2rem]',
                'flex items-center justify-center',
                'transition-all duration-300',
                'border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
                'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
                'outline outline-0 outline-accent-foreground/20',
                { 'outline-4 outline-accent-foreground': props.isActive },
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
            {props.hasFakeCaret && <FakeCaret />}
        </div>
    )
}

// You can emulate a fake textbox caret!
function FakeCaret() {
    return (
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
            <div className="w-px h-8 bg-white" />
        </div>
    )
}

// tailwind.config.ts for the blinking caret animation.
const config = {
    theme: {
        extend: {
            keyframes: {
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' },
                },
            },
            animation: {
                'caret-blink': 'caret-blink 1.2s ease-out infinite',
            },
        },
    },
}

// Small utility to merge class names.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";
import axios, { Axios, AxiosResponse } from 'axios';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default ValidadeCodePage;