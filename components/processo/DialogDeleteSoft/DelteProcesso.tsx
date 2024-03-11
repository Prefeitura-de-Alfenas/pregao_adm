"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

  } from "@/components/ui/dialog"
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { DeleteArquivo } from "@/app/api/arquivo/route";
import { DeleteProcesso } from "@/app/api/processo/routes";

interface DeleteSoftProcesso{
    id:string
    refetch:()=>void,
    usuario:UsuarioLogadoI
  

}

function DeleteSoftProcesso({usuario,id,refetch}:DeleteSoftProcesso) {
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: ({id}:{id:string}) => {
          return  DeleteProcesso(usuario,id)
          .then((response) => response);
  
        },
        onError:(error) => {
          toast({
            title: error.message,
            description:"etnrou no on error do mutation"
          
          })
  
        },
        onSuccess:(data) =>{
          refetch() // atualiza toda o fetch
  
        }
      })
    return ( 
        <Dialog>
            <DialogTrigger><Trash2 fill="red" /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Você está abusolutamente certo que quer deleter esse processo?</DialogTitle>
                <DialogDescription>
                   Se voce deletar esse processo vai ter perder os dados referente ao processo
                </DialogDescription>
                </DialogHeader>
                <div className="p-2">
                <DialogClose asChild>
                <Button   onClick={() => 
                mutation.mutate({id:id })}className="mt-2 text-white font-bold">Apagar</Button>
                </DialogClose>
                </div>
            </DialogContent>
            </Dialog>
     );
}

export default DeleteSoftProcesso;