import { ContratoI } from "../Contrato/inteface";
import { ProcessoI } from "../Processo/inteface";
import { PessoaI } from "../pessoa/interface";

export interface Arquivo{

    IdArquivo: string,
    Nome: string,
    Caminho: string,
    IdProcesso: string,
    Processo: ProcessoI

}
export interface ArquivoContrato{

    IdArquivo: string,
    Nome: string,
    Caminho: string,
    IdContratoAditivos: string,
    ContratosAditivos: ContratoI

}

export interface ArquivoCreateI{
    file?: File,
    Nome: string,
    IdProcesso?: string,
    IdContratoAditivos?: string | undefined,

}


