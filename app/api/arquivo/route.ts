import { baseUrl, takeBase } from "@/config/base";
import { ArquivoCreateI } from "@/interfaces/arquivo/interface";

import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

const GetArquivoContrato = async (usuario:UsuarioLogadoI,IdContrato:string,skip:number,filter:string) => {
    const url = `${baseUrl}/arquivo/contratosallarquivos?id=${IdContrato}&take=${takeBase}&skip=${skip}&filter=${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const arquivos = await response.json() 
   console.log(arquivos)
    return arquivos ;
    
}

const GetArquivoProcesso = async (usuario:UsuarioLogadoI,IdProcesso:string,skip:number,filter:string) => {
    const url = `${baseUrl}/arquivo/processosallarquivos?id=${IdProcesso}&take=${takeBase}&skip=${skip}&filter=${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const arquivos = await response.json() 
 
    return arquivos ;
    
}

const GetArquivo = async (usuario:UsuarioLogadoI,id:string) => {

    const url = `${baseUrl}/arquivo/file/getfile/${id}`;	

    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
 
    })
  

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const blob = await response.blob();
    const urlBlog = URL.createObjectURL(blob);

    
    
    return urlBlog ;
    
}
const DeleteArquivo = async (usuario:UsuarioLogadoI,id:string) => {

    const url = `${baseUrl}/arquivo/file/delete/${id}`;	

    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
 
    })
  

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problemas")
    }
    const arquivos = await response.json() 
 
    return arquivos ;
    
}

const CreateArquivo = async (usuario: UsuarioLogadoI, data: ArquivoCreateI) => {
    console.log("Datatatatatatatata",data)
    const url = `${baseUrl}/arquivo/upload`;
    if(!data.file){
        throw new Error("O arquivo nao existe")
    }
    //@ts-ignore
    const file = data.file[0];



    const formData = new FormData();
    formData.append('file', file); // Adiciona o arquivo ao FormData
    formData.append('Nome', data.Nome); // Adiciona o nome ao FormData
    formData.append('IdProcesso', data.IdProcesso); // Adiciona o ID da pessoa ao FormData
   



    const response = await fetch(url, {
        method: 'POST',
        headers: {
            // Não é necessário definir Content-Type para FormData, o navegador cuidará disso
            'Authorization': `Bearer ${usuario.user.access_token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Conexão com a rede está com problema")
    }

    const entrega = await response.json();

    return entrega;
}

export {GetArquivoProcesso,GetArquivo,CreateArquivo,DeleteArquivo,GetArquivoContrato}