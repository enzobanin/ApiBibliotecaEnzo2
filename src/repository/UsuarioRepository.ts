import { Usuario } from "../model/entidades/Usuario";
import { CursoRepository } from "./CursoRepository";
import { CategoriaUsuarioRepository } from "./CategoriaUsuarioRepository";
import { executarComandoSQL } from "../database/mysql";

export class UsuarioRepository{
    private static instance : UsuarioRepository;
    private cursoRepository = CursoRepository.getInstance();
    private categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    private constructor(){
        this.CreateTableUsuario();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    private async CreateTableUsuario(){
            const query = `CREATE TABLE IF NOT EXISTS biblioteca.usuario(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            ativo VARCHAR(255) NOT NULL,
            categoria_id INT NOT NULL,
            curso_id INT NOT NULL,
            )`;
            try{
                const resultado = await executarComandoSQL(query,[]);
                console.log('Tabela Usuario criada com sucesso: ', resultado);
            }catch(err){
                console.error('Erro ao criar tabela usuario: ', err);
            }
        }
    // InsereUsuario(usuario:Usuario):void{
    //     this.UsuarioLista.push(usuario);
    // }
    async InsertUsuario(nome:string,cpf:string,email:string,ativo:'ativo',
        categoria_id:number,curso_id:number
    ):Promise<Usuario>{
        const resultado = await executarComandoSQL(
            `INSERT INTO biblioteca.usuario(
            nome,cpf,email,ativo,categoria_id,curso_id)
            VALUES(?,?,?,?,?,?);
            `,
            [nome,cpf,email,ativo,categoria_id,curso_id]);
            console.log('Usuario inserido com sucesso: ', resultado);
            return new Usuario(resultado.insertId,nome,cpf,email,ativo,
                categoria_id,curso_id
            )
    }
    // MostraTodosUsuariosFiltrados(query:{nome?:string;ativo?:'ativo'|'inativo'|'suspenso';
    //     categoria_id?:number; curso_id?:number;} = {
    // }):Usuario[]{
    //     return this.UsuarioLista.filter((usuario) => {
    //         if(query.nome && !usuario.nome.toLowerCase().includes(query.nome.toLowerCase())) return false;
    //         if(query.ativo && usuario.ativo !== query.ativo) return false;
    //         if(query.categoria_id && usuario.categoria_id !== query.categoria_id) return false;
    //         if(query.curso_id && usuario.curso_id !== query.curso_id) return false;
    //         return true;
    //     });
    // }
    async SelectUsuarioFiltros(filtros:{
        nome?:string;
        ativo?:'ativo'|'inativo'|'suspenso';
        categoria_id?:number;
        curso_id?:number;
    }):Promise<Usuario[]>{
        let query = `SELECT * FROM biblioteca.usuario`;
        const condicoes: string[] = [];
        const valores: any[] = [];

        if(filtros.nome){
            condicoes.push(`Lower(nome) LIKE ?`);
            valores.push(`%${filtros.nome.toLowerCase()}%`)
        }
        if(filtros.ativo){
            condicoes.push(`ativo = ?`);
            valores.push(filtros.ativo)
        }
        if(filtros.categoria_id){
            condicoes.push(`categoria_id = ?`);
            valores.push(filtros.categoria_id);
        }
        if(filtros.curso_id){
            condicoes.push(`curso_id = ?`);
            valores.push(filtros.curso_id);
        }
        if(condicoes.length>0){
            query+= ` WHERE ` + condicoes.join(" AND ");
        }
        const resultado = await executarComandoSQL(query, valores);
        return resultado.map((r:any)=> new Usuario(r.id,
            r.nome,r.cpf,r.email,r.ativo,r.categoria_id,r.curso_id
        ));
    }
    // MostraUsuarioPorCPF(cpf:string):Usuario|undefined{
    //     return this.UsuarioLista.find(u=>u.cpf===cpf);
    // }
    async SelectUsuarioPorCPF(cpf:string):Promise<Usuario|undefined>{
        const query = `SELECT * FROM biblioteca.usuario WHERE cpf = ?`;
        const resultado = await executarComandoSQL(query,[cpf]);
        if(resultado.length>0){
            const r = resultado[0];
            return new Usuario(r.id,
            r.nome,r.cpf,r.email,r.ativo,r.categoria_id,r.curso_id)
        }
    }
    // AtualizaUsuarioPorCPF(cpf:string,usuarioNovo:Usuario):boolean{
    //     const usuarioAtual = this.UsuarioLista.find(u=>u.cpf===cpf);
    //     if(usuarioAtual){
    //         usuarioAtual.nome = usuarioNovo.nome;
    //         //VAI VERIFICAR AS OPÇÕES DO CPF
    //         if(usuarioAtual.cpf === usuarioNovo.cpf){
    //             usuarioAtual.cpf = usuarioNovo.cpf;
    //         }
    //         else{
    //             if(this.VerificaCpfExistente(usuarioNovo.cpf)){
    //                     throw new Error("Já existe um usuario com este CPF");
    //                 }
    //             else{
    //                 if(this.ValidaCpf(usuarioNovo.cpf)){
    //                 usuarioAtual.cpf = usuarioNovo.cpf;
    //                 }
    //             }
    //         }
    //         // VERIFICA EMAIL
    //         if(usuarioAtual.email === usuarioNovo.email){
    //             usuarioAtual.email = usuarioNovo.email;
    //         }else{
    //             if(this.VerificaEmailExistente(usuarioNovo.email)){
    //                 throw new Error("Já existe um usuario com este email"); 
    //             }
    //             else{
    //                 usuarioAtual.email = usuarioNovo.email;
    //             }   
    //         }
    //         //VERIFICA CURSO
    //         if(this.VerificaCursoId(usuarioNovo.curso_id)){
    //             usuarioAtual.curso_id = usuarioNovo.curso_id;
    //         }
    //         //VERIFICA CATEGORIA
    //         if(this.VerificaCategoriaUsuarioId(usuarioNovo.categoria_id)){
    //             usuarioAtual.categoria_id = usuarioNovo.categoria_id;
    //         }
    //         return true;
    //     }
    //     return false;
    // }

    async UpdateUsuarioPorCPF(cpf:string,usuarioNovo:Usuario):Promise<Usuario|undefined>{
        const usuarioAtual = `UPDATE biblioteca.usuario SET
        nome = ?, cpf = ?, email = ?, categoria_id = ?, curso_id = ?
        WHERE cpf = ?`;
        if(usuarioNovo.cpf !== cpf){
            const cpfrepetido = `SELECT * FROM biblioteca.usuario WHERE cpf = ?`;
            const resultado = await executarComandoSQL(cpfrepetido,[usuarioNovo.cpf])
            if(resultado.length!==0){
                throw new Error("Já existe um usuário com este CPF");
            }
        }
        await this.ValidaCpf(usuarioNovo.cpf);

        const resultadoEmail = await executarComandoSQL(
            `SELECT * FROM biblioteca.usuario WHERE email = ?`,
            [usuarioNovo.email]
        );
        if(resultadoEmail.length > 0 && resultadoEmail[0].cpf !== cpf) {
            throw new Error("Já existe um usuário com este email");
        }

        await this.VerificaCursoId(usuarioNovo.curso_id);
        await this.VerificaCategoriaUsuarioId(usuarioNovo.categoria_id);
        const valores = [usuarioNovo.nome,usuarioNovo.cpf,usuarioNovo.email,
            usuarioNovo.curso_id,usuarioNovo.categoria_id,cpf
        ]
        try{
            const atualizado = await executarComandoSQL(usuarioAtual,valores);
            console.log('Usuario atualizado com sucesso: ', atualizado);
            const usuario = `SELECT * FROM biblioteca.usuario WHERE cpf = ?`;
            const usuarioAtualizado = await executarComandoSQL(usuario,[usuarioNovo.cpf]);
            if(usuarioAtualizado.length>0){
                const r = usuarioAtualizado[0];
                return new Usuario(r.id,r.nome,r.cpf,r.email,r.ativo,
                    r.categoria_id,r.curso_id
                )
            }
        }catch(err){
            console.error('Erro ao atualizar o usuario', err);
            return;
        }
    }

    // DeletaUsuarioPorCPF(cpf:string):boolean{ 
    //     const usuario = this.UsuarioLista.findIndex(u=>u.cpf === cpf)
    //     if(usuario!==-1){
    //         this.UsuarioLista.splice(usuario,1);
    //         return true;
    //     }
    //     return false;
    // }
    async DeleteUsuarioPorCPF(cpf:string):Promise<boolean>{
        // nao pode deletar usuario se tiver emprestimo
        const query = `DELETE FROM biblioteca.usuario 
        WHERE cpf = ?`;
        try{
            const resultado = await executarComandoSQL(query,[cpf]);
            if(resultado.length>0){
                return false;
            }
            return true;
        }catch(err){
            console.error("Não foi possível deletar usuario ", err);
            return false;
        }
    }
    // VerificaCpfExistente(cpf:string):boolean{
    //     const cpfrepetido = this.UsuarioLista.findIndex(u=>u.cpf===cpf);
    //     if(cpfrepetido!==-1){
    //         return true;
    //     }
    //     return false;
    // }
    async VerificaCpfExistente(cpf:string):Promise<boolean>{
        const query = `SELECT * FROM biblioteca.usuario
        WHERE cpf = ?`;
        const resultado = await executarComandoSQL(query,[cpf]);
        if(resultado.length>0){
            return true;
        }
        return false;
    }
    // VerificaEmailExistente(email:string):boolean{
    //     const emailRepetido = this.UsuarioLista.findIndex(u=>u.email===email);
    //     if(emailRepetido!==-1){
    //         return true;
    //     }
    //     return false;
    // }
    
    // async VerificaEmailExistente(email:string):Promise<boolean>{
    //     const query = `SELECT * FROM biblioteca.usuario
    //     WHERE email = ?`;
    //     const resultado = await executarComandoSQL(query,[email]);
    //     if(resultado.length>0){
    //         return true;
    //     }
    //     return false;
    // }

    async ValidaCpf(cpf:string):Promise<boolean>{
        if(cpf.length != 11){
            throw new Error("CPF deve possuir 11 numeros");
        }else {
            const CpfN = cpf.split('').map(Number); // vai dividir a string em um array de caracteres
                                                    // cada caractere vai ser convertido em numero
            if(CpfN.every(n=>n == CpfN[0])){
                throw new Error("Este CPF é uma sequência de numeros repetidos");
            }

            const dig10 = this.ValidarOsDigitos(10,CpfN);
            const copiaCpf = [...CpfN];
            copiaCpf.push(dig10);
            const dig11 = this.ValidarOsDigitos(11,copiaCpf);

            if(dig10 == CpfN[9]&& dig11 == CpfN[10]){
                return true;
            }else{
                throw new Error("CPF com dígitos de verificação errado");
            }
        } 
    }

    ValidarOsDigitos(num: number, CpfN: number[]):number{
        let soma = 0;
        for(let i = 0; i < num - 1 ; i++){
            soma += CpfN[i] * (num-i);
        }
        const div = soma % 11;
        if(div < 2){
            return 0;
        }
        else{
            return 11 - div;
        }
    }
    // VerificaIdRepetido(id:number):boolean{
    //     const idRepetido = this.UsuarioLista.findIndex(u=>u.id===id);
    //     if(idRepetido !==-1){
    //         return true;
    //     }
    //     return false;
    // }

    // VerificaCursoId(curso_id:number):boolean{
    //     if(!this.cursoRepository.ListaCursoPorId(curso_id)){
    //         throw new Error("Curso não encontrado");
    //     }
    //     return true;
    // }
    async VerificaCursoId(curso_id:number):Promise<boolean>{
        const verifica = await this.cursoRepository.SelectCursoPorId(curso_id);
        if(!verifica){
            throw new Error("Curso não encontrado");
        }
        return true;
    }
    // VerificaCategoriaUsuarioId(categoria_id:number):boolean{
    //     if(!this.categoriaUsuarioRepository.ListaCategoriaPorId(categoria_id)){
    //         throw new Error("Categoria de usuário não encontrada");
    //     }
    //     return true;
    // }
    async VerificaCategoriaUsuarioId(categoria_id:number):Promise<boolean>{
        const verifica = await this.categoriaUsuarioRepository.SelectCategoriaUsuarioPorId(categoria_id);
        if(!verifica){
            throw new Error("Categoria de usuario não encontrado");
        }
        return true;
    }
}