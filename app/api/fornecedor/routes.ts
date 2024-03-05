import { baseUrl, takeBase } from "@/config/base";
import { FornecedorCreateI } from "@/interfaces/fornecedor/inteface";


import { UsuarioLogadoI } from "@/interfaces/usuario/interface";


const GetFornecedores = async (usuario:UsuarioLogadoI,skip:number,filter:string) => {

    const url = `${baseUrl}/fornecedor/findall?take=${takeBase}&skip=${skip}&filter=${filter}`;	
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


const CreateFornecedores = async (usuario:UsuarioLogadoI,data:FornecedorCreateI) => {
    const url = `${baseUrl}/fornecedor`;
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
    const fornecedor = await response.json() 
 
    return fornecedor ;
}

const UpdateFornecedor = async (usuario:UsuarioLogadoI,id:string,data:FornecedorCreateI) => {
    const url = `${baseUrl}/fornecedor/${id}`;
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
    const fornecedor = await response.json() 
 
    return fornecedor ;
}

const GetFornecedorById = async (usuario:UsuarioLogadoI,id:string)=>{
    const url = `${baseUrl}/fornecedor/${id}`;
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
    
   
    const fornecedor = await response.json();
    

    return fornecedor;
}

export{GetFornecedores,CreateFornecedores,UpdateFornecedor,GetFornecedorById}