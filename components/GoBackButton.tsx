"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type GoBackButtonProps = {
  label?: string;
};

const GoBackButton = ({ label }: GoBackButtonProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-2 cursor-pointer"
    >
      <ArrowLeft />
      <span>{label}</span>
    </div>
  );
};

export default GoBackButton;
