"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    getCursos() {
        return this.cursoRepository.ListaTodosCurso();
    }
}
exports.CursoService = CursoService;
