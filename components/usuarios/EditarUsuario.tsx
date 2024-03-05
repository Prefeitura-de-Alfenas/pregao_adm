"use client"
import { useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetUsuarioById, UpUsuario } from "@/app/api/usuarios/route";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


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

interface EditarUsuarioProps{
    userid:string,
    usuario:UsuarioLogadoI
  }
function EditarUsuario({usuario,userid}:EditarUsuarioProps) {
  const { toast } = useToast()
  const router = useRouter();
  
  const {data,isPending,isError,isSuccess } = useQuery({
    queryKey:['usuario',userid],
    queryFn:() => GetUsuarioById(usuario,userid)
  })
 
  const { handleSubmit,register, setValue,formState:{errors}} = useForm<FormData>({
      mode:"onBlur",
      resolver:zodResolver(formSchema),
       
  })
  const mutation = useMutation({
    mutationFn: (dataMuation:FormData) => {
      return     UpUsuario(usuario,userid,dataMuation)
      .then(response => response)
    },
    onError:(error) => {
      toast({
        title: error.message,
      
      })
    },
    onSuccess:(dataMuation) =>{

      if(dataMuation.error){
            toast({
                variant: "destructive" ,
                title: dataMuation.error,
              })
      }else{
          toast({
          
            title: "Usuario Atualizado com sucesso",
          })
          router.push("/usuarios");
      }
    
    }
  })
  useEffect(() => {
 
    setValue("Nome", data ? data.Nome :'',{ shouldValidate: true });
    setValue("Email",data ? data.Email :'',{ shouldValidate: true });
    
   
  }, [isSuccess,data,setValue]);


  if (isPending) {

    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {"Usuario não existe"}</div>
  }



  
  
  const onSubmit = async (dataSubmit:FormData) => {

    mutation.mutate(dataSubmit)
      
  }

    return ( 
      <>
      
        <h1 className="text-center text-2xl font-bold mt-6 mb-8">Atualizar Usuario</h1>
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
                  <Input type="email"  {...register('Email')} placeholder="Email"/>
                  {errors.Email?.message && <p>{errors.Email?.message}</p> }
                  </div>
                  <div className="mb-7">
                  <p className="font-bold mb-2 ">Senha</p>
                  <Input type="password"   {...register('Senha')} placeholder="Senha"/>
                  {errors.Senha?.message && <p>{errors.Senha?.message}</p> }
                  </div>
             

                  </div>

                  <Button className="text-white font-bold">Atualizar</Button>
              </form>
            
              
        </div>
      
    
      </>
    );
}

export default EditarUsuario;

