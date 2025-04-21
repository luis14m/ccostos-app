"use client";


import CreateForm from "@/components/ccostos/create-form";
import Navbar from "@/components/Navbar";

export default function CreatePage() {
  
  return (
    <div className="flex-1 w-full flex flex-col gap-12 p-8">
      <div className="container mx-auto">
      
        <h1 className="text-2xl font-bold"></h1>
        <Navbar />
         
                <br />
                <br />
                <h1 className="text-2xl-center font-bold" >Centros de Costos</h1>
                <CreateForm />
       
      </div>
    </div>
  );
}
