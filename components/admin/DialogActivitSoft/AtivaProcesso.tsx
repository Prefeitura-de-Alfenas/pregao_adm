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
import { FileUp, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { DeleteProcesso } from "@/app/api/processo/routes";

interface DeleteSoftProcesso{
    id:string
    refetch:()=>void,
    usuario:UsuarioLogadoI
  

}

function AtivarSoftProcesso({usuario,id,refetch}:DeleteSoftProcesso) {
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
            <DialogTrigger><FileUp fill="green" /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Você está abusolutamente certo que quer Reativar esse processo?</DialogTitle>
                <DialogDescription>
                   Se voce Reatuvar esse processo vai ter os dados que já foram excluidos novamente.
                </DialogDescription>
                </DialogHeader>
                <div className="p-2">
                <DialogClose asChild>
                <Button   onClick={() => 
                   mutation.mutate({id:id })}className="mt-2 text-white font-bold">Ativar</Button>
                </DialogClose>
                </div>
            </DialogContent>
            </Dialog>
     );
}

export default AtivarSoftProcesso;