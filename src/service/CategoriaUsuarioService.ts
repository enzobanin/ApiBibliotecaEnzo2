import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    private categoriaUsuarioRepository: CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    getCategoriaUsuario():CategoriaUsuario[]{
        return this.categoriaUsuarioRepository.ListaTodosCategoriasUsuario();
    }
}