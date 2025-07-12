import { CategoriaLivro } from "../model/entidades/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    private categoriaLivroRepository : CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

    async SelectTodasCategoriasLivros():Promise<CategoriaLivro[]>{
        return this.categoriaLivroRepository.SelectCategoriaLivro();
    }
}
