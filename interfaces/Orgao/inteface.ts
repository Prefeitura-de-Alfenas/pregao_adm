export interface OrgaoI{
    IdOrgao:string
    Nome:string
}


export interface ProcessoxOrgaoI{
    IdProcesso:number,
    IdOrgao:number,
    orgao:OrgaoI,
}