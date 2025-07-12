// import { CategoriaUsuario } from "../model/entidades/CategoriaUsuario";
// import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

// export class CategoriaUsuarioService{
//     private static instance: CategoriaUsuarioService;
//     private categoriaUsuarioRepository: CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

//     private constructor() {}

//     public static getInstance(): CategoriaUsuarioService {
//         if (!this.instance) {
//             this.instance = new CategoriaUsuarioService();
//         }
//         return this.instance;
//     }

//     ListaCategoriaUsuario():CategoriaUsuario[]{
//         return this.categoriaUsuarioRepository.ListaTodosCategoriasUsuario();
//     }

//     ProcuraCategoriaUsuarioPorId(id:number):boolean{
//         if(!this.categoriaUsuarioRepository.ListaCategoriaPorId(id)){
//             throw new Error("Categoria de Usuário não encontrada");
//         }
//         return true;
//     }
// }