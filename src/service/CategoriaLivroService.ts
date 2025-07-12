import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    private categoriaLivroRepository : CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

    async SelectTodasCategoriasLivros():Promise<CategoriaLivro[]>{
        return this.categoriaLivroRepository.SelectCategoriaLivro();
    }
}
