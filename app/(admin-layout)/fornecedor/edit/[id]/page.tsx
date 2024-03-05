
import EditarFornecedor from "@/components/fornecedor/EditarFornecedor";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function EditModalidade({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarFornecedor IdFornecedor={params.id} usuario={usuarioLogado}/>
    );
}

export default EditModalidade;