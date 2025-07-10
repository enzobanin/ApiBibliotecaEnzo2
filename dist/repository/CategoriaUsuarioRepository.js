"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
class CategoriaUsuarioRepository {
    static instance;
    CategoriaUsuarioLista = [];
    constructor() {
        this.CategoriaUsuarioLista = [
            new CategoriaUsuario_1.CategoriaUsuario(1, "Professor"),
            new CategoriaUsuario_1.CategoriaUsuario(2, "Aluno"),
            new CategoriaUsuario_1.CategoriaUsuario(3, "Bibliotecario"),
        ];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    ListaTodosCategoriasUsuario() {
        return this.CategoriaUsuarioLista;
    }
    ListaCategoriaPorId(id) {
        const categoria = this.CategoriaUsuarioLista.findIndex(c => c.id === id);
        if (categoria !== -1) {
            return true;
        }
        return false;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
