
import EditarModalidade from "@/components/modalidade/EditarModalidade";
import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function EditModalidade({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <EditarModalidade IdModalidade={params.id} usuario={usuarioLogado}/>
    );
}

export default EditModalidade;