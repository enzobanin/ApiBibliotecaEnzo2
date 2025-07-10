"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaTodosCategoriasUsuario = ListaTodosCategoriasUsuario;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const categoriaUsuarioService = CategoriaUsuarioService_1.CategoriaUsuarioService.getInstance();
function ListaTodosCategoriasUsuario(req, res) {
    try {
        res.status(200).json(categoriaUsuarioService.getCategoriaUsuario());
    }
    catch (e) {
        res.status(400).json({ status: "Error",
            message: e.message
        });
    }
}
