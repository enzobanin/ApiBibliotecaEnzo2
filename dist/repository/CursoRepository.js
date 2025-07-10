"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const Curso_1 = require("../model/Curso");
class CursoRepository {
    static instance;
    CursoLista = [];
    constructor() {
        this.CursoLista = [
            new Curso_1.Curso(1, "ADS"),
            new Curso_1.Curso(2, "Pedagogia"),
            new Curso_1.Curso(3, "Administração"),
        ];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    ListaTodosCurso() {
        return this.CursoLista;
    }
    ListaCursoPorId(id) {
        const curso = this.CursoLista.findIndex(c => c.id === id);
        if (curso !== -1) {
            return true;
        }
        return false;
    }
}
exports.CursoRepository = CursoRepository;
