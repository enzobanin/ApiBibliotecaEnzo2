import { CategoriaLivro } from "../model/entidades/CategoriaLivro";
import { executarComandoSQL } from "../database/mysql";
export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository;

    private constructor(){ // só vai ser colocado as funções que devem ser executadas junto com o repositorio
        this.CreateTableCategoriaLivro();
        this.InsertCategoriaLivro();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    private async CreateTableCategoriaLivro(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.categoria_livro(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE)`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela categoria_livro criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela categoria_livro: ', err);
        }
    }

    async InsertCategoriaLivro(){
        const query = `
        INSERT IGNORE INTO biblioteca.categoria_livro(name)
        VALUES
        (?), (?), (?), (?);
        `;
        const valores = ["Romance", "Computação", "Letras", "Gestão"];
        try{
            const resultado = await executarComandoSQL(query,valores);
            console.log('Categorias inseridas com sucesso', resultado);
        }catch(err){
            console.error('Erro ao inserir categorias', err);
        }
    }

    async SelectCategoriaLivro():Promise<CategoriaLivro[]>{
        const query = `SELECT * FROM biblioteca.categoria_livro`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any)=> new CategoriaLivro(r.id,r.name));
        }catch(err){
            console.log('Não foi possível exibir as categorias');
            return [];
        }
    }

    async SelectCategoriaLivroPorId(id:number):Promise<boolean>{
        const query = `SELECT * FROM biblioteca.categoria_livro WHERE id = ?`;
        const resultado = await executarComandoSQL(query,[id]);
        if(resultado.length !== 0){
            return true;
        }
        return false;
       
    }
    // ListaTodasCategoriasLivros():CategoriaLivro[]{
    //     return this.CategoriaLivroLista;
    // }
    // ListaCategoriaPorId(id:number):boolean{
    //     const categoria = this.CategoriaLivroLista.findIndex(c=>c.id === id);
    //     if(categoria!==-1){
    //         return true;
    //     }
    //     return false;
    // }
}
