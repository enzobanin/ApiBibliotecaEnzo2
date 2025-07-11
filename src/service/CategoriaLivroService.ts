import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    private categoriaLivroRepository : CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

    ListaCategoriaLivros():CategoriaLivro[]{
        return this.categoriaLivroRepository.ListaTodasCategoriasLivros();
    }
}
