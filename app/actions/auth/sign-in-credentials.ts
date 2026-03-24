"use server";

import { loginSchema } from "@/schema/login";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export const signInCredentials = async (formData: FormData) => {
  const validatedObjects = loginSchema.safeParse({
    email: formData.get("email")?.toString().trim(),
    password: formData.get("password")?.toString().trim(),
  });

  if (validatedObjects.error) {
    return {
      message: "Dados inválidos",
      success: false,
    };
  }

  const { email, password } = validatedObjects.data;

  try {
    await signIn("credentials", { email, password, redirect: false });

    return {
      success: true,
      message: "",
    };
  } catch (e) {
    if (e instanceof AuthError) {
      return { success: false, message: "Email ou senha inválidos" };
    }

    throw e;
  }

  //   redireciona pra home
};
