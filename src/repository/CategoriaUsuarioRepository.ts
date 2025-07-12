// import { CategoriaUsuario } from "../model/entidades/CategoriaUsuario";

// export class CategoriaUsuarioRepository{
//     private static instance : CategoriaUsuarioRepository;
//     private CategoriaUsuarioLista: CategoriaUsuario[] = [];

//     private constructor(){
//         this.CategoriaUsuarioLista = [
//             new CategoriaUsuario(1,"Professor"),
//             new CategoriaUsuario(2,"Aluno"),
//             new CategoriaUsuario(3,"Bibliotecario"),
//         ]
//     }

//     public static getInstance():CategoriaUsuarioRepository{
//         if(!this.instance){
//             this.instance = new CategoriaUsuarioRepository();
//         }
//         return this.instance
//     }

//     ListaTodosCategoriasUsuario():CategoriaUsuario[]{
//         return this.CategoriaUsuarioLista;
//     }
//     ListaCategoriaPorId(id:number):boolean{
//         const categoria = this.CategoriaUsuarioLista.findIndex(c=>c.id === id);
//         if(categoria!==-1){
//             return true;
//         }
//         return false;
//     }

// }