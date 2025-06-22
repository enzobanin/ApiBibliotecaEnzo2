import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroService } from "./LivroService";

export class EstoqueService{
    private EstoqueRepository:EstoqueRepository= EstoqueRepository.getInstance();
    private livroService = new LivroService();

    VerificaIdRepetido(id:number):void{
        if(this.EstoqueRepository.ValidaId(id)){
            throw new Error("Já existe um livro com este ID");
        }
        return;
    }

    InsereNovoExemplar(data:any):Estoque{
        const{id, livro_id,isbn, quantidade, 
            quantidade_emprestada, disponivel} = data;
        if(!livro_id||!isbn){
            throw new Error("Informações Incompletas");
        }
        this.VerificaIdRepetido(id);
        const livroExistente = this.livroService.GetLivrosPorISBN(isbn);
        if(!livroExistente){
            throw new Error("ISBN inexistente")
        }
        const novoExemplar = new Estoque(id,livro_id,quantidade+1,quantidade_emprestada,true);
        this.EstoqueRepository.InsereExemplar(novoExemplar);
        return novoExemplar;
    }
}