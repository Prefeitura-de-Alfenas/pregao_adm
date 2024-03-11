import TableArquivos from "@/components/arquivo/TableArquivos";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";

 async function  Arquivo({ params }: { params: { IdProcesso: string } }) {
  const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableArquivos IdProcesso={params.IdProcesso} usuario={usuarioLogado} />
     );
}

export default Arquivo;