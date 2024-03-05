"use client"
import { z } from "zod";
import { Input } from "@/components/ui/input";


import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";


import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { GetFornecedorById, UpdateFornecedor } from "@/app/api/fornecedor/routes";
import { validarCPFouCNPJ } from "@/utils/veryCpfCnpj";




const formSchema = z.object({
  Empresa:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  Email: z.string().optional(),
  CpfCnpj: z.string().refine((val) =>{

    return validarCPFouCNPJ(val)
   }, {
     message: "CPF/CNPJ inválido",
   }),

   Endereco:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
   Tipo:z.string().refine((val) => val.length >= 3, {
    message: "Tem que ter no minimo 3 caracteres",
  }),
  Telefone: z.string().optional(),

})

type FormData =z.infer<typeof formSchema>;

interface EditFornecedorProps{
  IdFornecedor:string,
    usuario:UsuarioLogadoI
}

function EditarFornecedor({usuario,IdFornecedor}:EditFornecedorProps ) {

  const router = useRouter();
  const { toast } = useToast()
  const { handleSubmit,register,setValue,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
  
    const {data,isLoading } = useQuery({
      queryKey:['modalidade',IdFornecedor],
      queryFn:() => GetFornecedorById(usuario,IdFornecedor as string),
      
    })
    

    useEffect(() => {
         
      setValue("Empresa", data ? data.Empresa :'',{ shouldValidate: true });
      setValue("Email", data ? data.Email :'',{ shouldValidate: true });
      setValue("CpfCnpj", data ? data.CpfCnpj :'',{ shouldValidate: true });
      setValue("Endereco", data ? data.Endereco :'',{ shouldValidate: true });
      setValue("Tipo", data ? data.Tipo :'',{ shouldValidate: true });
      setValue("Telefone", data ? data.Telefone :'',{ shouldValidate: true });
   
    
    }, [data,setValue]);

  
 
   
  const mutation = useMutation({
    mutationFn: (data:FormData) => {
      return     UpdateFornecedor(usuario,IdFornecedor,data)
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
          
             title: "Atualizado com sucesso",
           })
           
           router.push("/fornecedor");
          
      }
    
    }
  })
 


   const onSubmit = async (data:FormData) => {

    mutation.mutate(data)
  }
    return (  
      <>
      { !isLoading ?
        <form onSubmit={handleSubmit(onSubmit)} >
        <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Beneficio</h1>
        <div className=" mx-auto p-4 gap-4">
        {/* Coluna 1 */}
        <div>
          <div className="mb-4">
            <label htmlFor="Empresa" className="block text-sm font-medium text-white">Empresa:</label>
            <Input type="text" id="Empresa" {...register('Empresa')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Empresa"/>
            {errors.Empresa?.message && <p className="text-sm text-red-400">{errors.Empresa?.message}</p> }
          </div>

          <div className="mb-4">
            <label htmlFor="Email" className="block text-sm font-medium text-white">Email:</label>
            <Input type="text" id="Email" {...register('Email')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Email"/>
            {errors.Email?.message && <p className="text-sm text-red-400">{errors.Email?.message}</p> }
          </div>


          <div className="mb-4">
            <label htmlFor="Endereco" className="block text-sm font-medium text-white">Endereco:</label>
            <Input type="text" id="Endereco" {...register('Endereco')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Endereco"/>
            {errors.Endereco?.message && <p className="text-sm text-red-400">{errors.Endereco?.message}</p> }
          </div>
         
         
          <div className="mb-4">
            <label htmlFor="CpfCnpj" className="block text-sm font-medium text-white">CpfCnpj:</label>
            <Input type="text" id="CpfCnpj" {...register('CpfCnpj')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o CpfCnpj" />
            {errors.CpfCnpj?.message && <p className="text-sm text-red-400">{errors.CpfCnpj?.message}</p> }
          </div>


          <div className="mb-4">
            <label htmlFor="Telefone" className="block text-sm font-medium text-white">Telefone:</label>
            <Input type="text" id="Telefone" {...register('Telefone')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent" placeholder="Digite o Telefone" />
            {errors.Telefone?.message && <p className="text-sm text-red-400">{errors.Telefone?.message}</p> }
          </div>
          
            
          <div className="mb-4">
            <label htmlFor="Tipo" className="block text-sm font-medium text-white">Tipo:</label>
            <select id="Tipo" {...register('Tipo')} required className="mt-1 p-2 w-full border rounded-md mb-2 bg-background">
              <option value="Juridica">Juridica</option>
              <option value="Pessoal">Pessoal</option>
              
            </select>
            {errors.Tipo?.message && <p className="text-sm text-red-400">{errors.Tipo?.message}</p> }
          </div>

     
        </div>


        <Button className="text-white font-bold">Atualizar</Button>
      
        
      </div>
          
       
        
       
       
       </form>
     :
     
     <h1 className="text-center text-4xl font-bold mt-9">Loading</h1>
     }
    </>
    );
}

export default EditarFornecedor;


