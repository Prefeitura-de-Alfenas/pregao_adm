


import TableProcesso from "@/components/processo/TableProcesso";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  Fornecedor() {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableProcesso usuario={usuarioLogado} />
     );
}

export default Fornecedor;