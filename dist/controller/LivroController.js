"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroDto_1 = require("../model/dto/LivroDto");
let LivroController = class LivroController extends tsoa_1.Controller {
    livroService = LivroService_1.LivroService.getInstance();
    async CadastrarLivro(dto, fail, success) {
        try {
            const livro = await this.livroService.InsertLivro(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Livro adicionado: ", livro));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaTodosLivros(fail, success, titulo, autor, editora, categoria_id) {
        try {
            const query = {
                titulo,
                autor,
                editora,
                categoria_id: categoria_id ? Number(categoria_id) : undefined,
            };
            return await this.livroService.SelectLivrosFiltrados(query);
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaLivroPorISBN(fail, success, isbn) {
        try {
            return await this.livroService.SelectLivroPorISBN(isbn);
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async AtualizaLivroPorISBN(fail, success, isbn, dto) {
        try {
            const livroAtualizado = await this.livroService.UpdateLivros(isbn, dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Livro atualizado: ", livroAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async DeletaLivroPorISBN(fail, success, isbn) {
        try {
            const resultado = await this.livroService.DeleteLivroPorISBN(isbn);
            if (resultado) {
                return success(201, new BasicResponseDto_1.BasicResponseDto("Livro deletado: ", resultado));
            }
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.LivroDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "CadastrarLivro", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __param(5, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "ListaTodosLivros", null);
__decorate([
    (0, tsoa_1.Get)("isbn"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "ListaLivroPorISBN", null);
__decorate([
    (0, tsoa_1.Put)("isbn"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, LivroDto_1.LivroDto]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "AtualizaLivroPorISBN", null);
__decorate([
    (0, tsoa_1.Delete)("isbn"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "DeletaLivroPorISBN", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("livros"),
    (0, tsoa_1.Tags)("Livros")
], LivroController);
