import { MoadalidadeI } from "../moadalidade/inteface"
import { SituacaoI } from "../situacao/interface"
import { UsuarioLogadoI } from "../usuario/interface";



export interface ContratoI{
    IdContratoAditivos: string,
    IdModalidade?:             number,
    IdOrgao?:               number,
    IdFornecedor?:               number,
    NumeroContrato: string,
    Numeroprocesso:      string,
    NumeroPregao:                   string,
    Valor:           number,
    DataPublicacao:             Date,
    DataVencimento?:             Date,
    DataAssinatura?:             Date,
    Objeto?:                  string,
    CNPJ?:                  string,
    IdUsuario:                number,
    Modalidade:             MoadalidadeI,
    
}

export interface ProcessoCreateI{

    IdModalidade?:             number,
    IdOrgao?:               number,
    IdFornecedor?:               number,
    NumeroContrato?: string,
    Numeroprocesso?:      string,
    NumeroPregao:                   string,
    Valor:           number,
    DataPublicacao?:             Date,
    DataVencimento?:             Date,
    DataAssinatura?:             Date,
    Objeto?:                  string,
    CNPJ?:                  string,
    IdUsuario:                number,
    Modalidade:             MoadalidadeI,

 


}



export interface ContratoxFornecedorI{
    IdProcesso:   string;
    IdFornecedor: string;
    usuario:UsuarioLogadoI;
}

