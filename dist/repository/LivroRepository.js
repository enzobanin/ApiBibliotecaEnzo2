"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    LivroLista = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    InsereLivro(livro) {
        this.LivroLista.push(livro);
    }
    BuscaLivroPorISBN(isbn) {
        return this.LivroLista.find(l => l.isbn === isbn);
    }
    FiltrarLivros(query) {
        return this.LivroLista.filter((livro) => {
            if (query.titulo && !livro.titulo.toLowerCase().includes(query.titulo.toLowerCase()))
                return false;
            if (query.autor && !livro.autor.toLowerCase().includes(query.autor.toLowerCase()))
                return false;
            if (query.editora && !livro.editora.toLowerCase().includes(query.editora.toLowerCase()))
                return false;
            if (query.categoria_id && livro.categoria_id !== query.categoria_id)
                return false;
            return true;
        });
    }
    AtualizaLivroPorISBN(isbn, livroNovo) {
        const livroAntigo = this.BuscaLivroPorISBN(isbn);
        if (livroAntigo) {
            livroAntigo.autor = livroNovo.autor;
            livroAntigo.categoria_id = livroNovo.categoria_id;
            livroAntigo.edicao = livroNovo.edicao;
            livroAntigo.editora = livroNovo.editora;
            livroAntigo.titulo = livroNovo.titulo;
            const jaExisteLivroISBN = this.BuscaLivroPorISBN(livroNovo.isbn);
            if (livroAntigo.isbn === livroNovo.isbn) {
                return true;
            }
            if (jaExisteLivroISBN) {
                throw new Error("Não é possível atualizar o ISBN, pois já existe um livro com este ISBN");
            }
            else {
                livroAntigo.isbn = livroNovo.isbn;
            }
            return true;
        }
        return false;
    }
    DeletaLivroPorISBN(isbn) {
        const PosISBN = this.LivroLista.findIndex(l => l.isbn === isbn);
        if (PosISBN !== -1) {
            this.LivroLista.splice(PosISBN, 1);
            return true;
        }
        return false;
    }
    BuscaLivroPorId(id) {
        const livro = this.LivroLista.find(l => l.id === id);
        if (!livro) {
            return false; // vai retornar false pois nao encontrou o livro e ele pode ser cadastrado normalmente
        }
        return true; // se encontrou o livro, o service vai lancar um erro
    }
    ExisteLivroCombinacao(autor, editora, edicao) {
        if (this.LivroLista.find(l => l.autor === autor && l.editora === editora && l.edicao === edicao))
            return true;
        return false;
    }
}
exports.LivroRepository = LivroRepository;
