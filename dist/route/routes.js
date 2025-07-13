"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CursoController_1 = require("./../controller/CursoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaUsuarioController_1 = require("./../controller/CategoriaUsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaLivroController_1 = require("./../controller/CategoriaLivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "edicao": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Livro": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "editora": { "dataType": "string", "required": true },
            "edicao": { "dataType": "string", "required": true },
            "isbn": { "dataType": "string", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Curso": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriaUsuario": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriaLivro": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsLivroController_CadastrarLivro = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/livros', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.CadastrarLivro)), async function LivroController_CadastrarLivro(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_CadastrarLivro, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'CadastrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_ListaTodosLivros = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        titulo: { "in": "query", "name": "titulo", "dataType": "string" },
        autor: { "in": "query", "name": "autor", "dataType": "string" },
        editora: { "in": "query", "name": "editora", "dataType": "string" },
        categoria_id: { "in": "query", "name": "categoria_id", "dataType": "double" },
    };
    app.get('/livros', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.ListaTodosLivros)), async function LivroController_ListaTodosLivros(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_ListaTodosLivros, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'ListaTodosLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_ListaLivroPorISBN = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        isbn: { "in": "query", "name": "isbn", "required": true, "dataType": "string" },
    };
    app.get('/livros/isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.ListaLivroPorISBN)), async function LivroController_ListaLivroPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_ListaLivroPorISBN, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'ListaLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_AtualizaLivroPorISBN = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        isbn: { "in": "query", "name": "isbn", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
    };
    app.put('/livros/isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.AtualizaLivroPorISBN)), async function LivroController_AtualizaLivroPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_AtualizaLivroPorISBN, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'AtualizaLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroController_DeletaLivroPorISBN = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        isbn: { "in": "query", "name": "isbn", "required": true, "dataType": "string" },
    };
    app.delete('/livros/isbn', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.DeletaLivroPorISBN)), async function LivroController_DeletaLivroPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_DeletaLivroPorISBN, request, response });
            const controller = new LivroController_1.LivroController();
            await templateService.apiHandler({
                methodName: 'DeletaLivroPorISBN',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCursoController_ListarTodasCategorias = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/catalogos/cursos', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.ListarTodasCategorias)), async function CursoController_ListarTodasCategorias(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCursoController_ListarTodasCategorias, request, response });
            const controller = new CursoController_1.CursoController();
            await templateService.apiHandler({
                methodName: 'ListarTodasCategorias',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaUsuarioController_ListarTodasCategorias = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/catalogos/categorias_usuario', ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController.prototype.ListarTodasCategorias)), async function CategoriaUsuarioController_ListarTodasCategorias(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_ListarTodasCategorias, request, response });
            const controller = new CategoriaUsuarioController_1.CategoriaUsuarioController();
            await templateService.apiHandler({
                methodName: 'ListarTodasCategorias',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsCategoriaLivroController_ListarTodasCategorias = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/catalogos/categorias_livro', ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController.prototype.ListarTodasCategorias)), async function CategoriaLivroController_ListarTodasCategorias(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_ListarTodasCategorias, request, response });
            const controller = new CategoriaLivroController_1.CategoriaLivroController();
            await templateService.apiHandler({
                methodName: 'ListarTodasCategorias',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
