import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository;
    private CategoriaLivroLista: CategoriaLivro[] = [];

    private constructor(){
        this.CategoriaLivroLista = [
            new CategoriaLivro(1,"Romance"),
            new CategoriaLivro(2,"Computação"),
            new CategoriaLivro(3,"Letras"),
            new CategoriaLivro(4,"Gestão"),
        ]
    }

    public static getInstance(): CategoriaLivroRepository{
        if(!this.instance){
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }

    ListaTodasCategorias():CategoriaLivro[]{
        return this.CategoriaLivroLista;
    }
}
