"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    static instance;
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoService();
        }
        return this.instance;
    }
    ListaCursos() {
        return this.cursoRepository.ListaTodosCurso();
    }
    ProcuraCursoPorId(id) {
        if (!this.cursoRepository.ListaCursoPorId(id)) {
            throw new Error("Curso não encontrado");
        }
        return true;
    }
}
exports.CursoService = CursoService;
