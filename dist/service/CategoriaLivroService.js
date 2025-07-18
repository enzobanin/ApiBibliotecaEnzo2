"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    ListaCategoriaLivros() {
        return this.categoriaLivroRepository.ListaTodasCategoriasLivros();
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
