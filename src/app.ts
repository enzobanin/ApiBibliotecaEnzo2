import express from "express";
import { ListaTodasCategorias } from "./controller/CategoriaLivroController";
import { ListaTodosCurso } from "./controller/CursoController";
import { ListaTodosCategoriasUsuario } from "./controller/CategoriaUsuarioController";

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execucao no URL: http:localhost: ${PORT}`);
}
//CATÁLOGOS
//CATEGORIA USUÁRIO
app.get("/library/catalogos/categorias-usuario",ListaTodosCategoriasUsuario)
//CATEGORIA LIVRO
app.get("/library/catalogos/categorias-livro", ListaTodasCategorias);
//CURSOS
app.get("/library/catalogos/cursos",ListaTodosCurso);

app.listen(PORT,logInfo);
