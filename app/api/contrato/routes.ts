import { baseUrl, takeBase } from "@/config/base";
import { ContratoCreateI } from "@/interfaces/Contrato/inteface";
import { ProcessoCreateI, ProcessoxFornecedorI } from "@/interfaces/Processo/inteface";



import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const Getcontratos = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/contrato/findall?take=${takeBase}&skip=${skip}&filter=${filter}`;	
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

const GetProcessoContratoOrgao = async (usuario:UsuarioLogadoI,id:string) => {

    const url = `${baseUrl}/contrato/processocontratofindall/${id}`;	
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
const GetProcessosDesativados = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/processo/desativados?take=${takeBase}&skip=${skip}&filter=${filter}`;	
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

const GetFornecedoresProcesso = async (usuario:UsuarioLogadoI,id:string) => {

    const url = `${baseUrl}/processo/processofornecedor/${id}`;	
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
 
    const processo = await response.json() 
 
    return processo ;
    
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


const CreateContrato = async (usuario:UsuarioLogadoI,data:ContratoCreateI) => {
    const url = `${baseUrl}/contrato`;
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
    const contrato = await response.json() 
 
    return contrato ;
}

const UpdateContrato = async (usuario:UsuarioLogadoI,id:string,data:ContratoCreateI) => {
    const url = `${baseUrl}/contrato/${id}`;
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

const GetContratoById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/contrato/${id}`;
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
    
   
    const contrato = await response.json();
    

    return contrato;
}

const ForncedorChange = async(data:ProcessoxFornecedorI) =>{
    const url = `${baseUrl}/processo/fornecedorchange`

    const response = await fetch(url,{
      method:'PATCH',
      headers:{
         'content-type': 'application/json',
         'Authorization' :`Bearer ${data.usuario.user.access_token}`
      },
      body: JSON.stringify(data)
    })
 
    if(!response.ok) {
     throw new Error("Conexão com a rede está com problemas");
    }

    
    const usuario = await response.json()


    return usuario;
}

const GetFornecedoresemprocesso = async (usuario:UsuarioLogadoI,skip:number,ativo:boolean,IdProcesso:string,filter:string) => {

    const url = `${baseUrl}/processo/getallfornecedores?id=${IdProcesso}&take=${takeBase}&skip=${skip}&ativo=${ativo}&filter=${filter}`;	
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
   

const DeleteProcesso = async (usuario:UsuarioLogadoI,id:string) => {

    const url = `${baseUrl}/processo/changeprocesso/${id}`;	

    const response = await fetch(url,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization' :`Bearer ${usuario.user.access_token}`
        },
 
    })
  

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problemas")
    }
    const processo = await response.json() 
 
    return processo ;
    
}

const GetFornecedorOrgao = async (usuario:UsuarioLogadoI)=>{
    const url = `${baseUrl}/contrato/fornecedorandorgao`;
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
    
   
    const fornedororgao = await response.json();
    

    return fornedororgao;
}

export{GetProcessoContratoOrgao,Getcontratos,CreateContrato,UpdateContrato,GetContratoById,GetModaliadeSituacao,GetFornecedoresProcesso,ForncedorChange,GetFornecedoresemprocesso,DeleteProcesso,GetProcessosDesativados,GetFornecedorOrgao}