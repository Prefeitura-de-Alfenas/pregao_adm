"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateUsuario } from "@/app/api/usuarios/route";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UsuarioI, UsuarioLogadoI } from "@/interfaces/usuario/interface";
import {  GetEquipamentosAll } from "@/app/api/situacao/routes";
import { EquipamentoI } from "@/interfaces/situacao/interface";

const formSchema = z.object({
   Nome:z.string().refine((val) => val.length >= 3, {
      message: "Tem que ter no minimo 3 caracteres",
    }),
   Email:z.string().refine((val) => val.length >= 5, {
      message: "Term no minimo 5 caracteres",
    }),
   Senha:z.string().refine((val) => val.length >= 3, {
      message: "Term no minimo 3 caracteres",
    }),
   
})

type FormData =z.infer<typeof formSchema>;

interface NovoUsuarioProps{
  usuario: UsuarioLogadoI
}

function NewUsuario({usuario}:NovoUsuarioProps) {
   const { toast } = useToast()
   const router = useRouter();
   const { handleSubmit,register,formState:{errors}} = useForm<FormData>({
      mode:"onBlur",
      resolver:zodResolver(formSchema)
   })
   const {data,isLoading } = useQuery({
    queryKey:['equipamentos'],
    queryFn:() => GetEquipamentosAll(usuario),
    
  })

   const mutation = useMutation({
    mutationFn: (data:FormData) => {
      return     CreateUsuario(usuario,data)
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
          
             title: "Usuario cadastrado com sucesso",
           })
           router.push("/usuarios");
      }
    
    }
  })
   const onSubmit = async (data:FormData) => {
      mutation.mutate(data)
      
   }

 
    return ( 
      <>
      { !isLoading ?
     
       <div className="flex  items-center justify-center  p-4 w-full">
           
             <form onSubmit={handleSubmit(onSubmit)} className=" w-5/6">
             <div className="">
               <div className="mb-7 "  >
                <p className="font-bold mb-2 ">Nome</p>
                <Input type="text"     {...register('Nome')} placeholder="Nome"/>
                {errors.Nome?.message && <p>{errors.Nome?.message}</p> }
                </div>
                <div className="mb-7" >
                <p className="font-bold mb-2 ">Email</p>
                <Input type="Email"  {...register('Email')} placeholder="Email"/>
                {errors.Email?.message && <p>{errors.Email?.message}</p> }
                </div>
                <div className="mb-7">
                <p className="font-bold mb-2 ">Senha</p>
                <Input type="password"   {...register('Senha')} placeholder="Senha"/>
                {errors.Senha?.message && <p>{errors.Senha?.message}</p> }
                </div>
              
         
                </div>

                <Button className="text-white font-bold">Cadastrar</Button>
             </form>
           
            
       </div>
       :
       <h1 className="text-center text-4xl font-bold mt-9">Loading</h1>
      }
        </>
     );
}

export default NewUsuario;

