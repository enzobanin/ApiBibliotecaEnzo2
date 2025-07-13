"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    static instance;
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroService();
        }
        return this.instance;
    }
    async SelectTodasCategoriasLivros() {
        return this.categoriaLivroRepository.SelectCategoriaLivro();
    }
    async SelectCategoriaLivroPorId(id) {
        const categoriaExistente = await this.categoriaLivroRepository.SelectCategoriaLivroPorId(id);
        if (!categoriaExistente) {
            throw new Error("Categoria de Livro com este ID não encontrada");
        }
        return true;
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
