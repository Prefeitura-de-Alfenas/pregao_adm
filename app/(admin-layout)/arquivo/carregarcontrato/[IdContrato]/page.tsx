
import { getServerSession } from "next-auth";
import { UsuarioLogadoI } from "@/interfaces/usuario/interface";
import { authOptions } from "@/utils/authOptions";
import CarregarArquivo from "@/components/arquivo/CarregarArquivo";

async function Arquivo({ params }: { params: { IdContrato: string } }) {
    const session = await getServerSession(authOptions) as UsuarioLogadoI
    return (  
        <CarregarArquivo IdContratoAditivos={params.IdContrato} userLogado={session} />
    );
}
export default Arquivo;
