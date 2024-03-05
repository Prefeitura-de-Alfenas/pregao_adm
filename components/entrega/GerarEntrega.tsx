"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {  GetPessoaEntregaById } from "@/app/api/pessoas/routes";
import { useRouter } from "next/navigation";

import { BeneficiosEntregaI } from "@/interfaces/moadalidade/inteface";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { CreateEntrega } from "@/app/api/entrega/routes";
import { EntregaCreateI } from "@/interfaces/entras/interface";
import { GetUsuarioById } from "@/app/api/usuarios/route";
import { Target } from "lucide-react";



const formSchema = z.object({
  quantidade: z.coerce.number().refine((val) => {
    // Adicione sua lógica de validação aqui
    return !isNaN(val) && val >= 0; // Verifica se é um número não negativo
    }, 
    {
        message: "O valor da renda deve ser um número não negativo",
  }),
  observacao:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),

  pessoId:z.string().optional(),
  equipamentoId:z.string().optional(),
  beneficioId:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1caracteres",
  }),
  usuarioId:z.string().optional(),
 

})

type FormData =z.infer<typeof formSchema>;

interface GerarEntregaProps{
  pessoaId:string,
  userLogado:UsuarioLogadoI
}

function GerarEntrega({pessoaId,userLogado}:GerarEntregaProps) {

  const router = useRouter();
  const { toast } = useToast()
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
 
   const {data,isLoading} = useQuery({
      queryKey:["pessoaEntrega"],
      queryFn:() => GetPessoaEntregaById(userLogado,pessoaId as string),
   })

   
   const {data:dataUsuario,isLoading:isLoadingUsuario} = useQuery({
    queryKey:["usuario",userLogado.user.id],
    queryFn:() => GetUsuarioById(userLogado,userLogado.user.id),
   })
   
  const mutation = useMutation({
    mutationFn: async (data:EntregaCreateI) => {
      let dataResponse = data;
     
    
      return     CreateEntrega(userLogado,dataResponse)
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
          
             title: "Deferido com sucesso",
           })
  
          window.open(`/reciboentrega/${data.id}`)
           
      }
    
    }
  })
 

  
  

   const onSubmit = async (entrega:FormData) => {
      
      
      const dataEntrega : EntregaCreateI = {
        usuarioId:dataUsuario.id,
        equipamentoId:dataUsuario.equipamento.id,
        pessoId:data.id,
        ...entrega,
      }


      mutation.mutate(dataEntrega)
    }

    if(isLoading){
      return <h1>Loading...</h1>
    }
    if(isLoadingUsuario){
      return <h1>Loading...</h1>
    }
    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Gerar Entrega</h1>
      <div className=" mx-auto mt-8 pe-56 ps-56 pb-1 pt-1 shadow-md grid md:grid-cols-1 grid-cols-1 gap-4">
        {/* Coluna 1 */}
        <div>
        <div className="mb-4">
                  <label htmlFor="beneficioId" className="block text-sm font-medium text-white">Beneficio:</label>
                  <select id="beneficioId"   {...register('beneficioId')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
                      {data?.beneficios.map((beneficio:BeneficiosEntregaI) => (
                         <option key={beneficio.beneficio.id} value={beneficio.beneficio.id}> {beneficio.beneficio.nome} </option>
                      ))}
                  </select>
                  {errors.beneficioId?.message && <p className="text-sm text-red-400">{errors.beneficioId?.message}</p> }
        </div>
       
        <div className="mb-4">
            <label htmlFor="quantidade" className="block text-sm font-medium text-white">Quantidade:</label>
            <Input type="number" id="quantidade" step="1" {...register('quantidade')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.quantidade?.message && <p className="text-sm text-red-400">{errors.quantidade?.message}</p> }
          </div>
        
        
     
        </div>


      </div>

      <div className=" mx-auto  pe-56 ps-56  pb-1 pt-1 shadow-md grid grid-cols-1 gap-4 mb-12">
        <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Obeservação</Label>
        <Textarea  id="observacao" {...register('observacao')} placeholder="Observação" className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
        {errors.observacao?.message && <p className="text-sm text-red-400">{errors.observacao?.message}</p> }
       </div>

     
       <Button className="text-white font-bold">Cadastrar</Button>
      </div>
     
     
     </form>
    );
}

export default GerarEntrega;


