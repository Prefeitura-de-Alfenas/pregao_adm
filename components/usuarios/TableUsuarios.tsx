"use client"
import { ChangeStatusUsuarios, GetUsuarios } from "@/app/api/usuarios/route";
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

import { FileEdit, FileLock, Loader, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";

import { UsuarioI, UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { useToast } from "@/components/ui/use-toast"

import {
  useMutation,
  useQuery,
  useQueryClient,

} from '@tanstack/react-query'

interface TableUsuariosProps{
  usuario: UsuarioLogadoI
}
const TableUsuarios = ({usuario}:TableUsuariosProps) => {
  // const queryClient  =  useQueryClient();
  const { toast } = useToast()



  // Queries
  const {data,isPending,isError,error,refetch } = useQuery({
    queryKey:['usuarios'],
    queryFn:() => GetUsuarios(usuario)
  })

  const mutation = useMutation({
    mutationFn: ({userId}:any) => {
      return  ChangeStatusUsuarios(usuario,userId)
      .then((response) => response);

    },
    onError:(error) => {
      toast({
        title: error.message,
       
      })
    },
    onSuccess:(data) =>{
 
      refetch() // atualiza toda o fetch
    //  queryClient.setQueryData(['usuarios'],(currentData:UsuarioI[]) => currentData.map(usuario => usuario.id  === data.id 
    //   ? data 
    //   : usuario
    //   ) )
    }
  })

  if (isPending) {
    return <div className="flex items-center justify-center mt-5">Loading...</div>
  }

  if (isError) {
    return <div className="flex items-center justify-center">Error: {error.message}</div>
  }

 
  
    return ( 
        <div className="flex flex-col ">    
        <div className="flex items-start justify-start">
        <Button font-bold className="ms-1 mt-4 mb-4 text-white font-bold"><Link href="/usuarios/novousuario">Novo Usuário </Link></Button>
        </div> 
       
        <Table>
        <TableCaption>Usuarios</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Editar</TableHead>

            <TableHead>Permissoes</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
         
      
            {data?.map((usuario:UsuarioI) => (
             <TableRow key={usuario.IdUsuario}>
                <TableCell className="font-medium">{usuario.Nome}</TableCell>
                <TableCell>{usuario.Email}</TableCell>
         
             
                
     
                <TableCell><Link href={`/usuarios/novousuario/${usuario.IdUsuario}`} ><FileEdit  /></Link></TableCell>
                <TableCell><Link href={`/usuarios/listapermissoes/${usuario.IdUsuario}`} ><FileLock    /></Link></TableCell>
                </TableRow>
            ))}
          
            
        </TableBody>
        </Table>
        </div>

     );
}
 
export default TableUsuarios