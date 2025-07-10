"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/CategoriaLivro");
class CategoriaLivroRepository {
    static instance;
    CategoriaLivroLista = [];
    constructor() {
        this.CategoriaLivroLista = [
            new CategoriaLivro_1.CategoriaLivro(1, "Romance"),
            new CategoriaLivro_1.CategoriaLivro(2, "Computação"),
            new CategoriaLivro_1.CategoriaLivro(3, "Letras"),
            new CategoriaLivro_1.CategoriaLivro(4, "Gestão"),
        ];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    ListaTodasCategoriasLivros() {
        return this.CategoriaLivroLista;
    }
    ListaCategoriaPorId(id) {
        const categoria = this.CategoriaLivroLista.findIndex(c => c.id === id);
        if (categoria !== -1) {
            return true;
        }
        return false;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
