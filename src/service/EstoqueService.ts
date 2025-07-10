import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroService } from "./LivroService";

export class EstoqueService{
    private static instance : EstoqueService;
    private EstoqueRepository:EstoqueRepository= EstoqueRepository.getInstance();
    private livroService = LivroService.getInstance();

    private constructor() {}

    public static getInstance(): EstoqueService {
        if (!this.instance) {
            this.instance = new EstoqueService();
        }
        return this.instance;
    }

    VerificaExemplarExistente(id:number):boolean{
        if(this.EstoqueRepository.ExibeExemplarPorId(id)){
            throw new Error("Já existe um livro com este ID");;
        }
        return true;
    }
    // VerificaExemplarDisponivel(id:number):boolean{
    //     const exemplar = this.EstoqueRepository.ExibeExemplarPorId(id);
    //     if(!exemplar){
    //         throw new Error("Exemplar não encontrado");
    //         } 
    //     if(exemplar){
    //         if(exemplar.status = 'emprestado'){
    //         throw new Error("Todos os exemplares estão emprestados");
    //         }
    //     }
    //     return true;
    // }

    VerificaQuantidade(quantidade:number, quantidade_emprestada:number):void{
        if(quantidade < quantidade_emprestada){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
        }
        if(quantidade < 0 || quantidade_emprestada < 0){
            throw new Error("Quantidade inválida");
        }
    }
    InsereNovoExemplar(data:any):Estoque{
        const{id, livro_isbn,quantidade, quantidade_emprestada
            } = data;
        if(!livro_isbn||!id){
            throw new Error("Informações Incompletas");
        }
        this.VerificaExemplarExistente(id);
        this.livroService.GetLivrosPorISBN(livro_isbn); 
        const novoExemplar = new Estoque(id,livro_isbn,quantidade,quantidade_emprestada);
        this.VerificaQuantidade(quantidade, quantidade_emprestada);
        this.EstoqueRepository.InsereExemplar(novoExemplar);
        if(novoExemplar.quantidade === novoExemplar.quantidade_emprestada){
            novoExemplar.status = 'emprestado';
        }
        console.log("Exemplar salvo", novoExemplar);
        return novoExemplar;
    }

    GetExemplarComDisponibilidade():Estoque[]{
        return this.EstoqueRepository.ExibeExemplares();
    }
    
    GetExemplarPorID(id:number):Estoque|undefined{
        const exemplar = this.EstoqueRepository.ExibeExemplarPorId(id);
        return exemplar;
    }
    PutDisponibilidade(id:number, exemplarNovo:Estoque):Estoque|undefined{
        const exemplar = this.EstoqueRepository.AtualizaDisponibilidadePorId(id,exemplarNovo);
        if(exemplar){
            return exemplar;
        }
        throw new Error("Exemplar não encontrado");
        
    }
    DeleteExemplarPorId(id:number):Estoque|undefined{
        const deletar = this.EstoqueRepository.RemoveExemplarPorId(id);
        if(!deletar){
            throw new Error ("Exemplar não encontrado");
        }
        return deletar;
    }

}