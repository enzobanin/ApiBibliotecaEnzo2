"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaTodosCurso = ListaTodosCurso;
const CursoService_1 = require("../service/CursoService");
const cursoService = CursoService_1.CursoService.getInstance();
function ListaTodosCurso(req, res) {
    try {
        res.status(200).json(cursoService.getCursos());
    }
    catch (e) {
        res.status(400).json({ status: "Error",
            message: e.message });
    }
}
