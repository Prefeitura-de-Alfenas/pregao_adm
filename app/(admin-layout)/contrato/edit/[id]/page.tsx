
import EditarProcesso from "@/components/processo/EditarProcesso";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function EditProcesso({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarProcesso IdProcesso={params.id} usuario={usuarioLogado}/>
    );
}

export default EditProcesso;