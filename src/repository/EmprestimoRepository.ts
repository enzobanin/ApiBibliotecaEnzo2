import { executarComandoSQL } from "../database/mysql";
import { Emprestimo } from "../model/entidades/Emprestimo";

export class EmprestimoRepository{
    private static instance: EmprestimoRepository;

    private constructor(){
        this.CreateTableEmprestimo();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    
    private async CreateTableEmprestimo(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.emprestimo(
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf_usuario VARCHAR(255) NOT NULL,
        isbn_livro VARCHAR(255) NOT NULL,
        data_emprestimo Date NOT NULL,
        data_devolucao Date,
        data_entrega Date,
        dias_atraso INT,
        suspensao_ate Date
        )`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela Emprestimo criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela emprestimo: ', err);
        }
    }

    // RegistraEmprestimo(emp:Emprestimo):void{
    //     this.EmprestimoLista.push(emp);
    // }
    

    // MostraTodosOsEmprestimos():Emprestimo[]{
    //     return this.EmprestimoLista;
    // }


    // RegistraDataDevolucao(id:number):Emprestimo|undefined{
    //     const devolucao = this.EmprestimoLista.find(e=>e.id === id);
    //     const hoje : Date = new Date();
    //     if(devolucao){
    //         devolucao.data_entrega = hoje; 
    //         return devolucao;
    //     }
    //     throw new Error("Emprestimo não encontrado");
    // }


    // VerificaEmprestimosAtivosUsuarios(cpf:string):Emprestimo[]{ // retorna quantos empréstimos ativos o usuário tem
    //     return this.EmprestimoLista.filter(e=>e.cpf_usuario === cpf
    //         && e.data_entrega === null
    //      );
    // }


    // BuscaEmprestimoPorId(id:number):Emprestimo{
    //     const emp = this.EmprestimoLista.find(e=>e.id === id);
    //     if(!emp){
    //         throw new Error("Emprestimo nao encontrado");
    //     }
    //     return emp;
    // }
    
    // BuscaEmprestimoPorUsuario(cpf_usuario:string):Emprestimo[]{
    //     return this.EmprestimoLista.filter(e=>e.cpf_usuario === cpf_usuario);
    // }
}