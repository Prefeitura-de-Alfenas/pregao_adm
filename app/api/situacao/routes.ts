import { baseUrl, takeBase } from "@/config/base";
import { SituacaoCreateI } from "@/interfaces/situacao/interface";

import { UsuarioLogadoI } from "@/interfaces/usuario/interface";

const GetSituacaos = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/situacao/findall?take=${takeBase}&skip=${skip}&filter=${filter}`;

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
    const equipamentos = await response.json() 
 
    return equipamentos ;
    
}
const GetEquipamentosAll = async (usuario:UsuarioLogadoI) => {

    const url = `${baseUrl}/equipamento`;	
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
    const equipamentos = await response.json() 
 
    return equipamentos ;
    
}

const CreateSituacao = async (usuario:UsuarioLogadoI,data:SituacaoCreateI) => {
    const url = `${baseUrl}/situacao`;
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
    const situacao = await response.json() 
 
    return situacao ;
}

const UpdateSituacao = async (usuario:UsuarioLogadoI,id:string,data:SituacaoCreateI) => {
    const url = `${baseUrl}/situacao/${id}`;
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
    const situacao = await response.json() 
 
    return situacao ;
}

const GetSituacaoById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/situacao/${id}`;
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
    
   
    const situacao = await response.json();
    

    return situacao;
}

export{GetSituacaos,CreateSituacao,UpdateSituacao,GetSituacaoById,GetEquipamentosAll}