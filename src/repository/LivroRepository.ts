import { Livro } from "../model/Livro";

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

    InsereLivro(livro:Livro):void{
        this.LivroLista.push(livro);
    }
    MostraTodosLivros():Livro[]{
        return this.LivroLista;
    }
    MostraLivroPorISBN(isbn:string):Livro|undefined{
        return this.BuscaLivroPorISBN(isbn);
    }
    MostraLivroPorTitulo(titulo:string):Livro|undefined{
        return this.LivroLista.find(l=>l.titulo === titulo)
    }
    MostraLivroPorAutor(autor:string):Livro[]{
        return this.LivroLista.filter(l=>l.autor === autor);
    }
    MostraLivroPorEditora(editora:string):Livro[]{
        return this.LivroLista.filter(l=>l.editora === editora);
    }
    MostraLivroPorCategoria(categoria:number):Livro[]{
        return this.LivroLista.filter(l=>l.categoria_id === categoria);
    }
    AtualizaLivroPorISBN(isbn: string, livroNovo:Livro):boolean{
        const livroAntigo = this.BuscaLivroPorISBN(isbn);
        if(livroAntigo){
            livroAntigo.autor = livroNovo.autor;
            livroAntigo.categoria_id = livroNovo.categoria_id;
            livroAntigo.edicao = livroNovo.edicao;
            livroAntigo.editora = livroNovo.editora;
            livroAntigo.titulo = livroNovo.titulo;
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

    BuscaLivroPorISBN(isbn:string):Livro|undefined{
        return this.LivroLista.find(l=>l.isbn===isbn);
    }

    BuscaLivroPorId(id:number):number{
        const categoria_id = this.LivroLista.find(l=>l.id === id);
        if(categoria_id){
            return categoria_id.categoria_id;
        }
        return 0;
    }
}