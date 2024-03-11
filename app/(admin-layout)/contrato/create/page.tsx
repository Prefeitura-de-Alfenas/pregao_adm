


import CriarProcesso from "@/components/processo/CreateProcesso";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function NewFornecedor() {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <CriarProcesso usuario={usuarioLogado}/>
    );
}

export default NewFornecedor;