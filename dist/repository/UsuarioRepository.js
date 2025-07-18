"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const CursoRepository_1 = require("./CursoRepository");
const CategoriaUsuarioRepository_1 = require("./CategoriaUsuarioRepository");
class UsuarioRepository {
    static instance;
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    UsuarioLista = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    InsereUsuario(usuario) {
        this.UsuarioLista.push(usuario);
    }
    MostraTodosUsuariosFiltrados(query = {}) {
        return this.UsuarioLista.filter((usuario) => {
            if (query.nome && !usuario.nome.toLowerCase().includes(query.nome.toLowerCase()))
                return false;
            if (query.ativo && usuario.ativo !== query.ativo)
                return false;
            if (query.categoria_id && usuario.categoria_id !== query.categoria_id)
                return false;
            if (query.curso_id && usuario.curso_id !== query.curso_id)
                return false;
            return true;
        });
    }
    MostraUsuarioPorCPF(cpf) {
        return this.UsuarioLista.find(u => u.cpf === cpf);
    }
    AtualizaUsuarioPorCPF(cpf, usuarioNovo) {
        const usuarioAtual = this.UsuarioLista.find(u => u.cpf === cpf);
        if (usuarioAtual) {
            usuarioAtual.nome = usuarioNovo.nome;
            //VAI VERIFICAR AS OPÇÕES DO CPF
            if (usuarioAtual.cpf === usuarioNovo.cpf) {
                usuarioAtual.cpf = usuarioNovo.cpf;
            }
            else {
                if (this.VerificaCpfExistente(usuarioNovo.cpf)) {
                    throw new Error("Já existe um usuario com este CPF");
                }
                else {
                    if (this.ValidaCpf(usuarioNovo.cpf)) {
                        usuarioAtual.cpf = usuarioNovo.cpf;
                    }
                }
            }
            // VERIFICA EMAIL
            if (usuarioAtual.email === usuarioNovo.email) {
                usuarioAtual.email = usuarioNovo.email;
            }
            else {
                if (this.VerificaEmailExistente(usuarioNovo.email)) {
                    throw new Error("Já existe um usuario com este email");
                }
                else {
                    usuarioAtual.email = usuarioNovo.email;
                }
            }
            //VERIFICA CURSO
            if (this.VerificaCursoId(usuarioNovo.curso_id)) {
                usuarioAtual.curso_id = usuarioNovo.curso_id;
            }
            //VERIFICA CATEGORIA
            if (this.VerificaCategoriaUsuarioId(usuarioNovo.categoria_id)) {
                usuarioAtual.categoria_id = usuarioNovo.categoria_id;
            }
            return true;
        }
        return false;
    }
    DeletaUsuarioPorCPF(cpf) {
        const usuario = this.UsuarioLista.findIndex(u => u.cpf === cpf);
        if (usuario !== -1) {
            this.UsuarioLista.splice(usuario, 1);
            return true;
        }
        return false;
    }
    VerificaCpfExistente(cpf) {
        const cpfrepetido = this.UsuarioLista.findIndex(u => u.cpf === cpf);
        if (cpfrepetido !== -1) {
            return true;
        }
        return false;
    }
    VerificaEmailExistente(email) {
        const emailRepetido = this.UsuarioLista.findIndex(u => u.email === email);
        if (emailRepetido !== -1) {
            return true;
        }
        return false;
    }
    // UsuarioAtivo(cpf:string):boolean{
    //     const ativo = this.UsuarioLista.find(u=>u.cpf === cpf);
    //     if(ativo){
    //         if(ativo.ativo === true){
    //             return true;
    //         }
    //     }else{
    //        throw new Error("Usuario não encontrado");
    //     }
    //     return false;
    // }
    // BuscaUsuarioPorId(id:number):Usuario{
    //     const usuario = this.UsuarioLista.find(u=>u.id===id);
    //     if(!usuario){
    //         throw new Error("Usuário não encontrado");
    //     }
    //     return usuario;
    // }
    ValidaCpf(cpf) {
        if (cpf.length != 11) {
            throw new Error("CPF deve possuir 11 numeros");
        }
        else {
            const CpfN = cpf.split('').map(Number); // vai dividir a string em um array de caracteres
            // cada caractere vai ser convertido em numero
            if (CpfN.every(n => n == CpfN[0])) {
                throw new Error("Este CPF é uma sequência de numeros repetidos");
            }
            const dig10 = this.ValidarOsDigitos(10, CpfN);
            const copiaCpf = [...CpfN];
            copiaCpf.push(dig10);
            const dig11 = this.ValidarOsDigitos(11, copiaCpf);
            if (dig10 == CpfN[9] && dig11 == CpfN[10]) {
                return true;
            }
            else {
                throw new Error("CPF com dígitos de verificação errado");
            }
        }
    }
    ValidarOsDigitos(num, CpfN) {
        let soma = 0;
        for (let i = 0; i < num - 1; i++) {
            soma += CpfN[i] * (num - i);
        }
        const div = soma % 11;
        if (div < 2) {
            return 0;
        }
        else {
            return 11 - div;
        }
    }
    VerificaIdRepetido(id) {
        const idRepetido = this.UsuarioLista.findIndex(u => u.id === id);
        if (idRepetido !== -1) {
            return true;
        }
        return false;
    }
    VerificaCursoId(curso_id) {
        if (!this.cursoRepository.ListaCursoPorId(curso_id)) {
            throw new Error("Curso não encontrado");
        }
        return true;
    }
    VerificaCategoriaUsuarioId(categoria_id) {
        if (!this.categoriaUsuarioRepository.ListaCategoriaPorId(categoria_id)) {
            throw new Error("Categoria de usuário não encontrada");
        }
        return true;
    }
}
exports.UsuarioRepository = UsuarioRepository;
