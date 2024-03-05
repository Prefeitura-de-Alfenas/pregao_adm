"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { CreateModalidade } from "@/app/api/modalidade/routes";




const formSchema = z.object({
  Nome:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
 

})

type FormData =z.infer<typeof formSchema>;

interface CriarModalidadeProps{
  usuario:UsuarioLogadoI
}

function CriarModalidade({usuario}:CriarModalidadeProps) {

  const router = useRouter();
  const { toast } = useToast()
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
 
 
   
  const mutation = useMutation({
    mutationFn: async (data:FormData) => {
      let dataResponse = data;
     
    
      return     CreateModalidade(usuario,dataResponse)
      .then(response => response)
    },
    onError:(error) => {
      toast({
        title: error.message,
       
      })
    },
    onSuccess:(data) =>{

      if(data.error){
             toast({
                 variant: "destructive" ,
                title: data.error,
              })
      }else{
           toast({
          
             title: "Modalidade cadastrado com sucesso",
           })
          
            router.push("/modalidade");
           
      }
    
    }
  })
 



   const onSubmit = async (data:FormData) => {

    mutation.mutate(data)
   }
    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Modalidade</h1>
      <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1 shadow-md grid md:grid-cols-1 grid-cols-1 gap-4">
        {/* Coluna 1 */}
        <div>
          <div className="mb-4">
            <label htmlFor="Nome" className="block text-sm font-medium text-white">Nome:</label>
            <Input type="text" id="Nome" {...register('Nome')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Nome"/>
            {errors.Nome?.message && <p className="text-sm text-red-400">{errors.Nome?.message}</p> }
          </div>
    
     
        </div>


       
        
      </div>

      <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1 shadow-md grid grid-cols-1 gap-4 mb-12">
        
     
       <Button className="text-white font-bold">Cadastrar</Button>
      </div>
     
     
     </form>
    );
}

export default CriarModalidade;


