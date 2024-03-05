import TableFornecedor from "@/components/fornecedor/TableFornecedor";


import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  Fornecedor() {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableFornecedor usuario={usuarioLogado} />
     );
}

export default Fornecedor;