
import EditarContrato from "@/components/contrato/EditarContrato";


import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function EditContrato({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarContrato id={params.id} usuario={usuarioLogado}/>
    );
}

export default EditContrato;