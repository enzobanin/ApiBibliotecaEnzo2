"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../model/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioService_1 = require("./UsuarioService");
const EstoqueService_1 = require("./EstoqueService");
const LivroService_1 = require("./LivroService");
class EmprestimoService {
    static instance;
    EmprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioService = UsuarioService_1.UsuarioService.getInstance();
    estoqueService = EstoqueService_1.EstoqueService.getInstance();
    livroService = LivroService_1.LivroService.getInstance();
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoService();
        }
        return this.instance;
    }
    StatusUsuario(cpf) {
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf);
        if (usuario.ativo === 'inativo') {
            throw new Error("Usuario não pode pegar livro emprestado, pois está inativo. Regularize a situação!");
        }
        else {
            if (usuario.ativo === 'suspenso') {
                throw new Error("Usuario não pode pegar livro emprestado, pois está suspenso. Regularize a situação!");
            }
            else {
                return;
            }
        }
    }
    VerificaExemplarExistente(isbn) {
        this.estoqueService.GetExemplarPorISBN(isbn);
    }
    VerificaCPF(cpf) {
        if (this.usuarioService.GetUsuarioPorCpf(cpf)) {
            return;
        }
        // this.usuarioService.ValidaCpf(cpf); //verifica a estrutura
        // const existe = this.usuarioRepository.ValidaCpfExistente(cpf); //verifica se existe
        // if(!existe){
        //     throw new Error("Não existe usuário com este CPF");
        // }else{
        //     return;
        // }
    }
    DiasComLivro(cpf, isbn) {
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf);
        const livro = this.VerificaCategoriaLivro(isbn);
        if (usuario.categoria_id === 1) {
            return 40;
        }
        else {
            if (usuario.categoria_id === 2) {
                if (usuario.curso_id === 1 && livro === 2) {
                    return 30; // ADS -> Computação
                }
                if (usuario.curso_id === 2 && livro === 3) {
                    return 30; // Pedagogia -> Letras
                }
                if (usuario.curso_id === 3 && livro === 4) {
                    return 30; // ADM -> Gestão
                }
            }
            return 15;
        }
    }
    VerificaCategoriaLivro(isbn) {
        const exemplar = this.estoqueService.GetExemplarPorISBN(isbn);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        const livro = this.livroService.GetLivrosPorISBN(exemplar.livro_isbn);
        return livro.categoria_id;
    }
    VerificaLimitesEmprestimos(cpf_usuario) {
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf_usuario);
        const limite = this.LimitePorUsuario(usuario.categoria_id);
        const empAtivo = this.EmprestimoRepository.VerificaEmprestimosAtivosUsuarios(cpf_usuario);
        if (empAtivo.length >= limite) {
            throw new Error("Não é possível realizar o empréstimo. Limite atingido");
        }
        return;
    }
    LimitePorUsuario(categoria_id) {
        if (categoria_id === 1) {
            return 5;
        }
        return 3;
    }
    InsereEmprestimo(data) {
        const { id, cpf, isbn_livro, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate } = data;
        if (!cpf || !isbn_livro) {
            throw new Error("Informações Incompletas");
        }
        this.VerificaCPF(cpf); //verifica se o cpf existe
        this.StatusUsuario(cpf); // Verifica se está ativo, inativo, suspenso FEITO
        this.VerificaExemplarExistente(isbn_livro); // FEITO
        this.VerificaLimitesEmprestimos(cpf);
        const hoje = new Date();
        const prazo = this.DiasComLivro(cpf, isbn_livro);
        data.data_emprestimo = hoje;
        const dataDevolucao = new Date();
        dataDevolucao.setDate(hoje.getDate() + prazo);
        data.data_devolucao = dataDevolucao;
        data.data_entrega = new Date(0);
        data.dias_atraso = 0;
        data.suspenso_ate = new Date(0);
        const novoEmprestimo = new Emprestimo_1.Emprestimo(id, cpf, isbn_livro, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate);
        this.EmprestimoRepository.RegistraEmprestimo(novoEmprestimo);
        this.CalculandoMultaAposDiasDevolucao(novoEmprestimo);
        console.log(`Emprestimo salvo,
            Devolução dia: `, data.data_devolucao);
        this.AtualizandoQuantidadeAutomatica(novoEmprestimo);
        return novoEmprestimo;
    }
    GetEmprestimos() {
        return this.EmprestimoRepository.MostraTodosOsEmprestimos();
    }
    RealizaDevolucao(emprestimo_id) {
        // const emprestimo = this.EmprestimoRepository.BuscaEmprestimoPorId(emprestimo_id);
        // this.CalculaMulta(emprestimo);
        const emprestimo = this.EmprestimoRepository.RegistraDataDevolucao(emprestimo_id);
        if (emprestimo) {
            if (emprestimo.data_entrega.getTime() > emprestimo.data_devolucao.getTime()) {
                this.CalculaMulta(emprestimo);
            }
            const exemplar = this.estoqueService.GetExemplarPorISBN(emprestimo.isbn_livro);
            if (exemplar) {
                exemplar.quantidade += 1;
                exemplar.quantidade_emprestada -= 1;
                if (exemplar.quantidade > exemplar.quantidade_emprestada) {
                    exemplar.status = 'disponivel';
                }
            }
            return emprestimo;
        }
        return;
    }
    CalculaMulta(emprestimo) {
        const emp = emprestimo.data_entrega.getTime() - emprestimo.data_devolucao.getTime();
        const diasAtraso = Math.ceil(Math.abs(emp) / (1000 * 60 * 60 * 24));
        const diasSuspensao = diasAtraso * 3;
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + diasSuspensao);
        emprestimo.suspensao_ate = hoje;
        const usuario = this.usuarioService.GetUsuarioPorCpf(emprestimo.cpf_usuario);
        if (diasSuspensao > 60) {
            usuario.ativo = 'suspenso';
        }
        const qtdEmp = this.EmprestimoRepository.BuscaEmprestimoPorUsuario(usuario.cpf);
        const suspensoes = qtdEmp.filter(e => e.data_devolucao > e.data_entrega);
        if (suspensoes.length >= 2) {
            usuario.ativo = 'inativo';
        }
        return diasSuspensao;
    }
    CalculandoMultaAposDiasDevolucao(emprestimo) {
        const interval = setInterval(() => {
            const hoje = new Date();
            if (!emprestimo.data_entrega && hoje > emprestimo.data_devolucao) {
                this.CalculaMulta(emprestimo);
                clearInterval(interval);
            }
            if (emprestimo.data_entrega) {
                clearInterval(interval);
            }
        }, 1000 * 60 * 60 * 24);
    }
    AtualizandoQuantidadeAutomatica(emprestimo) {
        const exemplar = this.estoqueService.GetExemplarPorISBN(emprestimo.isbn_livro);
        if (exemplar) {
            exemplar.quantidade -= 1;
            exemplar.quantidade_emprestada += 1;
            if (exemplar.quantidade === exemplar.quantidade_emprestada) {
                exemplar.status = 'emprestado';
            }
            else {
                exemplar.status = 'disponivel';
            }
            this.estoqueService.PutDisponibilidade(emprestimo.isbn_livro, exemplar);
        }
    }
}
exports.EmprestimoService = EmprestimoService;
