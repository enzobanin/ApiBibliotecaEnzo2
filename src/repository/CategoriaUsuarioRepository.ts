import { CategoriaUsuario } from "../model/entidades/CategoriaUsuario";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaUsuarioRepository{
    private static instance : CategoriaUsuarioRepository;

    private constructor(){
        this.CreateTableCategoriaUsuario();
        this.InsertCategoriaUsuario();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    private async CreateTableCategoriaUsuario(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.categoria_usuario(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE)`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela categoria_usuario criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela categoria_livro: ', err);
        }
    }
    private async InsertCategoriaUsuario(){
        const query = `
        INSERT IGNORE INTO biblioteca.categoria_usuario(name)
        VALUES
        (?), (?), (?);
        `;
        const valores = ["Professor", "Aluno", "Bibliotecário"];
        try{
            const resultado = await executarComandoSQL(query,valores);
            console.log('Categorias de usuário inseridas com sucesso', resultado);
        }catch(err){
            console.error('Erro ao inserir categorias', err);
        }
    }
    async SelectCategoriaUsuario():Promise<CategoriaUsuario[]>{
        const query = `SELECT * FROM biblioteca.categoria_usuario ORDER BY id ASC`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any)=> new CategoriaUsuario(r.id,r.name));
        }catch(err){
            console.log('Não foi possível exibir as categorias');
            return [];
        }
    }
    async SelectCategoriaUsuarioPorId(id:number):Promise<boolean>{
        const query = `SELECT * FROM biblioteca.categoria_usuario WHERE id = ?`;
        const resultado = await executarComandoSQL(query,[id]);
        if(resultado.length !== 0){
            return true;
        }
        return false;
       
    }    
    // ListaTodosCategoriasUsuario():CategoriaUsuario[]{
    //     return this.CategoriaUsuarioLista;
    // }
    // ListaCategoriaPorId(id:number):boolean{
    //     const categoria = this.CategoriaUsuarioLista.findIndex(c=>c.id === id);
    //     if(categoria!==-1){
    //         return true;
    //     }
    //     return false;
    // }

}