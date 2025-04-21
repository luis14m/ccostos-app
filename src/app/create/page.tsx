"use client";

import CreateForm from "@/components/ccostos/create-form";
import NavBar from "@/components/nav-bar";

export default function CreatePage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <NavBar />
      <div className="container mx-auto border-2 border-gray-300 p-4">
        <div className="mt-16 bg-gray-100 p-4 my-4">
          <h1 className="text-2xl font-bold text-black text-center">
            Crear Centro de Costo
          </h1>
        </div>
        <CreateForm />
      </div>
    </div>
  );
}
