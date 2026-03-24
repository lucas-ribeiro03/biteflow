"use client";

import Image from "next/image";
import { ToastContainer } from "react-toastify";
import LoginForm from "./LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    // <div className="w-full h-screen flex items-center justify-center">
    //   <ToastContainer position="top-center" pauseOnHover={false} />
    //   <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-4 w-2xl">
    //     <div>
    //       <h1 className="text-2xl text-center">
    //         Faça login <br />
    //         <span className="text-primary text-center font-bold">BiteFlow</span>
    //       </h1>
    //       <Image
    //         src={"/images/biteflow-logo.png"}
    //         width={200}
    //         height={200}
    //         alt="Logo"
    //       />
    //       <p className="text-center">
    //         Ainda não tem uma conta? <br />
    //         <a
    //           href=""
    //           className="text-primary hover:underline transition duration-300"
    //         >
    //           Crie sua conta
    //         </a>
    //       </p>
    //     </div>
    //     <LoginForm />
    //   </div>
    // </div>

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
            style={{ fontFamily: "var(--font-sans)", color: "#1a1208" }}
          >
            Bem-vindo ao <span className="text-primary">BiteFlow</span>
          </h1>
          <p className="text-center text-sm" style={{ color: "#888" }}>
            Faça login para gerenciar seu restaurante
          </p>
        </div>

        <LoginForm />

        <p className="text-sm text-center" style={{ color: "#888" }}>
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
