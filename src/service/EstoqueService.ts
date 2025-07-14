import { EstoqueEntradaDto } from "../model/dto/EstoqueEntradaDto";
import { EstoqueSaidaDto } from "../model/dto/EstoqueSaidaDto";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroService } from "./LivroService";

export class EstoqueService{
    private static instance : EstoqueService;
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroService = LivroService.getInstance();

    private constructor() {}

    public static getInstance(){
        if (!this.instance) {
            this.instance = new EstoqueService();
        }
        return this.instance;
    }

    // VerificaExemplarExistente(isbn:string):boolean{
    //     if(this.EstoqueRepository.ExibeExemplarPorISBN(isbn)){
    //         throw new Error("Já existe um exemplar com este ISBN");;
    //     }
    //     return true;
    // }
    async VerificaExemplarExistente(livro_isbn:string):Promise<EstoqueSaidaDto|boolean>{
        const isbnRepetido = await this.estoqueRepository.SelectExemplarPorISBN(livro_isbn);
        if(isbnRepetido.livro_isbn === livro_isbn){
            throw new Error("Já existe um exemplar com este ISBN")
        }
        return false;
    }

    // VerificaQuantidade(quantidade:number, quantidade_emprestada:number):void{
    //     if(quantidade < quantidade_emprestada){
    //         throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
    //     }
    //     if(quantidade < 0 || quantidade_emprestada < 0){
    //         throw new Error("Quantidade inválida");
    //     }
    // }

    async VerificaQuantidade(quantidade:number, quantidade_emprestada:number):Promise<void>{
        if(quantidade < quantidade_emprestada){
            throw new Error("Quantidade emprestada não pode ser maior que a quantidade total");
        }
        if(quantidade < 0 || quantidade_emprestada < 0){
            throw new Error("Quantidade não pode ser menor que zero");
        }
    }
    // InsereNovoExemplar(data:any):Estoque{
    //     const{id, livro_isbn,quantidade, quantidade_emprestada
    //         } = data;
    //     if(!livro_isbn||!id){
    //         throw new Error("Informações Incompletas");
    //     }
    //     this.VerificaExemplarExistente(livro_isbn); // pra nao inserir repetido
    //     this.livroService.ListaLivrosPorISBN(livro_isbn); // verifica se o livro existe
    //     const novoExemplar = new Estoque(id,livro_isbn,quantidade,quantidade_emprestada);
    //     this.VerificaQuantidade(quantidade, quantidade_emprestada);
    //     this.EstoqueRepository.InsereExemplar(novoExemplar);
    //     if(novoExemplar.quantidade === novoExemplar.quantidade_emprestada){
    //         novoExemplar.status = 'emprestado';
    //     }
    //     console.log("Exemplar salvo", novoExemplar);
    //     return novoExemplar;
    // }

    async InsertExemplar(data:EstoqueEntradaDto):Promise<EstoqueSaidaDto>{
        const {livro_isbn,quantidade,quantidade_emprestada} = data;
        if(!livro_isbn){
            throw new Error("É necessário informar o ISBN do livro");
        }
        await this.VerificaExemplarExistente(livro_isbn);
        await this.livroService.SelectLivroPorISBN(livro_isbn);
        await this.VerificaQuantidade(quantidade,quantidade_emprestada);
        return this.estoqueRepository.InsertEstoque(livro_isbn,quantidade,
            quantidade_emprestada,
        )
    }

    // ListaExemplarComDisponibilidade():Estoque[]{
    //     return this.EstoqueRepository.ExibeExemplares();
    // }

    async ListaExemplarComDisponibilidae():Promise<EstoqueSaidaDto[]>{
        return this.estoqueRepository.SelectEstoqueDisponivel();
    }
    
    // ListaExemplarPorISBN(isbn:string):Estoque|undefined{
    //     const exemplar = this.EstoqueRepository.ExibeExemplarPorISBN(isbn);
    //     return exemplar;
    // }

    async ListaExemplarPorISBN(livro_isbn:string):Promise<EstoqueSaidaDto|boolean>{
        const exemplar = await this.estoqueRepository.SelectExemplarPorISBN(livro_isbn);
        if(!exemplar){
            throw new Error("Exemplar não encontrado");
        }
        return exemplar;
    }
    // AtualizaDisponibilidade(isbn:string, exemplarNovo:Estoque):Estoque|undefined{
    //     const exemplar = this.EstoqueRepository.AtualizaDisponibilidadePorISBN(isbn,exemplarNovo);
    //     if(exemplar){
    //         return exemplar;
    //     }
    //     throw new Error("Exemplar não encontrado");
        
    // }

    async UpdateEstoque(livro_isbn:string,exemplarNovo:EstoqueEntradaDto):Promise<EstoqueSaidaDto>{
        const exemplar = await this.estoqueRepository.UpdateDisponibilidadePorISBN(livro_isbn,exemplarNovo);
        if(!exemplar){
            throw new Error("Não foi possível atualizar o exemplar");
        }
        return exemplar;
    }
    async DeleteExemplarPorISBN(livro_isbn:string):Promise<boolean>{
        //lembrar de verificar que se o exemplar tiver emprestado, não pode excluir
        const existeEmp = await this.estoqueRepository.SelectExemplarPorISBN(livro_isbn);
        if(existeEmp.quantidade_emprestada>0){
            throw new Error("Há empréstimo existente para esse exemplar")
        }
        const deletar = await this.estoqueRepository.DeleteExemplarPorISBN(livro_isbn);
        if(!deletar){
            throw new Error("Não foi possível encontrar exemplar com este ISBN");
        }
        return deletar;
    }
    // DeleteExemplarPorISBN(isbn:string):Estoque|undefined{
    //     const deletar = this.EstoqueRepository.RemoveExemplarPorISBN(isbn);
    //     if(!deletar){
    //         throw new Error ("Exemplar não encontrado");
    //     }
    //     return deletar;
    // }

}