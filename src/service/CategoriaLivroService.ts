import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService{
    CategoriaLivroRepository : CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

    getCategoriaLivros():CategoriaLivro[]|undefined{
        return this.CategoriaLivroRepository.ListaTodasCategorias();
    }
}
