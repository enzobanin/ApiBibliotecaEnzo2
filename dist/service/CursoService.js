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
    async SelectTodasCursos() {
        return this.cursoRepository.SelectCursos();
    }
    async SelectCursoPorId(id) {
        const categoriaExistente = await this.cursoRepository.SelectCursoPorId(id);
        if (!categoriaExistente) {
            return false;
        }
        return true;
    }
}
exports.CursoService = CursoService;
