"use client";

import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <ToastContainer position="top-center" pauseOnHover={false} theme="dark" />
      <div
        className="flex flex-col items-center gap-6 w-full max-w-md p-10"
        style={{
          background: "hsl(25 20% 12%)",
          borderRadius: "20px",
          border: "1px solid hsl(25 18% 20%)",
        }}
      >
        <div className="flex flex-col items-center gap-1 w-full">
          <Image
            src={"/images/biteflow-logo.png"}
            width={56}
            height={56}
            alt="Logo"
            style={{ borderRadius: "14px" }}
          />
          <h1 className="text-2xl font-bold text-center mt-2 text-foreground">
            Crie sua conta no <span className="text-primary">BiteFlow</span>
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Comece a gerenciar seu restaurante hoje
          </p>
        </div>
        <RegisterForm />
        <p className="text-sm text-center text-muted-foreground">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline transition duration-300"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
