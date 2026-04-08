"use client";

import Image from "next/image";
import { ToastContainer } from "react-toastify";
import LoginForm from "./LoginForm";
import Link from "next/link";

const Login = () => {
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
            Bem-vindo ao <span className="text-primary">BiteFlow</span>
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Faça login para gerenciar seu restaurante
          </p>
        </div>

        <LoginForm />

        <p className="text-sm text-center text-muted-foreground">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline transition duration-300"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
