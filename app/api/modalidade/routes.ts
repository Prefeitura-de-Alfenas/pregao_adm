import { baseUrl, takeBase } from "@/config/base";
import { MoadalidadeCreateI } from "@/interfaces/moadalidade/inteface";

import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const GetModalidades = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/modalidade/findall?take=${takeBase}&skip=${skip}&filter=${filter}`;	
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
 
    const modalidades = await response.json() 
 
    return modalidades ;
    
}


const CreateModalidade = async (usuario:UsuarioLogadoI,data:MoadalidadeCreateI) => {
    const url = `${baseUrl}/modalidade`;
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
    const beneficio = await response.json() 
 
    return beneficio ;
}

const UpdateModalidade = async (usuario:UsuarioLogadoI,id:string,data:MoadalidadeCreateI) => {
    const url = `${baseUrl}/modalidade/${id}`;
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
    const modalidade = await response.json() 
 
    return modalidade ;
}

const GetModalidadeById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/modalidade/${id}`;
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
    
   
    const modalidade = await response.json();
    

    return modalidade;
}

export{CreateModalidade,UpdateModalidade,GetModalidadeById,GetModalidades}