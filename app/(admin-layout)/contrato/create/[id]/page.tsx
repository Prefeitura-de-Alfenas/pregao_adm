


import CriarContrato from "@/components/contrato/CreateContrato";

import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function NewContrato({ params }: { params: { id: string } }) {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <CriarContrato usuario={usuarioLogado} IdProcesso={params.id}/>
    );
}

export default NewContrato;