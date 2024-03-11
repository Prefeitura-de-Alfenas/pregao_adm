import TableFornecedorProcesso from "@/components/processo/ForneceoresProcesso";


import { getUsuarioLogado } from "@/utils/getUsuarioLogado";




 async function  FornecedoresProcesso({ params }: { params: { id: string } }) {
   const usuarioLogado = await getUsuarioLogado();
    return ( 
      <TableFornecedorProcesso usuario={usuarioLogado} IdProcesso={params.id}/>
     );
}

export default FornecedoresProcesso;