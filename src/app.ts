import express from "express";
import { ListaTodasCategorias } from "./controller/CategoriaLivroController";
import { ListaTodosCurso } from "./controller/CursoController";
import { ListaTodosCategoriasUsuario } from "./controller/CategoriaUsuarioController";
import { CadastrarLivro,MostrarTodosLivros,MostrarTodosLivrosPorAutor,
    MostrarTodosLivrosPorCategoria,MostrarTodosLivrosPorEditora,MostrarTodosLivrosPorISBN,
    MostrarTodosLivrosPorTitulo,AtualizaLivro,DeletaLivroPorISBN
 } from "./controller/LivroController";
import { InserirExemplar,ListaExemplarPorDisponibilidade,
    ListaExemplarPorId,DeletaExemplarPorId
 } from "./controller/EstoqueController";
const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execucao no URL: http:localhost: ${PORT}`);
}

//LIVRO
app.post("/library/livros",CadastrarLivro);
app.get("/library/livros",MostrarTodosLivros);
app.get("/library/livros/:isbn",MostrarTodosLivrosPorISBN);
app.put("/library/livros/:isbn",AtualizaLivro)
app.delete("/library/livros/:isbn",DeletaLivroPorISBN);
//ESTOQUE
app.post("/library/estoque",InserirExemplar);
app.get("/library/estoque",ListaExemplarPorDisponibilidade);
app.get("/library/estoque/:codigo",ListaExemplarPorId);
app.delete("/library/estoque/:codigo",DeletaExemplarPorId);
//CATÁLOGOS
//CATEGORIA USUÁRIO
app.get("/library/catalogos/categorias-usuario",ListaTodosCategoriasUsuario)
//CATEGORIA LIVRO
app.get("/library/catalogos/categorias-livro", ListaTodasCategorias);
//CURSOS
app.get("/library/catalogos/cursos",ListaTodosCurso);

app.listen(PORT,logInfo);
