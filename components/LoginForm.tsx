"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { signInCredentials } from "@/app/actions/auth/sign-in-credentials";
import { loginSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { signInGoogleAction } from "@/app/actions/auth/sign-in-google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

const LoginForm = () => {
  type LoginFormData = z.infer<typeof loginSchema>;
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const result = await signInCredentials(formData);
    if (result.success === false) return toast.error(result.message);
    router.replace("/");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
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
                      className="py-4 pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground rounded-[10px] focus:border-primary"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 cursor-pointer"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <EyeIcon /> : <EyeClosedIcon />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                <a
                  href=""
                  className="text-primary text-xs ml-auto block text-right mt-1"
                >
                  Esqueceu a sua senha?
                </a>
              </FormItem>
            )}
          />
          <Button
            size="lg"
            disabled={!isValid || isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold mt-1 rounded-[10px]"
          >
            Entrar
          </Button>
        </form>
      </Form>

      <div className="relative flex items-center my-1">
        <div className="flex-1 h-px bg-border" />
        <span className="mx-3 text-xs text-muted-foreground">OU</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form action={signInGoogleAction}>
        <Button
          variant="outline"
          size="lg"
          className="w-full text-base font-medium gap-2 bg-secondary border-border text-foreground hover:bg-secondary/80 rounded-[10px]"
        >
          Entrar com Google
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
