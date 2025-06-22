import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroService } from "./LivroService";

export class EstoqueService{
    private EstoqueRepository:EstoqueRepository= EstoqueRepository.getInstance();
    private livroService = LivroService.getInstance();

    VerificaIdRepetido(id:number):void{
        if(this.EstoqueRepository.ValidaId(id)){
            throw new Error("Já existe um livro com este ID");
        }
        return;
    }
    InsereNovoExemplar(data:any):Estoque{
        const{id, livro_id,isbn, quantidade, 
            quantidade_emprestada} = data;
        if(!livro_id||!isbn){
            throw new Error("Informações Incompletas");
        }
        this.VerificaIdRepetido(id);
        const livroExistente = this.livroService.GetLivrosPorISBN(isbn);
        if(!livroExistente){
            throw new Error("ISBN inexistente")
        }
        const novoExemplar = new Estoque(id,livro_id,quantidade,quantidade_emprestada,true);
        this.EstoqueRepository.InsereExemplar(novoExemplar);
        console.log("Exemplar salvo", novoExemplar);
        return novoExemplar;
    }

    GetExemplarComDisponibilidade():Estoque[]{
        return this.EstoqueRepository.ExibeExemplares()
        .filter(e => e.disponivel === true && e.quantidade > e.quantidade_emprestada);
    }
    
    GetExemplarPorID(id:number):Estoque|undefined{
        const listar = this.EstoqueRepository.ExibeExemplarPorId(id);
        if(!listar){
            throw new Error("Id não encontrado")
        }
        return listar;
    }
    DeleteExemplarPorId(id:number):boolean{
        const deletar = this.EstoqueRepository.RemoveExemplarPorId(id);
        if(deletar==false){
            throw new Error ("Exemplar não encontrado");
        }
        return deletar;
    }

}