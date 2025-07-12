"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    EmprestimoLista = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    RegistraEmprestimo(emp) {
        this.EmprestimoLista.push(emp);
    }
    MostraTodosOsEmprestimos() {
        return this.EmprestimoLista;
    }
    RegistraDataDevolucao(id) {
        const devolucao = this.EmprestimoLista.find(e => e.id === id);
        const hoje = new Date();
        if (devolucao) {
            devolucao.data_entrega = hoje;
            return devolucao;
        }
        throw new Error("Emprestimo não encontrado");
    }
    VerificaEmprestimosAtivosUsuarios(cpf) {
        return this.EmprestimoLista.filter(e => e.cpf_usuario === cpf
            && e.data_entrega === null);
    }
    BuscaEmprestimoPorId(id) {
        const emp = this.EmprestimoLista.find(e => e.id === id);
        if (!emp) {
            throw new Error("Emprestimo nao encontrado");
        }
        return emp;
    }
    BuscaEmprestimoPorUsuario(cpf_usuario) {
        return this.EmprestimoLista.filter(e => e.cpf_usuario === cpf_usuario);
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
