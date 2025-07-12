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

    VerificaExemplarExistente(isbn:string):boolean{
        if(this.EstoqueRepository.ExibeExemplarPorISBN(isbn)){
            throw new Error("Já existe um exemplar com este ISBN");;
        }
        return true;
    }

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
        this.VerificaExemplarExistente(livro_isbn); // pra nao inserir repetido
        this.livroService.ListaLivrosPorISBN(livro_isbn); // verifica se o livro existe
        const novoExemplar = new Estoque(id,livro_isbn,quantidade,quantidade_emprestada);
        this.VerificaQuantidade(quantidade, quantidade_emprestada);
        this.EstoqueRepository.InsereExemplar(novoExemplar);
        if(novoExemplar.quantidade === novoExemplar.quantidade_emprestada){
            novoExemplar.status = 'emprestado';
        }
        console.log("Exemplar salvo", novoExemplar);
        return novoExemplar;
    }

    ListaExemplarComDisponibilidade():Estoque[]{
        return this.EstoqueRepository.ExibeExemplares();
    }
    
    ListaExemplarPorISBN(isbn:string):Estoque|undefined{
        const exemplar = this.EstoqueRepository.ExibeExemplarPorISBN(isbn);
        return exemplar;
    }
    AtualizaDisponibilidade(isbn:string, exemplarNovo:Estoque):Estoque|undefined{
        const exemplar = this.EstoqueRepository.AtualizaDisponibilidadePorISBN(isbn,exemplarNovo);
        if(exemplar){
            return exemplar;
        }
        throw new Error("Exemplar não encontrado");
        
    }
    DeleteExemplarPorISBN(isbn:string):Estoque|undefined{
        const deletar = this.EstoqueRepository.RemoveExemplarPorISBN(isbn);
        if(!deletar){
            throw new Error ("Exemplar não encontrado");
        }
        return deletar;
    }

}