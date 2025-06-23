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
    RegistraDevolucao(id:number):boolean{
        const devolucao = this.EmprestimoLista.find(e=>e.id === id);
        const hoje : Date = new Date();
        if(devolucao){
            devolucao.data_devolucao = hoje; 
            devolucao.data_entrega = hoje;
            return true;
        }
        return false;
    }
    VerificaEmprestimosAtivosUsuarios(id:number):Emprestimo[]{
        const data = new Date(0);
         
        return this.EmprestimoLista.filter(e=>e.usuario_id === id
            && e.data_devolucao.getTime() === data.getTime()
         );
    }

    
}