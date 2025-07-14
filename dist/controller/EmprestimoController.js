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
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EmprestimoEntradaDto_1 = require("../model/dto/EmprestimoEntradaDto");
let EmprestimoController = class EmprestimoController extends tsoa_1.Controller {
    emprestimoService = EmprestimoService_1.EmprestimoService.getInstance();
    async CadastrarEmprestimo(dto, fail, success) {
        try {
            const usuario = await this.emprestimoService.InsereEmprestimo(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Emprestimo adicionado: ", usuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaTodosEmprestimos(fail, success) {
        try {
            return await this.emprestimoService.ListaTodosEmprestimos();
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async RegistrarDevolucao(fail, success, id) {
        try {
            const devolucao = await this.emprestimoService.RealizaDevolucao(id);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Devolução realizada: ", devolucao));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoEntradaDto_1.EmprestimoEntradaDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "CadastrarEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "ListaTodosEmprestimos", null);
__decorate([
    (0, tsoa_1.Put)("id/devolucao"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, Number]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "RegistrarDevolucao", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("emprestimos"),
    (0, tsoa_1.Tags)("Emprestimos")
], EmprestimoController);
