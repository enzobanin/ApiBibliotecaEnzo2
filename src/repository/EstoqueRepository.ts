import { Estoque } from "../model/entidades/Estoque";
import { executarComandoSQL } from "../database/mysql";
import { EstoqueEntradaDto } from "../model/dto/EstoqueEntradaDto";
import { EstoqueSaidaDto } from "../model/dto/EstoqueSaidaDto";

export class EstoqueRepository{
    private static instance:EstoqueRepository;

    private constructor(){
        this.CreateTableEstoque();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    private async CreateTableEstoque(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.estoque(
        id INT AUTO_INCREMENT PRIMARY KEY,
        livro_isbn VARCHAR(255) NOT NULL,
        quantidade INT NOT NULL,
        quantidade_emprestada INT NOT NULL,
        status VARCHAR(255) NOT NULL
        )`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela estoque criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela estoque: ', err);
        }
    }
    
    async InsertEstoque(livro_isbn:string,quantidade:number,
            quantidade_emprestada:number
        ):Promise<EstoqueSaidaDto>{
            const status: 'disponivel' | 'emprestado' =
    quantidade === quantidade_emprestada ? 'emprestado' : 'disponivel';
            const resultado = await executarComandoSQL(
            `INSERT INTO biblioteca.estoque(livro_isbn,quantidade,
            quantidade_emprestada,status)
            VALUES
            (?, ?, ?, ?);   
            `,
            [livro_isbn,quantidade,quantidade_emprestada,status]);
            console.log('Exemplar inserido com sucesso: ', resultado);
            return new EstoqueSaidaDto(livro_isbn,quantidade,
                quantidade_emprestada,status
            )
        }
    async SelectEstoqueDisponivel():Promise<EstoqueSaidaDto[]>{
        const query = `SELECT * FROM biblioteca.estoque WHERE 
        status = 'disponivel' ORDER BY id ASC`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any)=>new EstoqueSaidaDto(r.livro_isbn,
                r.quantidade,r.quantidade_emprestada
            ));
        }catch(err){
            console.log('Não foi possível exibir os exemplares disponíveis',err);
            return [];
        }
    }
    
    async SelectExemplarPorISBN(livro_isbn:string):Promise<EstoqueSaidaDto>{
        const query = `SELECT * FROM biblioteca.estoque WHERE livro_isbn = ?`
        const resultado = await executarComandoSQL(query,[livro_isbn]);
        if(resultado.length>0){
            const r = resultado[0];
            const e = new Estoque(r.id,r.livro_isbn,r.quantidade,
                r.quantidade_emprestada
                );
            if(r.quantidade === r.quantidade_emprestada){
                e.status = 'emprestado'
            }
            else{
                e.status = 'disponivel';
            }
            
            return e;
        }
        return resultado;
        
        
    }
    
    async UpdateDisponibilidadePorISBN(livro_isbn:string,exemplarNovo:EstoqueEntradaDto):Promise<EstoqueSaidaDto|undefined>{
        const exemplarAtual = `UPDATE biblioteca.estoque SET
        quantidade = ?, quantidade_emprestada = ?
        WHERE livro_isbn = ?`
        const verificaExemplar = `SELECT * FROM biblioteca.estoque
        WHERE livro_isbn = ?`
        const resultado = await executarComandoSQL(verificaExemplar,[livro_isbn]);
        if(resultado.length > 0){
            if(exemplarNovo.quantidade_emprestada > exemplarNovo.quantidade){
                throw new Error("Quantidade emprestada não pode ser maior que a quantidade");
            }
                if(exemplarNovo.quantidade < 0 || exemplarNovo.quantidade_emprestada < 0){
                    throw new Error("Não é possível inserir quantidade negativa");
                }
            }
        else{
            throw new Error("Não foi possível encontrar exemplar com este ISBN");
        }
        const valores = [exemplarNovo.quantidade,exemplarNovo.quantidade_emprestada, livro_isbn]
        try{
            const atualizado = await executarComandoSQL(exemplarAtual,valores);
            console.log('Exemplar atualizado com sucesso: ', atualizado);
            const exemplar = `SELECT * FROM biblioteca.estoque WHERE livro_isbn = ?`;
            const livroAtualizado = await executarComandoSQL(exemplar,[livro_isbn]);
            if(livroAtualizado.length>0){
                const r = livroAtualizado[0];
                const exemplarAtualizado =new EstoqueSaidaDto(r.livro_isbn,
                    r.quantidade,r.quantidade_emprestada
                )
                if(exemplarAtualizado.quantidade === exemplarAtualizado.quantidade_emprestada){
                    exemplarAtualizado.status = 'emprestado';
                }
                else{
                    exemplarAtualizado.status = 'disponivel';
                }
                return exemplarAtualizado;
            }
        }catch(err){
            console.error('Erro ao atualizar o exemplar', err);
            return;
        }
    }
    
    async DeleteExemplarPorISBN(livro_isbn:string):Promise<boolean>{
        const query = `DELETE FROM biblioteca.estoque WHERE livro_isbn = ?`;
        try{
            const resultado = await executarComandoSQL(query,[livro_isbn]);
            if(resultado.affectedRows === 0){
                return false;
            }
            return true;
        }catch(err){
            console.error("Não foi possível deletar exemplar ", err);
            return false;
        }
    }
    async AtualizaQuantidadeEmprestada(isbn: string, novaQtd: number): Promise<void> {
        const query = `UPDATE biblioteca.estoque SET quantidade_emprestada = ? WHERE isbn = ?`;
        await executarComandoSQL(query, [novaQtd, isbn]);
    }

    
}