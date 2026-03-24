"use client";

import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      style={{ background: "#f4ede4" }}
    >
      <ToastContainer position="top-center" pauseOnHover={false} />
      <div
        className="bg-white flex flex-col items-center gap-6 w-full max-w-md p-10"
        style={{ borderRadius: "20px", border: "1px solid #f0e8df" }}
      >
        <div className="flex flex-col items-center gap-1 w-full">
          <Image
            src={"/images/biteflow-logo.png"}
            width={56}
            height={56}
            alt="Logo"
            style={{ borderRadius: "14px" }}
          />
          <h1
            className="text-2xl font-bold text-center mt-2"
            style={{ color: "#1a1208" }}
          >
            Crie sua conta no <span className="text-primary">BiteFlow</span>
          </h1>
          <p className="text-center text-sm" style={{ color: "#888" }}>
            Comece a gerenciar seu restaurante hoje
          </p>
        </div>

        <RegisterForm />

        <p className="text-sm text-center" style={{ color: "#888" }}>
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
