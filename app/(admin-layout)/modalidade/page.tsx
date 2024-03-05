import TableModadlidade from "@/components/modalidade/TableModalidade";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  Modalidades() {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableModadlidade usuario={usuarioLogado} />
     );
}

export default Modalidades;