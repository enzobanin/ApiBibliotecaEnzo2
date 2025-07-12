import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository{
    private static instance: EmprestimoRepository;
    private EmprestimoLista: Emprestimo[] = [];
    private constructor(){}

    public static getInstance():EmprestimoRepository{
        if(!this.instance){
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    RegistraEmprestimo(emp:Emprestimo):void{
        this.EmprestimoLista.push(emp);
    }
    MostraTodosOsEmprestimos():Emprestimo[]{
        return this.EmprestimoLista;
    }
    RegistraDataDevolucao(id:number):Emprestimo|undefined{
        const devolucao = this.EmprestimoLista.find(e=>e.id === id);
        const hoje : Date = new Date();
        if(devolucao){
            devolucao.data_entrega = hoje; 
            return devolucao;
        }
        throw new Error("Emprestimo não encontrado");
    }
    VerificaEmprestimosAtivosUsuarios(cpf:string):Emprestimo[]{ // retorna quantos empréstimos ativos o usuário tem
        return this.EmprestimoLista.filter(e=>e.cpf_usuario === cpf
            && e.data_entrega === null
         );
    }
    BuscaEmprestimoPorId(id:number):Emprestimo{
        const emp = this.EmprestimoLista.find(e=>e.id === id);
        if(!emp){
            throw new Error("Emprestimo nao encontrado");
        }
        return emp;
    }
    BuscaEmprestimoPorUsuario(cpf_usuario:string):Emprestimo[]{
        return this.EmprestimoLista.filter(e=>e.cpf_usuario === cpf_usuario);
    }
    ExisteEmprestimoAtivoPorLivro(isbn: string):boolean { // nao esta sendo utilizada
        return this.EmprestimoLista.some(e =>
        e.isbn_livro === isbn && e.data_devolucao.getTime() === new Date(0).getTime()
        );
    }

    
}