import CriarSituacao from "@/components/situacao/CreateSituacao";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";



async function NewEquipamento() {
  const usuarioLogado = await getUsuarioLogado();
  return (
    <CriarSituacao usuario={usuarioLogado} />
    );
}

export default NewEquipamento;