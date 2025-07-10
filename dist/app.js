"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriaLivroController_1 = require("./controller/CategoriaLivroController");
const CursoController_1 = require("./controller/CursoController");
const CategoriaUsuarioController_1 = require("./controller/CategoriaUsuarioController");
// import { CadastrarLivro,MostrarLivrosFiltrados,MostrarTodosLivrosPorISBN,
//     AtualizaLivro,DeletaLivroPorISBN
//  } from "./controller/LivroController";
// import { InserirExemplar,ListaExemplarPorDisponibilidade,
//     ListaExemplarPorId,DeletaExemplarPorId
//  } from "./controller/EstoqueController";
//  import { InsereUsuario,MostrarTodosOsUsuarios,
//     MostraUsuarioPorCPF,AtualizaUsuarioPorCPF,DeletaUsuarioPorCPF
//   } from "./controller/UsuarioController";
// import { InsereEmprestimo, MostrarTodosOsEmprestimos,
//   RegistraDevolucao
//  } from "./controller/EmprestimoController";
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
function logInfo() {
    console.log(`API em execucao no URL: http:localhost: ${PORT}`);
}
//USUÁRIO
// app.post("/library/usuarios",InsereUsuario);
// app.get("/library/usuarios",MostrarTodosOsUsuarios);
// app.get("/library/usuarios/:cpf",MostraUsuarioPorCPF);
// app.put("/library/usuarios/:cpf",AtualizaUsuarioPorCPF);
// app.delete("/library/usuarios/:cpf",DeletaUsuarioPorCPF);
// //LIVRO
// app.post("/library/livros",CadastrarLivro);
// app.get("/library/livros",MostrarLivrosFiltrados);
// app.get("/library/livros/:isbn",MostrarTodosLivrosPorISBN);
// app.put("/library/livros/:isbn",AtualizaLivro)
// app.delete("/library/livros/:isbn",DeletaLivroPorISBN);
// //ESTOQUE
// app.post("/library/estoque",InserirExemplar);
// app.get("/library/estoque",ListaExemplarPorDisponibilidade);
// app.get("/library/estoque/:codigo",ListaExemplarPorId);
// app.delete("/library/estoque/:codigo",DeletaExemplarPorId);
// //EMPRÉSTIMOS
// app.post("/library/emprestimos",InsereEmprestimo);
// app.get("/library/emprestimos",MostrarTodosOsEmprestimos);
// app.put("/library/emprestimos/:id/devolucao", RegistraDevolucao);
// //CATÁLOGOS
// //CATEGORIA USUÁRIO
app.get("/library/catalogos/categorias-usuario", CategoriaUsuarioController_1.ListaTodosCategoriasUsuario);
//CATEGORIA LIVRO
app.get("/library/catalogos/categorias-livro", CategoriaLivroController_1.ListaTodasCategorias);
//CURSOS
app.get("/library/catalogos/cursos", CursoController_1.ListaTodosCurso);
app.listen(PORT, logInfo);
