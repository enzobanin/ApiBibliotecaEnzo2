import { CategoriaLivro } from "../model/entidades/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    private static instance: CategoriaLivroService;
    private categoriaLivroRepository : CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    
    private constructor() {}

    static getInstance(){
        if (!this.instance) {
            this.instance = new CategoriaLivroService();
        }
        return this.instance;
    }

    async SelectTodasCategoriasLivros():Promise<CategoriaLivro[]>{
        return this.categoriaLivroRepository.SelectCategoriaLivro();
    }
    
}
