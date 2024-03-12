import { FilePlus2 } from "lucide-react";
import Link from "next/link";
interface FiexedButtonProps{
  pessoaId:string
}

const FixedButtonContrato = ({pessoaId}:FiexedButtonProps) => {
  return (
    <Link href={`/arquivo/carregarcontrato/${pessoaId}`} className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg">
    
      <FilePlus2  className="text-2xl" /> {/* Ícone de adição */}
    
    </Link>
  );
};

export default FixedButtonContrato;