"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    static instance;
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioService();
        }
        return this.instance;
    }
    async SelectTodasCategoriasUsuarios() {
        return this.categoriaUsuarioRepository.SelectCategoriaUsuario();
    }
    async SelectCategoriaUsuarioPorId(id) {
        const categoriaExistente = await this.categoriaUsuarioRepository.SelectCategoriaUsuarioPorId(id);
        if (!categoriaExistente) {
            throw new Error("Categoria de Usuário com este ID não encontrada");
        }
        return true;
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
