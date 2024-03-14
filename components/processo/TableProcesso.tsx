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

import { Box, FileBox, FileEdit,  Search } from "lucide-react";
import { Button } from "../ui/button";



import {
  useQuery,
} from '@tanstack/react-query'

import {  useState } from "react";



import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


import { GetProcessos } from "@/app/api/processo/routes";
import { ProcessoI } from "@/interfaces/Processo/inteface";
import { convertDataHoraParaPtBr, convertDataParaPtBr } from "@/utils/converDateParaInput";
import DeleteSoftProcesso from "./DialogDeleteSoft/DelteProcesso";


interface TableProcessoProps{
  usuario:UsuarioLogadoI
}
const TableProcesso = ({usuario}:TableProcessoProps) => {


  const [skip,setSkipped] = useState(0)
  const [filter,setFilter] = useState('')
  const [search,setSearch] = useState('')

  // Queries
  const {data,isPending,isError,error,refetch} = useQuery({
    queryKey:['processos',skip,search],
    queryFn:() => GetProcessos(usuario,skip,search),

    
  })

 
 const handleFilter = (event:React.ChangeEvent<HTMLInputElement>) =>{
  event.preventDefault();
  const value = event.target.value;
  setFilter(value);

 }

 const handelClickSearcher = () =>{
    setSearch(filter)
 }
  if (isPending) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {error.message}</div>
  }

 
  
    return ( 
        <div className="flex flex-col ">    
        <div className="flex items-start justify-start">
        <Button className="ms-1 mt-4 mb-4 text-white font-bold"><Link href="/processo/create">Novo Processo</Link></Button>
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
            placeholder="Digite o número do processo"
          />
         <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
          <Search onClick={handelClickSearcher} />
        </span>
        </div>
      </div>
        <Table>
        <TableCaption>Processos</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Numeor</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead>Modalidade</TableHead>
            <TableHead>Data Abertura</TableHead>
            <TableHead>Arquivos</TableHead>
            <TableHead>Fornnecedores</TableHead>
            <TableHead>Add Contrato</TableHead>
            <TableHead>Editar</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((processo:ProcessoI) => (
             <TableRow key={processo.IdProcesso}>
                <TableCell className="font-medium">{processo.Numero}</TableCell>
                <TableCell className="font-medium">{processo.Situacao.Nome}</TableCell>
                <TableCell className="font-medium">{processo.Modalidade.Nome}</TableCell>
                <TableCell className="font-medium">{convertDataParaPtBr(processo.DataAbertura)}</TableCell>
            
              
                <TableCell><Link href={`/arquivo/${processo.IdProcesso}`} ><FileBox   fill="#312e81" /></Link></TableCell>
                <TableCell><Link href={`/processo/fornecedores/${processo.IdProcesso}`} ><Box  fill="#312e81" /></Link></TableCell>
                <TableCell><Link href={`/contrato/create/${processo.IdProcesso}`} ><FileEdit  fill="#312e81" /></Link></TableCell>
                <TableCell><Link href={`/processo/edit/${processo.IdProcesso}`} ><FileEdit  fill="#312e81" /></Link></TableCell>

                <TableCell>
                    <DeleteSoftProcesso id={processo.IdProcesso} refetch={refetch} usuario={usuario} />
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
 
export default TableProcesso