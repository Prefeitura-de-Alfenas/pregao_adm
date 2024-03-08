

export  interface UsuarioI{
    IdUsuario: number,
    Nome: string,
    Email: string,
    Senha: string,

  
}


export  interface UsuarioCreateI{
    Nome: string,
    Email: string,
    Senha: string,

}


export  interface PermissaoI{
    IdPermisao: string,
    Nome: string,

}


export interface PermissionChangeProps{
    IdUsuario:string;
    IdPermisao:string;
    usuario:UsuarioLogadoI;
}

export interface UsuarioLogadoI{
    email:string;
    user:{
        id:string,
        email:string,
        nome:string,
        role:string[],
        access_token:string
    };
    iat:string;
    exp:string;
    jti:string;
}
