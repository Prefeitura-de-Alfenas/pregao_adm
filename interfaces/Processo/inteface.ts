import { MoadalidadeI } from "../moadalidade/inteface"
import { SituacaoI } from "../situacao/interface"
import { UsuarioLogadoI } from "../usuario/interface";



export interface ProcessoI{
    IdProcesso: string,
    IdSituacao?:               number,
    IdModalidade?:             number,
    NumeroprocessoPrefeitura?: string,
    NumeroprocessoSaude?:      string,
    Numero:                   string,
    ValorLicitacao:           number,
    DataAbertura:             Date,
    Objeto:                  string,
    IdUsuario:                number,
    Modalidade:             MoadalidadeI,
    Situacao:               SituacaoI,
}

export interface ProcessoCreateI{

    IdSituacao:               number,
    IdModalidade:             number,
    NumeroprocessoPrefeitura?: string,
    NumeroprocessoSaude?:      string,
    Numero:                   string,
    ValorLicitacao:           number,
    DataAbertura:             Date,
    Objeto:                  string,
    IdUsuario?:                number,

 


}

export interface ProcessoEntregaI{
    IdProcesso: string,
    IdSituacao?:               number,
    IdModalidade?:             number,
    NumeroprocessoPrefeitura?: string,
    NumeroprocessoSaude?:      string,
    Numero:                   string,
    ValorLicitacao:           number,
    DataAbertura:             Date,
    Objeto:                  string,
    IdUsuario:                number,

   
}

export interface ProcessoxFornecedorI{
    IdProcesso:   string;
    IdFornecedor: string;
    usuario:UsuarioLogadoI;

}

