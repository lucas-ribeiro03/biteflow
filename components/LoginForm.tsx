"use clent";

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
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  type LoginFormData = z.infer<typeof loginSchema>;
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
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
    if (result.success === false) {
      return toast.error(result.message);
    }
    router.replace("/");
  };
  return (
    // <Form {...form}>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="flex flex-col gap-8 w-full px-12 text-lg"
    //   >
    //     <FormField
    //       control={form.control}
    //       name="email"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Email</FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="Insira o seu email"
    //               {...field}
    //               disabled={isSubmitting}
    //               name="email"
    //               className="border-zinc-400 py-4"
    //             />
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <FormField
    //       control={form.control}
    //       name="password"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Senha</FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="Insira sua senha"
    //               {...field}
    //               name="password"
    //               disabled={isSubmitting}
    //               className="border-zinc-400 py-4"
    //             />
    //           </FormControl>
    //           <FormMessage />
    //           <a href="" className="text-[14px] ml-auto">
    //             Esqueceu a sua senha?
    //           </a>
    //         </FormItem>
    //       )}
    //     />
    //     <Button
    //       size={"lg"}
    //       disabled={!isValid || isSubmitting}
    //       className="hover:bg-amber-500 text-lg"
    //     >
    //       Entrar
    //     </Button>
    //   </form>
    // </Form>

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
                    style={{
                      border: "1.5px solid #e8ddd4",
                      background: "#fdfaf8",
                      borderRadius: "10px",
                    }}
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
                    style={{
                      border: "1.5px solid #e8ddd4",
                      background: "#fdfaf8",
                      borderRadius: "10px",
                    }}
                  />
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
            className="w-full hover:bg-amber-600 text-base font-semibold mt-1"
            style={{ borderRadius: "10px" }}
          >
            Entrar
          </Button>
        </form>
      </Form>

      <div className="relative flex items-center my-1">
        <div className="flex-1 h-px" style={{ background: "#f0e8df" }} />
        <span className="mx-3 text-xs" style={{ color: "#aaa" }}>
          OU
        </span>
        <div className="flex-1 h-px" style={{ background: "#f0e8df" }} />
      </div>

      <form action={signInGoogleAction}>
        <Button
          variant="outline"
          size="lg"
          className="w-full text-base font-medium gap-2"
          style={{
            border: "1.5px solid #e8ddd4",
            background: "#fdfaf8",
            borderRadius: "10px",
            color: "#333",
          }}
        >
          Entrar com Google
          <Image
            src={"/images/google.svg"}
            width={18}
            height={18}
            alt="Google"
          />
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
