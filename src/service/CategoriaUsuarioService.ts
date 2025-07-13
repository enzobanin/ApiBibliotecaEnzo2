import { CategoriaUsuario } from "../model/entidades/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    private static instance: CategoriaUsuarioService;
    private categoriaUsuarioRepository: CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

    private constructor() {}

    static getInstance(){
        if (!this.instance) {
            this.instance = new CategoriaUsuarioService();
        }
        return this.instance;
    }

    async SelectTodasCategoriasUsuarios():Promise<CategoriaUsuario[]>{
        return this.categoriaUsuarioRepository.SelectCategoriaUsuario();
    }

    async SelectCategoriaUsuarioPorId(id:number):Promise<boolean>{
        const categoriaExistente = await this.categoriaUsuarioRepository.SelectCategoriaUsuarioPorId(id)
        if(!categoriaExistente){
            throw new Error("Categoria de Usuário com este ID não encontrada");
        }
        return true;
    }
    // ListaCategoriaUsuario():CategoriaUsuario[]{
    //     return this.categoriaUsuarioRepository.ListaTodosCategoriasUsuario();
    // }

    // ProcuraCategoriaUsuarioPorId(id:number):boolean{
    //     if(!this.categoriaUsuarioRepository.ListaCategoriaPorId(id)){
    //         throw new Error("Categoria de Usuário não encontrada");
    //     }
    //     return true;
    // }
}