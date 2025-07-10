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
            return true;
        }
        throw new Error("Já existe um livro com este ID");
    }
    VerificaExemplarDisponivel(id:number):boolean{
        const exemplar = this.EstoqueRepository.ExibeExemplarPorId(id);
        if(!exemplar){
            throw new Error("Exemplar não encontrado");
            } 
        if(exemplar){
            if(exemplar.status = 'emprestado'){
            throw new Error("Todos os exemplares estão emprestados");
            }
        }
        return true;
    }
    InsereNovoExemplar(data:any):Estoque{
        const{id, livro_isbn,quantidade, quantidade_emprestada
            } = data;
        if(!livro_isbn||!id){
            throw new Error("Informações Incompletas");
        }
        this.livroService.GetLivrosPorISBN(livro_isbn); 
        const novoExemplar = new Estoque(id,livro_isbn,quantidade,quantidade_emprestada);
        this.EstoqueRepository.InsereExemplar(novoExemplar);
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