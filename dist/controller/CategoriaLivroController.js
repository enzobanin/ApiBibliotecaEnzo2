"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaTodasCategorias = ListaTodasCategorias;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
const categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
function ListaTodasCategorias(req, res) {
    try {
        res.status(200).json(categoriaLivroService.getCategoriaLivros());
    }
    catch (e) {
        res.status(400).json({ status: "Error",
            message: e.message });
    }
}
