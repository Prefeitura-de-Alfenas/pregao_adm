


export interface FornecedorI{
    IdFornecedor: string,
    Empresa:             string,
    Email?:               string,
    CpfCnpj:             string,
    Endereco:            string,
    Tipo:                string,
    Telefone?:            string,

}

export interface FornecedorCreateI{

    Empresa:             string,
    Email?:               string,
    CpfCnpj:             string,
    Endereco:            string,
    Tipo:                string,
    Telefone?:            string,

 


}

export interface FornecedorEntregaI{
    IdFornecedor: string,
    Empresa:             string,
    Email?:               string,
    CpfCnpj:             string,
    Endereco:            string,
    Tipo:                string,
    Telefone?:            string,

   
}

export interface ProcessoContratoxFornecedorI{
    IdProcesso:   string;
    IdFornecedor: string;
    fornecedor:FornecedorI;

}

