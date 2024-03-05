import CriarModalidade from "@/components/modalidade/CreateBeneficio";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function NewModalidade() {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <CriarModalidade usuario={usuarioLogado}/>
    );
}

export default NewModalidade;