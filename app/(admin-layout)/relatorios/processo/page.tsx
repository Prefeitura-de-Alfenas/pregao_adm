import TableProcessoPorData from "@/components/relatorios/processo/processospordata";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";



 async function  ProcessoRelatorioPorData() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TableProcessoPorData  usuarioLogado={session}  />
     );
}

export default ProcessoRelatorioPorData;