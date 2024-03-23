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



import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

import { CreateContrato, GetContratoById, GetFornecedorOrgao, UpdateContrato } from "@/app/api/contrato/routes";
import { OrgaoI, ProcessoxOrgaoI } from "@/interfaces/Orgao/inteface";
import { ProcessoxFornecedorI } from "@/interfaces/Processo/inteface";
import { FornecedorI, ProcessoContratoxFornecedorI } from "@/interfaces/fornecedor/inteface";
import { converterDataParaFormatoInputDate } from "@/utils/converDateParaInput";
import { FornecedorOrgaoI } from "@/interfaces/Contrato/inteface";
import { MoadalidadeI } from "@/interfaces/moadalidade/inteface";




const formSchema = z.object({
  IdOrgao: z.coerce.number(),
  IdModalidade: z.coerce.number(),
  IdFornecedor: z.coerce.number(),
  NumeroContrato:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  NumeroPregao:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  Numeroprocesso:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  Valor:  z.coerce.number().refine((val) => {
    // Adicione sua lógica de validação aqui
    return !isNaN(val) && val >= 0; // Verifica se é um número não negativo
    }, 
    {
     message: "O valor da licitação deve ser um número não negativo",
  }),
  DataPublicacao: z.coerce.date({
    required_error:"Data invalida"
  }).min(new Date('1900-01-01'),{
    message:"Data da abertura invalida"
  }).refine((val) => {
   
    return val >= new Date('1900-01-01') 
  }, {
    message: "Data da publicação inválida",
  }),
  DataVencimento: z.coerce.date({
    required_error:"Data invalida"
  }).min(new Date('1900-01-01'),{
    message:"Data da abertura invalida"
  }).refine((val) => {
   
    return val >= new Date('1900-01-01') 
  }, {
    message: "Data da publicação inválida",
  }),
  DataAssinatura: z.coerce.date({
    required_error:"Data invalida"
  }).min(new Date('1900-01-01'),{
    message:"Data da abertura invalida"
  }).refine((val) => {
   
    return val >= new Date('1900-01-01') 
  }, {
    message: "Data da publicação inválida",
  }),
  Objeto:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),
  CNPJ:z.string().optional(),
   IdUsuario: z.number().optional(),
})




type FormData =z.infer<typeof formSchema>;

interface UpadateContratoProps{
  id:string,
  usuario:UsuarioLogadoI
}

