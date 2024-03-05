
import EditarSituacao from "@/components/situacao/EditSituacao";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";



async function EditEquipamento({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado();
  return (
    <EditarSituacao IdSutuacao={params.id} usuario={usuarioLogado}/>
    );
}

export default EditEquipamento;