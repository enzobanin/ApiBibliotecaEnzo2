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
        this.EstoqueLista.push(exemplar);
    }
    ExibeExemplares():Estoque[]{ 
        return this.EstoqueLista.filter(e => e.status === 'disponivel');
    }
    ExibeExemplarPorId(id:number):Estoque|undefined{
        const exemplar = this.EstoqueLista.find(e=>e.id === id);
        if(exemplar){
            return exemplar;
        }
        throw new Error("Exemplar não encontrado");
    }
    AtualizaDisponibilidadePorId(id:number,ExemplarNovo:Estoque):Estoque|undefined{
        const ExemplarAtual = this.EstoqueLista.find(e=>e.id===id);
        if(ExemplarAtual){
            ExemplarAtual.quantidade = ExemplarNovo.quantidade;
            ExemplarAtual.quantidade_emprestada = ExemplarNovo.quantidade_emprestada;
            if(ExemplarAtual.quantidade === ExemplarAtual.quantidade_emprestada){
                ExemplarAtual.status = 'emprestado';
            }
            else{
                ExemplarAtual.status = 'disponivel';
            }
            return ExemplarAtual;
        }
        return;
    }
    RemoveExemplarPorId(id:number):Estoque|undefined{
        const deletar = this.EstoqueLista.find(e=>e.id===id);
        if(deletar){
            if(deletar.status === 'emprestado'){
                throw new Error("Exemplar não pode ser deletado, pois está emprestado");
            }
            return deletar;
        }
    }

    // ExisteEstoqueId(id:number):boolean{
    //     const repetido = this.EstoqueLista.findIndex(e=>e.id===id);
    //     if(repetido){
    //         return true;
    //     }
    //     return false;
    // }
}