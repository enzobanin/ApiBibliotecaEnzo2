"use strict";
// import express from "express";
// import { ListaTodasCategorias } from "./controller/CategoriaLivroController";
// import { ListaTodosCurso } from "./controller/CursoController";
// import { ListaTodosCategoriasUsuario } from "./controller/CategoriaUsuarioController";
// import { CadastrarLivro,MostrarLivrosFiltrados,MostrarTodosLivrosPorISBN,
//     AtualizaLivro,DeletaLivroPorISBN
//  } from "./controller/LivroController";
// import { InserirExemplar,ListaExemplarPorDisponibilidade,
//     ListaExemplarPorISBN,AtualizaDisponibilidadePorISBN,DeletaExemplarPorISBN
//  } from "./controller/EstoqueController";
//  import { InsereUsuario,MostrarTodosOsUsuarios,
//     MostraUsuarioPorCPF,AtualizaUsuarioPorCPF,DeletaUsuarioPorCPF
//   } from "./controller/UsuarioController";
// import { InsereEmprestimo, MostrarTodosOsEmprestimos,
//   RegistraDevolucao
//  } from "./controller/EmprestimoController";
// const app = express();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = process.env.PORT ?? 3040;
// app.use(express.json());
// function logInfo(){
//     console.log(`API em execucao no URL: http:localhost: ${PORT}`);
// }
// //USUÁRIO
// app.post("/library/usuarios",InsereUsuario);
// app.get("/library/usuarios",MostrarTodosOsUsuarios);
// app.get("/library/usuarios/:cpf",MostraUsuarioPorCPF);
// app.put("/library/usuarios/:cpf",AtualizaUsuarioPorCPF);
// app.delete("/library/usuarios/:cpf",DeletaUsuarioPorCPF);
// // //LIVRO
// app.post("/library/livros",CadastrarLivro);
// app.get("/library/livros",MostrarLivrosFiltrados);
// app.get("/library/livros/:isbn",MostrarTodosLivrosPorISBN);
// app.put("/library/livros/:isbn",AtualizaLivro)
// app.delete("/library/livros/:isbn",DeletaLivroPorISBN);
// // //ESTOQUE
// app.post("/library/estoque",InserirExemplar);
// app.get("/library/estoque",ListaExemplarPorDisponibilidade);
// app.get("/library/estoque/:isbn",ListaExemplarPorISBN);
// app.put("/library/estoque/:isbn",AtualizaDisponibilidadePorISBN);
// app.delete("/library/estoque/:isbn",DeletaExemplarPorISBN);
// // //EMPRÉSTIMOS
// app.post("/library/emprestimos",InsereEmprestimo);
// app.get("/library/emprestimos",MostrarTodosOsEmprestimos);
// app.put("/library/emprestimos/:id/devolucao", RegistraDevolucao);
// // //CATÁLOGOS
// // //CATEGORIA USUÁRIO
// app.get("/library/catalogos/categorias-usuario",ListaTodosCategoriasUsuario)
// //CATEGORIA LIVRO
// app.get("/library/catalogos/categorias-livro", ListaTodasCategorias);
// //CURSOS
// app.get("/library/catalogos/cursos",ListaTodosCurso);
// app.listen(PORT,logInfo);
const express_1 = __importDefault(require("express"));
const routes_1 = require("./route/routes");
const Swagger_1 = require("./config/Swagger");
const app = (0, express_1.default)();
const PORT = 3090;
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
(0, routes_1.RegisterRoutes)(apiRouter);
app.use('/api', apiRouter);
(0, routes_1.RegisterRoutes)(app);
(0, Swagger_1.setupSwagger)(app);
app.listen(PORT, () => console.log("API online na porta: " + PORT));
