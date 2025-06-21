import express from "express";
import { ListaTodasCategorias } from "./controller/CategoriaLivroController";

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

function logInfo(){
    console.log(`API em execucao no URL: http:localhost: ${PORT}`);
}
//CATÁLOGOS
//CATEGORIA LIVRO
app.get("/library/catalogos/categorias-livro", ListaTodasCategorias);

app.listen(PORT,logInfo);