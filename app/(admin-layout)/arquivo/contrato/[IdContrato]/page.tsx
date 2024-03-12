
import TableArquivosContrato from "@/components/arquivo/TableArquivosContrato";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

 async function  Arquivo({ params }: { params: { IdContrato: string } }) {
  const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableArquivosContrato IdContrato={params.IdContrato} usuario={usuarioLogado} />
     );
}

export default Arquivo;