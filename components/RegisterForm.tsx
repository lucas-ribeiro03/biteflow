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

const RegisterForm = () => {
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
    if (result.success === false) {
      return toast.error(result.message);
    }
    router.replace("/login", {});
  };

  const inputStyle = {
    border: "1.5px solid #e8ddd4",
    background: "#fdfaf8",
    borderRadius: "10px",
  };

  return (
    <div className="w-full flex flex-col ">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  style={{ color: "#444", fontSize: "13px", fontWeight: 500 }}
                >
                  Nome
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome completo"
                    {...field}
                    disabled={isSubmitting}
                    className="py-4"
                    style={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  style={{ color: "#444", fontSize: "13px", fontWeight: 500 }}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="seu@email.com"
                    {...field}
                    disabled={isSubmitting}
                    className="py-4"
                    style={inputStyle}
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
                <FormLabel
                  style={{ color: "#444", fontSize: "13px", fontWeight: 500 }}
                >
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                    className="py-4"
                    style={inputStyle}
                  />
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
                <FormLabel
                  style={{ color: "#444", fontSize: "13px", fontWeight: 500 }}
                >
                  Confirmar senha
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    {...field}
                    disabled={isSubmitting}
                    className="py-4"
                    style={inputStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size="lg"
            disabled={!isValid || isSubmitting}
            className="w-full hover:bg-amber-600 text-base font-semibold mt-1"
            style={{ borderRadius: "10px" }}
          >
            Cadastrar-se
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
