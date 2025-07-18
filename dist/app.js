"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriaLivroController_1 = require("./controller/CategoriaLivroController");
const CursoController_1 = require("./controller/CursoController");
const CategoriaUsuarioController_1 = require("./controller/CategoriaUsuarioController");
const LivroController_1 = require("./controller/LivroController");
const EstoqueController_1 = require("./controller/EstoqueController");
const UsuarioController_1 = require("./controller/UsuarioController");
const EmprestimoController_1 = require("./controller/EmprestimoController");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execucao no URL: http:localhost: ${PORT}`);
}
//USUÁRIO
app.post("/library/usuarios", UsuarioController_1.InsereUsuario);
app.get("/library/usuarios", UsuarioController_1.MostrarTodosOsUsuarios);
app.get("/library/usuarios/:cpf", UsuarioController_1.MostraUsuarioPorCPF);
app.put("/library/usuarios/:cpf", UsuarioController_1.AtualizaUsuarioPorCPF);
app.delete("/library/usuarios/:cpf", UsuarioController_1.DeletaUsuarioPorCPF);
// //LIVRO
app.post("/library/livros", LivroController_1.CadastrarLivro);
app.get("/library/livros", LivroController_1.MostrarLivrosFiltrados);
app.get("/library/livros/:isbn", LivroController_1.MostrarTodosLivrosPorISBN);
app.put("/library/livros/:isbn", LivroController_1.AtualizaLivro);
app.delete("/library/livros/:isbn", LivroController_1.DeletaLivroPorISBN);
// //ESTOQUE
app.post("/library/estoque", EstoqueController_1.InserirExemplar);
app.get("/library/estoque", EstoqueController_1.ListaExemplarPorDisponibilidade);
app.get("/library/estoque/:isbn", EstoqueController_1.ListaExemplarPorISBN);
app.put("/library/estoque/:isbn", EstoqueController_1.AtualizaDisponibilidadePorISBN);
app.delete("/library/estoque/:isbn", EstoqueController_1.DeletaExemplarPorISBN);
// //EMPRÉSTIMOS
app.post("/library/emprestimos", EmprestimoController_1.InsereEmprestimo);
app.get("/library/emprestimos", EmprestimoController_1.MostrarTodosOsEmprestimos);
app.put("/library/emprestimos/:id/devolucao", EmprestimoController_1.RegistraDevolucao);
// //CATÁLOGOS
// //CATEGORIA USUÁRIO
app.get("/library/catalogos/categorias-usuario", CategoriaUsuarioController_1.ListaTodosCategoriasUsuario);
//CATEGORIA LIVRO
app.get("/library/catalogos/categorias-livro", CategoriaLivroController_1.ListaTodasCategorias);
//CURSOS
app.get("/library/catalogos/cursos", CursoController_1.ListaTodosCurso);
app.listen(PORT, logInfo);
