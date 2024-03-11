import { ProcessoI } from "../Processo/inteface";
import { PessoaI } from "../pessoa/interface";

export interface Arquivo{

    IdArquivo: string,
    Nome: string,
    Caminho: string,
    IdProcesso: string,
    Processo: ProcessoI

}

export interface ArquivoCreateI{
    file?: File,
    Nome: string,
    IdProcesso: string,

}


