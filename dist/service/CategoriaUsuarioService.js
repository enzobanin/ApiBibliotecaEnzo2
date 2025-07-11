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
    ListaCategoriaUsuario() {
        return this.categoriaUsuarioRepository.ListaTodosCategoriasUsuario();
    }
    ProcuraCategoriaUsuarioPorId(id) {
        if (!this.categoriaUsuarioRepository.ListaCategoriaPorId(id)) {
            throw new Error("Categoria de Usuário não encontrada");
        }
        return true;
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
