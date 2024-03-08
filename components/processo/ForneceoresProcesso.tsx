"use client"

import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input";
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

import { ArrowBigDown, ArrowBigLeft, FileEdit,  Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";



import {
    useMutation,
  useQuery,
} from '@tanstack/react-query'

import {  useState } from "react";



import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { FornecedorI } from "@/interfaces/fornecedor/inteface";
import { ForncedorChange, GetFornecedoresProcesso, GetFornecedoresemprocesso } from "@/app/api/processo/routes";
import { ProcessoxFornecedorI } from "@/interfaces/Processo/inteface";
import { useToast } from "@/components/ui/use-toast"


interface TableFornecedorProps{
  IdProcesso:string,
  usuario:UsuarioLogadoI
}
const TableFornecedorProcesso = ({usuario,IdProcesso}:TableFornecedorProps) => {

  const { toast } = useToast()
  const [ativo,setAtivo] = useState(false)
  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries fornecedores
  const {data,isPending,isError,error,refetch} = useQuery({
    queryKey:['fornecedores',skip,search,ativo,IdProcesso],
    queryFn:() => GetFornecedoresemprocesso(usuario,skip,ativo,IdProcesso,search),

    
  })

  const {data:dataProcesso,isPending:isPedingProcesso,isError:isErrorProcesso,refetch:refetchProcesso} = useQuery({
    queryKey:['forncedorxprocesso'],
    queryFn:() => GetFornecedoresProcesso(usuario,IdProcesso),

    
  })

 
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  setFilter(value);

 }

 const handelClickSearcher = () =>{
    setSearch(filter)
 }

  interface ButtonPermissoesProps{
    id:string
  }
  const mutation = useMutation({
    mutationFn: ({usuario,IdFornecedor,IdProcesso}:ProcessoxFornecedorI) => {
      return  ForncedorChange({usuario,IdProcesso,IdFornecedor})
      .then((response) => response);

    },
    onError:(error) => {
      toast({
        title: error.message,
        description:"etnrou no on error do mutation"
       
      })

    },
    onSuccess:(data) =>{
        refetchProcesso() //
      refetch() // atualiza toda o fetch
 
    }
  })
  
  const ButtonPermissoes = ({id}:ButtonPermissoesProps) =>{
    let test=false;
    dataProcesso.ProcessoXFornecedor &&   dataProcesso.ProcessoXFornecedor.map((st:any)=>{
      if(id == st.IdFornecedor){
        test = true;
      }
   })


    return (
        <>
        {test &&   <ThumbsUp fill="green" />}
        {!test &&   <ThumbsDown fill="red" />}
        
        </>
      
   
    )
  }
  if (isPending || isPedingProcesso) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError || isErrorProcesso) {
    return <div className="flex items-center justify-center">Error: {"Erro ao carregar dados, servidor com problemas"}</div>
  }

 
  
    return ( 
        <div className="flex flex-col ">    
        <div>
          <h1 className="text-center font-bold text-2xl">Lista de processos</h1>
          <h1 className="text-center font-bold text-xl mt-2">Número do processo: {dataProcesso.Numero}</h1>
        </div>
       
        
        
        <div className="flex items-start justify-between">
        <Button className="ms-1 mt-4 mb-4 text-white font-bold"><Link href="/fornecedor/create">Novo Fornecedor</Link></Button>
        <Button className="ms-1 mt-4 mb-4 text-white font-bold me-10" variant="outline" size="icon"><Link href="/processo"><ArrowBigLeft /></Link></Button>
        </div> 
        <div className="flex w-2/3 ms-1">
        <div className="relative w-full">
          <Input
            type="text"
            id="search"
            name="search"
            onChange={handleFilter}
            value={filter}
            required
            className="mt-1 p-2 w-full border rounded-md mb-2 bg-transparent pr-10" // Aumente o padding à direita para acomodar o ícone
            placeholder="Digite o Nome"
          />
         <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          <Search onClick={handelClickSearcher} />
        </span>
        </div>
        <div className="mt-1 ms-2">
        <Button variant={"outline"}  onClick={()=>setAtivo(!ativo)}>{ativo ? "Somente ativos":"Todos"}</Button>
        </div>
      </div>
        <Table>
        <TableCaption>Modalidades</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Editar</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((fornecedor:FornecedorI) => (
             <TableRow key={fornecedor.IdFornecedor}>
                <TableCell className="font-medium">{fornecedor.Empresa}</TableCell>
                <TableCell className="font-medium">{fornecedor.CpfCnpj}</TableCell>
                <TableCell className="font-medium">{fornecedor.Tipo}</TableCell>
              

                <TableCell className=" flex  items-center justify-end me-48"
                 onClick={() => 
                    mutation.mutate({usuario:usuario,IdFornecedor:fornecedor.IdFornecedor,IdProcesso:dataProcesso.IdProcesso})}
                 >
                    <ButtonPermissoes id={fornecedor.IdFornecedor} />
                </TableCell>

                
                </TableRow>
            ))}
          
            
        </TableBody>
        </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem >
            <PaginationPrevious   onClick={() => setSkipped((old) => Math.max(old - 1,0))}  className="cursor-pointer"/>
          </PaginationItem>
          <PaginationItem >
              <PaginationLink>Page</PaginationLink>
            </PaginationItem>
            <PaginationItem >
              <PaginationLink>{skip}</PaginationLink>
            </PaginationItem>
       
       
          <PaginationItem>
            <PaginationNext  onClick={() =>  setSkipped((old) => ((data.length -1)  >= 0 ) ? old+1 : old)} />
          </PaginationItem>
        </PaginationContent>
       </Pagination>
</div>

     );
}
 
export default TableFornecedorProcesso