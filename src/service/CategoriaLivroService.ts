import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    private CategoriaLivroRepository : CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

    getCategoriaLivros():CategoriaLivro[]{
        return this.CategoriaLivroRepository.ListaTodasCategoriasLivros();
    }
}
