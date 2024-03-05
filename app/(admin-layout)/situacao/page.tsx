import TableSituacao from "@/components/situacao/TableSituacao";
;
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";


 async function  Situacao() {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableSituacao  usuario={usuarioLogado}/>
     );
}

export default Situacao;