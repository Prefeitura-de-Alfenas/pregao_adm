import { baseUrl, takeBase } from "@/config/base";
import { ProcessoCreateI, ProcessoxFornecedorI } from "@/interfaces/Processo/inteface";



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

export{GetProcessos,CreateProcesso,UpdateProcesso,GetProcessoById,GetModaliadeSituacao,GetFornecedoresProcesso,ForncedorChange,GetFornecedoresemprocesso,DeleteProcesso,GetProcessosDesativados}