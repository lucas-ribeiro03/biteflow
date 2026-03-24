"use server";

import { signIn } from "@/lib/auth";

export const signInGoogleAction = async () => {
  const response = await signIn("google", { redirectTo: "/" });
  console.log(response);
};
