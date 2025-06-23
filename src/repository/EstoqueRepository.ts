import { Estoque } from "../model/Estoque";

export class EstoqueRepository{
    private static instance:EstoqueRepository;
    private EstoqueLista : Estoque[] = [];

    private constructor(){}

    public static getInstance():EstoqueRepository{
        if(!this.instance){
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    InsereExemplar(exemplar:Estoque):void{
        console.log("Inserindo exemplar no repositório:", exemplar);
        this.EstoqueLista.push(exemplar);
    }
    ExibeExemplares():Estoque[]{ //esta funcionando
        console.log("Lista atual de exemplares:", this.EstoqueLista);
        return this.EstoqueLista;
    }
    ExibeExemplarPorId(id:number):Estoque|undefined{
        return this.EstoqueLista.find(e=>e.id === id);
    }
    AtualizaDisponibilidadePorId(id:number,ExemplarNovo:Estoque):boolean{
        const ExemplarAntigo = this.EstoqueLista.find(e=>e.id===id);
        if(ExemplarAntigo){
            ExemplarAntigo.disponivel = ExemplarNovo.disponivel;
            ExemplarAntigo.quantidade = ExemplarNovo.quantidade;
            ExemplarAntigo.quantidade_emprestada = ExemplarNovo.quantidade_emprestada;
            return true;
        }
        return false;
    }
    RemoveExemplarPorId(id:number):boolean{
        const deletar = this.EstoqueLista.findIndex(e=>e.id===id);
        if(deletar !== -1){
            this.EstoqueLista.splice(deletar,1);
            return true;
        }
        return false;
    }

    ValidaId(id:number):boolean{
        const repetido = this.EstoqueLista.findIndex(e=>e.id===id);
        if(repetido!==-1){
            return true;
        }
        return false;
    }
}