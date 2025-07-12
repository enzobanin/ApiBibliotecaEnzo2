import { Livro } from "../model/entidades/Livro";

export class LivroRepository{
    private static instance: LivroRepository;
    private LivroLista: Livro[] = [];

    private constructor(){}

    public static getInstance():LivroRepository{
        if(!this.instance){
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    InsereLivro(livro:Livro):void{ // POST
        this.LivroLista.push(livro);
    }
    BuscaLivroPorISBN(isbn:string):Livro|undefined{ // GET POR ISBN
        return this.LivroLista.find(l=>l.isbn===isbn);
    }
    FiltrarLivros(query: {titulo?: string; autor?: string;
    editora?: string; categoria_id?: number;}): Livro[] {
    return this.LivroLista.filter((livro) => {
      if (query.titulo && !livro.titulo.toLowerCase().includes(query.titulo.toLowerCase())) return false;
      if (query.autor && !livro.autor.toLowerCase().includes(query.autor.toLowerCase())) return false;
      if (query.editora && !livro.editora.toLowerCase().includes(query.editora.toLowerCase())) return false;
      if (query.categoria_id && livro.categoria_id !== query.categoria_id) return false;
      return true;
    });
  }
    AtualizaLivroPorISBN(isbn: string, livroNovo:Livro):boolean{
        const livroAntigo = this.BuscaLivroPorISBN(isbn);
        if(livroAntigo){
            livroAntigo.autor = livroNovo.autor;
            livroAntigo.categoria_id = livroNovo.categoria_id;
            livroAntigo.edicao = livroNovo.edicao;
            livroAntigo.editora = livroNovo.editora;
            livroAntigo.titulo = livroNovo.titulo;
            const jaExisteLivroISBN= this.BuscaLivroPorISBN(livroNovo.isbn);
            if(livroAntigo.isbn === livroNovo.isbn){
                return true;
            }
            if(jaExisteLivroISBN){
                throw new Error("Não é possível atualizar o ISBN, pois já existe um livro com este ISBN");
            }else{
                livroAntigo.isbn = livroNovo.isbn;
            }
            return true;
        }
        return false;
    }
    DeletaLivroPorISBN(isbn:string):boolean{
        const PosISBN = this.LivroLista.findIndex(l=>l.isbn===isbn);
        if(PosISBN!==-1){
            this.LivroLista.splice(PosISBN,1);
            return true;
        }
        return false;
    }
    BuscaLivroPorId(id:number):Livro|boolean{ 
        const livro = this.LivroLista.find(l=>l.id === id);
         if (!livro){
        return false; // vai retornar false pois nao encontrou o livro e ele pode ser cadastrado normalmente
    }
    return true; // se encontrou o livro, o service vai lancar um erro
    }
    
  ExisteLivroCombinacao(autor: string, editora: string, edicao: string): boolean { // vai verificar a combinacao no service
    if(this.LivroLista.find(
        l => l.autor === autor && l.editora === editora && l.edicao === edicao
    )) return true;
    return false;
    }
}