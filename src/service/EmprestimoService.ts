import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EmprestimoService{
    private static instance: EmprestimoService;
    private EmprestimoRepository : EmprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioService = UsuarioService.getInstance();
    private estoqueService = EstoqueService.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

    private constructor() {}

    public static getInstance(): EmprestimoService {
        if (!this.instance) {
            this.instance = new EmprestimoService();
        }
        return this.instance;
    }
    
    ValidaUsuario(cpf:string):void{
        const ativo = this.usuarioRepository.UsuarioAtivo(cpf);
        if(ativo){
            return;
        }  
        throw new Error("Usuario não pode pegar livro emprestado, pois está inativo. Regularize a situação!");
    }
    VerificaUsuarioSuspenso(usuario_id:number):boolean{
        const emprestimo= this.EmprestimoRepository.BuscaEmprestimoPorUsuario(usuario_id);
        const hoje = new Date();
        const dataInfinita = new Date('3000-12-31');
        const suspenso = emprestimo.some(e=>e.suspensao_ate.getTime() === dataInfinita.getTime()
            ||e.suspensao_ate > hoje
        );
        if(suspenso){
            throw new Error ("Usuário suspenso até regularização");
        }
        return true;
    }

    ValidaExemplar(codigo_exemplar:number):void{
        this.estoqueService.VerificaExemplarDisponivel(codigo_exemplar);
    }
    VerificaCPF(cpf:string):void{
        this.usuarioService.ValidaCpf(cpf); //verifica a estrutura
        const existe = this.usuarioRepository.ValidaCpfExistente(cpf); //verifica se existe
        if(!existe){
            throw new Error("Não existe usuário com este CPF");
        }else{
            return;
        }
    }

    DiasComLivro(cpf:string,codigo_exemplar:number):number{
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf);
        const livro = this.VerificaCategoriaLivro(codigo_exemplar);
        if(!livro){
            throw new Error("Id do estoque não encontrado");
        }
        if(usuario.categoria_id === 1){
            return 40;
        }
        if(usuario.categoria_id === 2){
            if(usuario.curso_id=== 1 && livro === 2){
                return 30; // ADS -> Computação
            }
            if(usuario.curso_id=== 2 && livro === 3){
                return 30; // Pedagogia -> Letras
            }
            if(usuario.curso_id=== 3 && livro === 4){
                return 30; // ADM -> Gestão
            }
            return 15;
        }
        throw new Error("Usuário não pode pegar livro emprestado");
    }

    VerificaCategoriaLivro(codigo_exemplar:number):number{
        const exemplar = this.estoqueRepository.ExibeExemplarPorId(codigo_exemplar);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
        }
        const livro = this.livroRepository.BuscaLivroPorId(exemplar.id);
        if (!livro) {
            throw new Error("Livro não encontrado");
        }
        return livro.categoria_id;
    }
    VerificaLimitesEmprestimos(usuario_id:number):void{
        const usuario = this.usuarioRepository.BuscaUsuarioPorId(usuario_id);
        const limite = this.LimitePorUsuario(usuario.categoria_id);

        const empAtivo = this.EmprestimoRepository.VerificaEmprestimosAtivosUsuarios(usuario_id);
        if(empAtivo.length >= limite){
            throw new Error ("Limite de empréstimos atingidos");
        }
        return;
    }
    LimitePorUsuario(categoria_id:number):number{
        if(categoria_id === 1){
            return 5;
        }
        return 3;
    }

    InsereEmprestimo(data:any):Emprestimo{
        const {id,cpf,codigo_exemplar,
            estoque_id,data_emprestimo,data_devolucao,
            data_entrega,suspensao_ate} = data;

        if(!cpf||!codigo_exemplar){
            throw new Error("Informações Incompletas");
        }
        console.log("CPF recebido:", cpf);
        console.log("Usuários disponíveis:", this.usuarioRepository.MostraTodosUsuarios());
        this.VerificaCPF(cpf); //verifica se o cpf existe e está correto
        const usuario = this.usuarioService.GetUsuarioPorCpf(cpf); // 🔥 PEGA o usuário
        if(!usuario){
            throw new Error ("Usuario nao encontrado");
        }
        const usuario_id = usuario.id;
        this.ValidaUsuario(cpf); // verifica se o usuario está ativo
        this.VerificaUsuarioSuspenso(usuario_id);
        this.ValidaExemplar(codigo_exemplar);// verifica se o exemplar existe e esta disponível
        this.VerificaLimitesEmprestimos(usuario_id);
        const hoje = new Date();
        const prazo = this.DiasComLivro(cpf,codigo_exemplar);
        data.data_devolucao =  (hoje.getDate() + prazo);
        data.data_emprestimo = hoje;
        data.data_devolucao = new Date(0);
        data.data_entrega = new Date(0);
        data.suspenso_ate = new Date(0);
        const novoEmprestimo = new Emprestimo(id,usuario_id,estoque_id,data_emprestimo,data_devolucao,data_entrega,0,suspensao_ate);
        const exemplar = this.estoqueRepository.ExibeExemplarPorId(codigo_exemplar);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado");
            }
        exemplar.disponivel = false;
        
        return novoEmprestimo;
    } 

    GetEmprestimos():Emprestimo[]{
        return this.EmprestimoRepository.MostraTodosOsEmprestimos();
    }

    RealizaDevolucao(emprestimo_id:number):boolean{
        const emprestimo = this.EmprestimoRepository.BuscaEmprestimoPorId(emprestimo_id);
        this.CalculaMulta(emprestimo);
        const dev = this.EmprestimoRepository.RegistraDevolucao(emprestimo_id);
        if(!dev){
            throw new Error("Não foi possivel registrar devolução");
        }
        const exemplar = this.estoqueRepository.ExibeExemplarPorId(emprestimo.estoque_id);
        if (exemplar){
            exemplar.disponivel = true;
            if (exemplar.quantidade_emprestada > 0) {
                exemplar.quantidade_emprestada -= 1;
            }
        }
        exemplar.disponivel = exemplar.quantidade_emprestada < exemplar.quantidade;
        return true;
    }
    CalculaMulta(emprestimo:Emprestimo):number{
        if(emprestimo.data_entrega>emprestimo.data_devolucao){
            const emp = emprestimo.data_entrega.getTime() - emprestimo.data_devolucao.getTime();
            const diasAtraso = Math.ceil(Math.abs(emp)/(1000 * 60 * 60 * 24))
            const diasSuspensao = diasAtraso * 3;
            const hoje = new Date();
            hoje.setDate(hoje.getDate() + diasSuspensao);
            emprestimo.suspensao_ate = hoje;
            const usuario = this.usuarioRepository.BuscaUsuarioPorId(emprestimo.usuario_id);
            const dataInfinita = new Date('3000-12-31');
            if(diasSuspensao>60){
                emprestimo.suspensao_ate = dataInfinita; // data praticamente infinita até regularização
            
            }
            const qtdEmp = this.EmprestimoRepository.BuscaEmprestimoPorUsuario(usuario.id);
            const suspensoes = qtdEmp.filter(e=>e.data_devolucao>e.data_entrega);
            if(suspensoes.length >= 2){
                usuario.ativo = false;
            }
            return diasSuspensao;
        }
        return 0;
    }

}