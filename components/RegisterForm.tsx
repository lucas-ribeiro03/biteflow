"use client";

import { registerSchema } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { registerAction } from "@/app/actions/user/register-action";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();
  type RegisterFormData = z.infer<typeof registerSchema>;
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: { email: "", name: "", password: "", confirmPassword: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    const result = await registerAction(formData);
    if (result.success === false) return toast.error(result.message);
    router.replace("/login");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        {/* Campo Nome */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-[13px] font-medium">
                Nome
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome completo"
                  type="text"
                  {...field}
                  disabled={isSubmitting}
                  className="py-4 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-[10px] focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-[13px] font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="seu@email.com"
                  type="email"
                  {...field}
                  disabled={isSubmitting}
                  className="py-4 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-[10px] focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-[13px] font-medium">
                Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••"
                    type={isPasswordVisible ? "text" : "password"}
                    {...field}
                    disabled={isSubmitting}
                    className="py-4 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-[10px] focus:border-primary pr-10" // Adicionado pr-10
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground text-[13px] font-medium">
                Confirmar senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    {...field}
                    disabled={isSubmitting}
                    className="py-4 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-[10px] focus:border-primary pr-10" // Adicionado pr-10
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size="lg"
          disabled={!isValid || isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold mt-1 rounded-[10px]"
        >
          Cadastrar-se
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
