"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


import { CreateProcesso, GetModaliadeSituacao } from "@/app/api/processo/routes";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { MoadalidadeI } from "@/interfaces/moadalidade/inteface";
import { SituacaoI } from "@/interfaces/situacao/interface";




const formSchema = z.object({
  IdSituacao: z.coerce.number(),
  IdModalidade: z.coerce.number(),
  NumeroprocessoPrefeitura: z.string().optional(),
  NumeroprocessoSaude: z.string().optional(),
  Numero:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  ValorLicitacao:  z.coerce.number().refine((val) => {
    // Adicione sua lógica de validação aqui
    return !isNaN(val) && val >= 0; // Verifica se é um número não negativo
    }, 
    {
     message: "O valor da licitação deve ser um número não negativo",
  }),
  DataAbertura: z.coerce.date({
    required_error:"Data invalida"
  }).min(new Date('1900-01-01'),{
    message:"Data da abertura invalida"
  }).refine((val) => {
   
    return val >= new Date('1900-01-01') 
  }, {
    message: "Data de abertura inválida",
  }),
  Objeto:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  IdUsuario: z.number().optional(),
})





type FormData =z.infer<typeof formSchema>;

interface CriarModalidadeProps{
  usuario:UsuarioLogadoI
}

function CriarProcesso({usuario}:CriarModalidadeProps) {

  const router = useRouter();
  const { toast } = useToast()
  const [checkPrefeitura,setCheckPrefeitura] = useState<boolean>(false);
  const [checkSaude,setCheckSaude] = useState<boolean>(false);
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
   

   const {data: dataSituacao,isLoading:isLoadingSitacao } = useQuery({
    queryKey:['situacaoesandmodalidade'],
    queryFn:() => GetModaliadeSituacao(usuario),
    
  })
   
   
  const mutation = useMutation({
    mutationFn: async (data:FormData) => {
      let dataResponse = data;
     
    
      return     CreateProcesso(usuario,dataResponse)
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
          
             title: "Processo cadastrado com sucesso",
           })
          
            router.push("/processo");
           
      }
    
    }
  })
 

  const handleSetCheckPrefeitura = () =>{
    setValue("NumeroprocessoPrefeitura",  '',{ shouldValidate: true });
    setCheckPrefeitura(!checkPrefeitura)
  }
  const handleSetCheckSaude= () =>{
    setValue("NumeroprocessoSaude",  '',{ shouldValidate: true });
    setCheckSaude(!checkSaude)
  }
  
  const validationFundo =() =>{

    if(!checkPrefeitura && !checkSaude){

      return true;
    }
    else{

      true;
    }

  }
   const onSubmit = async (data:FormData) => {

    const idusuario = parseInt(usuario.user.id.toString())
    const dataResponse = {
      ...data,
      IdUsuario:idusuario
    }
    mutation.mutate(dataResponse)
   }
   if(isLoadingSitacao){
    return <div className="flex items-center justify-center mt-5">Loading...</div>
   }
    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Processo</h1>
      <div className=" mx-auto p-4 gap-4">
        {/* Coluna 1 */}
        <div>
     
        <div className="flex items-center  mb-6 mt-6 gap-14">
           <div className="flex items-center space-x-2">
             <input type="checkbox" id="checkPrefeitura" onChange={handleSetCheckPrefeitura}   />
             <Label htmlFor="NumeroprocessoPrefeitura">Prefeitura Municipal de Alfenas</Label>
           </div>

           



           <div className="flex items-center space-x-2"> 
            <input type="checkbox" id="checkSaude" onChange={handleSetCheckSaude} />
             <Label htmlFor="">Fundo Municipal de Saúde</Label>
           </div>
         
    
             
          
       
        </div>
     
 

        <div className={`mb-4 ${checkPrefeitura ? '' :'hidden'}`} >
            <label htmlFor="NumeroprocessoPrefeitura" className="block text-sm font-medium text-white mb-2">Numero Processo Prefeitura:</label>
            <Input type="text" id="NumeroprocessoPrefeitura" {...register('NumeroprocessoPrefeitura')} required={checkPrefeitura ? true : false} className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Numero Processo Prefeitura"/>
            {errors.NumeroprocessoPrefeitura?.message && <p className="text-sm text-red-400">{errors.NumeroprocessoPrefeitura?.message}</p> }
        </div>

        
        <div className={`mb-4 ${checkSaude ? '' :'hidden'}`} >
            <label htmlFor="NumeroprocessoSaude" className="block text-sm font-medium text-white mb-2">Numero Processo da Saúde:</label>
            <Input type="text" id="NumeroprocessoSaude" {...register('NumeroprocessoSaude')} required={checkSaude ? true : false} className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Numero Processo da Saúde"/>
            {errors.NumeroprocessoSaude?.message && <p className="text-sm text-red-400">{errors.NumeroprocessoSaude?.message}</p> }
        </div>
        

          <div className="mb-4">
            <label htmlFor="IdSituacao" className="block text-sm font-medium text-white">Sitação:</label>
            <select id="IdSituacao"   {...register('IdSituacao')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
               {dataSituacao.Situacao.map((item:SituacaoI) =>(
                   <option key={item.IdSituacao} value={item.IdSituacao}>{item.Nome}</option>
               ))}
            </select>
            {errors.IdSituacao?.message && <p className="text-sm text-red-400">{errors.IdSituacao?.message}</p> }
          </div>


          <div className="mb-4">
            <label htmlFor="IdModalidade" className="block text-sm font-medium text-white">Sitação:</label>
            <select id="IdModalidade"   {...register('IdModalidade')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
               {dataSituacao.Modalidade.map((item:MoadalidadeI) =>(
                   <option key={item.IdModalidade} value={parseInt(item.IdModalidade)}>{item.Nome}</option>
               ))}
            </select>
            {errors.IdSituacao?.message && <p className="text-sm text-red-400">{errors.IdSituacao?.message}</p> }
          </div>

          <div className="flex w-full gap-4">
            <div className="mb-4 flex-1">
              <label htmlFor="Numero" className="block text-sm font-medium text-white">Numero do Pregão:</label>
              <Input type="text" id="Numero" {...register('Numero')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Numero"/>
              {errors.Numero?.message && <p className="text-sm text-red-400">{errors.Numero?.message}</p> }
            </div>
            
          <div className="mb-4 flex-1">
              <label htmlFor="ValorLicitacao" className="block text-sm font-medium text-white">Valor da Licitação:</label>
              <Input type="number" id="ValorLicitacao" step="0.001" {...register('ValorLicitacao')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
              {errors.ValorLicitacao?.message && <p className="text-sm text-red-400">{errors.ValorLicitacao?.message}</p> }
            </div>
          </div>

          <div className="mb-4 w-1/2">
            <label htmlFor="DataAbertura" className="block text-sm font-medium text-white">Data Abertura:</label>
            <input type="date" id="DataAbertura"  required {...register('DataAbertura')} className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent text-white "  />
            {errors.DataAbertura?.message && <p className="text-sm text-red-400">{errors.DataAbertura?.message}</p> }
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Objeto</Label>
            <Textarea  id="Objeto" {...register('Objeto')} placeholder="Observação" className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
            {errors.Objeto?.message && <p className="text-sm text-red-400">{errors.Objeto?.message}</p> }
          </div>
          

        </div>
      

        <Button className="text-white font-bold mt-2" disabled={validationFundo()}>Cadastrar</Button>
        
      </div>

   

   
     
     
     </form>
    );
}

export default CriarProcesso;


