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

import { CreateFornecedores } from "@/app/api/fornecedor/routes";
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

interface CriarModalidadeProps{
  usuario:UsuarioLogadoI
}

function CriarFornecedor({usuario}:CriarModalidadeProps) {

  const router = useRouter();
  const { toast } = useToast()
  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })
 
 
   
  const mutation = useMutation({
    mutationFn: async (data:FormData) => {
      let dataResponse = data;
     
    
      return     CreateFornecedores(usuario,dataResponse)
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
          
            router.push("/fornecedor");
           
      }
    
    }
  })
 



   const onSubmit = async (data:FormData) => {

    mutation.mutate(data)
   }
    return (  
      
      <form onSubmit={handleSubmit(onSubmit)} >
      <h1 className="text-center font-bold text-2xl mb-4 mt-10">Cadastro de Fornecedor</h1>
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


        <Button className="text-white font-bold mt-2">Cadastrar</Button>
        
      </div>

   
     
     
     </form>
    );
}

export default CriarFornecedor;


