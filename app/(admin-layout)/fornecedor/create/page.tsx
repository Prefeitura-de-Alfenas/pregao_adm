import CriarFornecedor from "@/components/fornecedor/CreateFornecedor";


import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




async function NewFornecedor() {
  const usuarioLogado = await getUsuarioLogado()
  return (
    <CriarFornecedor usuario={usuarioLogado}/>
    );
}

export default NewFornecedor;