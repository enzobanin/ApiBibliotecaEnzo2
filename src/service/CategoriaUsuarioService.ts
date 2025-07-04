import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    private CategoriaUsuarioRepository: CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    getCategoriaUsuario():CategoriaUsuario[]{
        return this.CategoriaUsuarioRepository.ListaTodosCategoriasUsuario();
    }
}