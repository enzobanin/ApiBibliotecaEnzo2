import express from "express";
import { ListaTodasCategorias } from "./controller/CategoriaLivroController";
import { ListaTodosCurso } from "./controller/CursoController";
import { ListaTodosCategoriasUsuario } from "./controller/CategoriaUsuarioController";
import { CadastrarLivro,MostrarTodosLivros,MostrarTodosLivrosPorAutor,
    MostrarTodosLivrosPorCategoria,MostrarTodosLivrosPorEditora,MostrarTodosLivrosPorISBN,
    MostrarTodosLivrosPorTitulo,AtualizaLivro,DeletaLivroPorISBN
 } from "./controller/LivroController";
const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execucao no URL: http:localhost: ${PORT}`);
}

//LIVRO
//POST
app.post("/library/livros",CadastrarLivro);
//GET
app.get("/library/livros",MostrarTodosLivros);
//GET PELO ISBN
app.get("/library/livros/:isbn",MostrarTodosLivrosPorISBN);
//PUT PELO ISBN
app.put("/library/livros/:isbn",AtualizaLivro)
//DELETE PELO ISBN
app.delete("/library/livros/:isbn",DeletaLivroPorISBN);

//CATÁLOGOS
//CATEGORIA USUÁRIO
app.get("/library/catalogos/categorias-usuario",ListaTodosCategoriasUsuario)
//CATEGORIA LIVRO
app.get("/library/catalogos/categorias-livro", ListaTodasCategorias);
//CURSOS
app.get("/library/catalogos/cursos",ListaTodosCurso);

app.listen(PORT,logInfo);
