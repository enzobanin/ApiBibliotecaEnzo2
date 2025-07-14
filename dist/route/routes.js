"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioController_1 = require("./../controller/UsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EstoqueController_1 = require("./../controller/EstoqueController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EmprestimoController_1 = require("./../controller/EmprestimoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CursoController_1 = require("./../controller/CursoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaUsuarioController_1 = require("./../controller/CategoriaUsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaLivroController_1 = require("./../controller/CategoriaLivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UsuarioDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "cpf": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "categoria_id": { "dataType": "double", "required": true },
            "curso_id": { "dataType": "double", "required": true },
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
    "Usuario": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
            "cpf": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "ativo": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ativo"] }, { "dataType": "enum", "enums": ["inativo"] }, { "dataType": "enum", "enums": ["suspenso"] }], "required": true },
            "categoria_id": { "dataType": "double", "required": true },
            "curso_id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
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
    "EstoqueEntradaDto": {
        "dataType": "refObject",
        "properties": {
            "livro_isbn": { "dataType": "string", "required": true },
            "quantidade": { "dataType": "double", "required": true },
            "quantidade_emprestada": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueSaidaDto": {
        "dataType": "refObject",
        "properties": {
            "livro_isbn": { "dataType": "string", "required": true },
            "quantidade": { "dataType": "double", "required": true },
            "quantidade_emprestada": { "dataType": "double", "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["disponivel"] }, { "dataType": "enum", "enums": ["emprestado"] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoEntradaDto": {
        "dataType": "refObject",
        "properties": {
            "cpf_usuario": { "dataType": "string", "required": true },
            "isbn_livro": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Emprestimo": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "cpf_usuario": { "dataType": "string", "required": true },
            "isbn_livro": { "dataType": "string", "required": true },
            "data_emprestimo": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "data_devolucao": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "data_entrega": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }], "required": true },
            "dias_atraso": { "dataType": "double", "required": true },
            "suspensao_ate": { "dataType": "union", "subSchemas": [{ "dataType": "datetime" }, { "dataType": "enum", "enums": [null] }], "required": true },
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
    const argsUsuarioController_CadastrarUsuario = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/usuarios', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.CadastrarUsuario)), async function UsuarioController_CadastrarUsuario(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_CadastrarUsuario, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'CadastrarUsuario',
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
    const argsUsuarioController_ListaTodosUsuarios = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        nome: { "in": "query", "name": "nome", "dataType": "string" },
        ativo: { "in": "query", "name": "ativo", "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ativo"] }, { "dataType": "enum", "enums": ["inativo"] }, { "dataType": "enum", "enums": ["suspenso"] }] },
        categoria_id: { "in": "query", "name": "categoria_id", "dataType": "double" },
        curso_id: { "in": "query", "name": "curso_id", "dataType": "double" },
    };
    app.get('/usuarios', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.ListaTodosUsuarios)), async function UsuarioController_ListaTodosUsuarios(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_ListaTodosUsuarios, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'ListaTodosUsuarios',
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
    const argsUsuarioController_ListaUsuarioPorCPF = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        cpf: { "in": "query", "name": "cpf", "required": true, "dataType": "string" },
    };
    app.get('/usuarios/cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.ListaUsuarioPorCPF)), async function UsuarioController_ListaUsuarioPorCPF(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_ListaUsuarioPorCPF, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'ListaUsuarioPorCPF',
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
    const argsUsuarioController_AtualizaUsuarioPorCpf = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        cpf: { "in": "query", "name": "cpf", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
    };
    app.put('/usuarios/cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.AtualizaUsuarioPorCpf)), async function UsuarioController_AtualizaUsuarioPorCpf(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_AtualizaUsuarioPorCpf, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'AtualizaUsuarioPorCpf',
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
    const argsUsuarioController_DeletaUsuarioPorCPF = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        cpf: { "in": "query", "name": "cpf", "required": true, "dataType": "string" },
    };
    app.delete('/usuarios/cpf', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.DeletaUsuarioPorCPF)), async function UsuarioController_DeletaUsuarioPorCPF(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_DeletaUsuarioPorCPF, request, response });
            const controller = new UsuarioController_1.UsuarioController();
            await templateService.apiHandler({
                methodName: 'DeletaUsuarioPorCPF',
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
    const argsEstoqueController_CadastrarExemplar = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EstoqueEntradaDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.CadastrarExemplar)), async function EstoqueController_CadastrarExemplar(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_CadastrarExemplar, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'CadastrarExemplar',
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
    const argsEstoqueController_ListaExemplarDisponivel = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/estoque', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.ListaExemplarDisponivel)), async function EstoqueController_ListaExemplarDisponivel(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_ListaExemplarDisponivel, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'ListaExemplarDisponivel',
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
    const argsEstoqueController_ListaExemplarPorISBN = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        isbn: { "in": "query", "name": "isbn", "required": true, "dataType": "string" },
    };
    app.get('/estoque/isbn', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.ListaExemplarPorISBN)), async function EstoqueController_ListaExemplarPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_ListaExemplarPorISBN, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'ListaExemplarPorISBN',
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
    const argsEstoqueController_AtualizaExemplarPorISBN = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        isbn: { "in": "query", "name": "isbn", "required": true, "dataType": "string" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EstoqueEntradaDto" },
    };
    app.put('/estoque/isbn', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.AtualizaExemplarPorISBN)), async function EstoqueController_AtualizaExemplarPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_AtualizaExemplarPorISBN, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'AtualizaExemplarPorISBN',
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
    const argsEstoqueController_DeletaExemplarPorISBN = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        isbn: { "in": "query", "name": "isbn", "required": true, "dataType": "string" },
    };
    app.delete('/estoque/isbn', ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController)), ...((0, runtime_1.fetchMiddlewares)(EstoqueController_1.EstoqueController.prototype.DeletaExemplarPorISBN)), async function EstoqueController_DeletaExemplarPorISBN(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_DeletaExemplarPorISBN, request, response });
            const controller = new EstoqueController_1.EstoqueController();
            await templateService.apiHandler({
                methodName: 'DeletaExemplarPorISBN',
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
    const argsEmprestimoController_CadastrarEmprestimo = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "EmprestimoEntradaDto" },
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/emprestimos', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.CadastrarEmprestimo)), async function EmprestimoController_CadastrarEmprestimo(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_CadastrarEmprestimo, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'CadastrarEmprestimo',
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
    const argsEmprestimoController_ListaTodosEmprestimos = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/emprestimos', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.ListaTodosEmprestimos)), async function EmprestimoController_ListaTodosEmprestimos(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_ListaTodosEmprestimos, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'ListaTodosEmprestimos',
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
    const argsEmprestimoController_RegistrarDevolucao = {
        fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
        id: { "in": "query", "name": "id", "required": true, "dataType": "double" },
    };
    app.put('/emprestimos/id/devolucao', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.RegistrarDevolucao)), async function EmprestimoController_RegistrarDevolucao(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_RegistrarDevolucao, request, response });
            const controller = new EmprestimoController_1.EmprestimoController();
            await templateService.apiHandler({
                methodName: 'RegistrarDevolucao',
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
    app.get('/catalogos/categorias-usuario', ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaUsuarioController_1.CategoriaUsuarioController.prototype.ListarTodasCategorias)), async function CategoriaUsuarioController_ListarTodasCategorias(request, response, next) {
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
    app.get('/catalogos/categorias-livro', ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaLivroController_1.CategoriaLivroController.prototype.ListarTodasCategorias)), async function CategoriaLivroController_ListarTodasCategorias(request, response, next) {
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
