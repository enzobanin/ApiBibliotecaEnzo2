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
}
exports.CategoriaLivroService = CategoriaLivroService;
