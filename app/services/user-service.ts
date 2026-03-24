import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return {
      message: "Email já cadastrado",
      success: false,
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, passwordHash: hashPassword },
  });

  return {
    success: true,
    message: "",
  };
};
