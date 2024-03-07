import { baseUrl, takeBase } from "@/config/base";
import { ProcessoCreateI } from "@/interfaces/Processo/inteface";
import { FornecedorCreateI } from "@/interfaces/fornecedor/inteface";


import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const GetProcessos = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/processo/findall?take=${takeBase}&skip=${skip}&filter=${filter}`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`

        },
    })
   
    if (response.statusText === 'Unauthorized') {
        throw new Error("Você não tem autorização")
     }
  
    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
 
    const fornecedadores = await response.json() 
 
    return fornecedadores ;
    
}

const GetModaliadeSituacao = async (usuario:UsuarioLogadoI) => {

    const url = `${baseUrl}/processo/situacaomodalidade`;	
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`

        },
    })
   
    if (response.statusText === 'Unauthorized') {
        throw new Error("Você não tem autorização")
     }
  
    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
 
    const situacaoModalidade = await response.json() 
 
    return situacaoModalidade ;
    
}


const CreateProcesso = async (usuario:UsuarioLogadoI,data:ProcessoCreateI) => {
    const url = `${baseUrl}/processo`;
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const processo = await response.json() 
 
    return processo ;
}

const UpdateProcesso = async (usuario:UsuarioLogadoI,id:string,data:ProcessoCreateI) => {
    const url = `${baseUrl}/processo/${id}`;
    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const processo = await response.json() 
 
    return processo ;
}

const GetProcessoById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/processo/${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        }
    })

    if(!response.ok) {
        throw new Error("Conexão com a rede está com problemaas");
    }
    
   
    const processo = await response.json();
    

    return processo;
}

export{GetProcessos,CreateProcesso,UpdateProcesso,GetProcessoById,GetModaliadeSituacao}