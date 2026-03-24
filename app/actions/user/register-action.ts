"use server";

import { createUser } from "@/app/services/user-service";
import { registerSchema } from "@/schema/register";

export const registerAction = async (formData: FormData) => {
  const validatedObjects = registerSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    password: formData.get("password")?.toString().trim(),
    confirmPassword: formData.get("confirmPassword")?.toString().trim(),
  });

  if (validatedObjects.error) {
    console.log(validatedObjects.error);
    return {
      message: "Dados inválidos",
      success: false,
    };
  }

  const { name, email, password } = validatedObjects.data;

  return await createUser(name, email, password);
};
