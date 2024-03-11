



import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import TableProcessoInativos from "@/components/admin/TableProcessoInativos";



 async function  PessoasInativas() {
  const session = await getServerSession(authOptions) as any
    return ( 
      <TableProcessoInativos usuario={session}  />
     );
}

export default PessoasInativas;