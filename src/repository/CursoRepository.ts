import { Curso } from "../model/entidades/Curso";
import { executarComandoSQL } from "../database/mysql";

export class CursoRepository{
    private static instance: CursoRepository;

    private constructor(){
        this.CreateTableCurso();
        this.InsertCursos();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    
    private async CreateTableCurso(){
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.curso(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE)`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela curso criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela curso: ', err);
        }
    }
    private async InsertCursos(){
        const query = `
        INSERT IGNORE INTO biblioteca.curso(name)
        VALUES
        (?), (?), (?);
        `;
        const valores = ["ADS", "Pedagogia", "Administração"];
        try{
            const resultado = await executarComandoSQL(query,valores);
            console.log('Cursos inseridos com sucesso', resultado);
        }catch(err){
            console.error('Erro ao inserir cursos', err);
        }
    }
    async SelectCursos():Promise<Curso[]>{
        const query = `SELECT * FROM biblioteca.curso ORDER BY id ASC`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any)=> new Curso(r.id,r.name));
        }catch(err){
            console.log('Não foi possível exibir os cursos',err);
            return [];
        }
    }
    async SelectCursoPorId(id:number):Promise<boolean>{
        const query = `SELECT * FROM biblioteca.curso WHERE id = ?`;
        const resultado = await executarComandoSQL(query,[id]);
        if(resultado.length !== 0){
            return true;
        }
        return false;
       
    }
    // ListaTodosCurso():Curso[]{
    //     return this.CursoLista;
    // }
    // ListaCursoPorId(id:number):boolean{
    //     const curso = this.CursoLista.findIndex(c=>c.id === id);
    //     if(curso!==-1){
    //         return true;
    //     }
    //     return false;
    // }
}