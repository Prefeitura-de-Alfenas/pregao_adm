


import TableContrato from "@/components/contrato/TableContrato";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  Fornecedor() {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableContrato usuario={usuarioLogado} />
     );
}

export default Fornecedor;