function EditarContrato({usuario,id}:UpadateContratoProps) {

  const router = useRouter();
  const { toast } = useToast()

  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
   

   const {data,isLoading } = useQuery({
    queryKey:['contrato',id],
    queryFn:() => GetContratoById(usuario,id),
    
  })

  const {data:dataFornecedorOrgao,isLoading:isLoadingFornecedorOrgao } = useQuery({
    queryKey:['fornecedorandorgao'],
    queryFn:() => GetFornecedorOrgao(usuario),
    
  })
   
   
  const mutation = useMutation({
    mutationFn: async (data:FormData) => {
      let dataResponse = data;
     
    
      return     UpdateContrato(usuario,id,dataResponse)
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
          
            router.push("/contrato");
           
      }
    
    }
  })
 

   useEffect(() =>{
    setValue("IdOrgao", data ? data.IdOrgao :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdFornecedor", data ? data.IdFornecedor :'',{ shouldValidate: true });
    setValue("NumeroContrato", data ? data.NumeroContrato :'',{ shouldValidate: true });
    setValue("NumeroPregao", data ? data.NumeroPregao :'',{ shouldValidate: true });
    setValue("Numeroprocesso", data ? data.Numeroprocesso :'',{ shouldValidate: true });
    setValue("Valor", data ? data.Valor :'',{ shouldValidate: true });
    setValue("DataPublicacao", data ? converterDataParaFormatoInputDate(data.DataPublicacao) :'',{ shouldValidate: true });
    setValue("DataVencimento", data ? converterDataParaFormatoInputDate(data.DataVencimento) :'',{ shouldValidate: true });
    setValue("DataAssinatura", data ? converterDataParaFormatoInputDate(data.DataAssinatura) :'',{ shouldValidate: true });
    setValue("Objeto", data ? data.Objeto :'',{ shouldValidate: true });
    setValue("CNPJ", data ? data.CNPJ :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdModalidade", data ? data.IdModalidade :'',{ shouldValidate: true });
    setValue("IdUsuario", data ? data.IdUsuario :'',{ shouldValidate: true });

    
   },[data,setValue])

   const onSubmit = async (data:FormData) => {
    const idusuario = parseInt(usuario.user.id.toString())
    const dataResponse = {
      ...data,
      IdUsuario:idusuario
    }

    mutation.mutate(dataResponse)
   }
   if(isLoading || isLoadingFornecedorOrgao){
    return <div className="flex items-center justify-center mt-5">Loading...</div>
   }
    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Processo</h1>
      <div className=" mx-auto p-4 gap-4">
        {/* Coluna 1 */}
         <div>

         <div className="mb-4">
            <label htmlFor="IdFornecedor" className="block text-sm font-medium text-white">Fornecedor</label>
            <select id="IdFornecedor"   {...register('IdFornecedor')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
               {dataFornecedorOrgao.fornecedor.map((item:FornecedorI) =>(
                   <option key={item.IdFornecedor} value={item.IdFornecedor}>{item.Empresa}</option>
               ))}
            </select>
            {errors.IdFornecedor?.message && <p className="text-sm text-red-400">{errors.IdFornecedor?.message}</p> }
          </div>

          <div className="mb-4">
            <label htmlFor="IdOrgao" className="block text-sm font-medium text-white">Sitação:</label>
            <select id="IdOrgao"   {...register('IdOrgao')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
               {dataFornecedorOrgao.orgao.map((item:OrgaoI) =>(
                   <option key={item.IdOrgao} value={item.IdOrgao}>{item.Nome}</option>
               ))}
            </select>
            {errors.IdOrgao?.message && <p className="text-sm text-red-400">{errors.IdOrgao?.message}</p> }
          </div>


        
          <div className="mb-4">
            <label htmlFor="IdModalidade" className="block text-sm font-medium text-white">Sitação:</label>
            <select id="IdModalidade"   {...register('IdModalidade')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
               {dataFornecedorOrgao.modalidade.map((item:MoadalidadeI) =>(
                   <option key={item.IdModalidade} value={item.IdModalidade}>{item.Nome}</option>
               ))}
            </select>
            {errors.IdModalidade?.message && <p className="text-sm text-red-400">{errors.IdModalidade?.message}</p> }
          </div>

          
            <div className="mb-4 flex-1">
              <label htmlFor="NumeroContrato" className="block text-sm font-medium text-white">Numero do Contrato:</label>
              <Input type="text" id="NumeroContrato" {...register('NumeroContrato')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o NumeroContrato"/>
              {errors.NumeroContrato?.message && <p className="text-sm text-red-400">{errors.NumeroContrato?.message}</p> }
            </div>

            <div className="flex w-full gap-4">
              <div className="mb-4 flex-1">
                <label htmlFor="Numeroprocesso" className="block text-sm font-medium text-white">Numero do Processo :</label>
                <Input type="text" id="Numeroprocesso" {...register('Numeroprocesso')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" readOnly/>
                {errors.Numeroprocesso?.message && <p className="text-sm text-red-400">{errors.Numeroprocesso?.message}</p> }
              </div>

              <div className="mb-4 flex-1">
                <label htmlFor="NumeroPregao" className="block text-sm font-medium text-white"> Número/Modalidade :</label>
                <Input type="text" id="NumeroPregao" {...register('NumeroPregao')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent"/>
                {errors.NumeroPregao?.message && <p className="text-sm text-red-400">{errors.NumeroPregao?.message}</p> }
              </div>
              
               
            </div>

            <div className="mb-4 flex-1">
              <label htmlFor="Valor" className="block text-sm font-medium text-white">Valor da Licitação:</label>
              <Input type="number" id="Valor" step="0.001" {...register('Valor')} required  className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
              {errors.Valor?.message && <p className="text-sm text-red-400">{errors.Valor?.message}</p> }
            </div>

            <div className="mb-4 w-1/2">
            <label htmlFor="DataPublicacao" className="block text-sm font-medium text-white">Data Publicação:</label>
            <input type="date" id="DataPublicacao"  required {...register('DataPublicacao')} className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent text-white "  />
            {errors.DataPublicacao?.message && <p className="text-sm text-red-400">{errors.DataPublicacao?.message}</p> }
            </div>

            <div className="mb-4 w-1/2">
              <label htmlFor="DataVencimento" className="block text-sm font-medium text-white">Data Vencimento:</label>
              <input type="date" id="DataVencimento"  required {...register('DataVencimento')} className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent text-white "  />
              {errors.DataVencimento?.message && <p className="text-sm text-red-400">{errors.DataVencimento?.message}</p> }
            </div>

            <div className="mb-4 w-1/2">
              <label htmlFor="DataAssinatura" className="block text-sm font-medium text-white">Data Assinatura:</label>
              <input type="date" id="DataAssinatura"  required {...register('DataAssinatura')} className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent text-white "  />
              {errors.DataAssinatura?.message && <p className="text-sm text-red-400">{errors.DataAssinatura?.message}</p> }
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Objeto</Label>
              <Textarea  id="Objeto" {...register('Objeto')} placeholder="Objeto" className="mt-1 p-2 w-full border rounded-md mb-2  bg-transparent" />
              {errors.Objeto?.message && <p className="text-sm text-red-400">{errors.Objeto?.message}</p> }
            </div>
          

        
        </div>
      

        <Button className="text-white font-bold mt-2">Atualizar</Button>
        
      </div>
    

   

   
     
     
     </form>
    );
}

export default EditarContrato;


