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
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const UsuarioDto_1 = require("../model/dto/UsuarioDto");
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    usuarioService = UsuarioService_1.UsuarioService.getInstance();
    async CadastrarUsuario(dto, fail, success) {
        try {
            const usuario = await this.usuarioService.InsereUsuario(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Usuário adicionado: ", usuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaTodosUsuarios(fail, success, nome, ativo, categoria_id, curso_id) {
        try {
            const query = {
                nome,
                ativo,
                categoria_id: categoria_id ? Number(categoria_id) : undefined,
                curso_id: curso_id ? Number(curso_id) : undefined,
            };
            return await this.usuarioService.SelectUsuariosFiltros(query);
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaUsuarioPorCPF(fail, success, cpf) {
        try {
            return await this.usuarioService.SelectUsuarioPorCPF(cpf);
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async AtualizaUsuarioPorCpf(fail, success, cpf, dto) {
        try {
            const usuarioAtualizado = await this.usuarioService.UpdateUsuarioPorCPF(cpf, dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Usuário atualizado: ", usuarioAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async DeletaUsuarioPorCPF(fail, success, cpf) {
        try {
            const resultado = await this.usuarioService.DeleteUsuarioPorCPF(cpf);
            if (resultado) {
                return success(201, new BasicResponseDto_1.BasicResponseDto("Usuário deletado: ", resultado));
            }
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "CadastrarUsuario", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __param(5, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "ListaTodosUsuarios", null);
__decorate([
    (0, tsoa_1.Get)("cpf"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "ListaUsuarioPorCPF", null);
__decorate([
    (0, tsoa_1.Put)("cpf"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, UsuarioDto_1.UsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "AtualizaUsuarioPorCpf", null);
__decorate([
    (0, tsoa_1.Delete)("cpf"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "DeletaUsuarioPorCPF", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuarios"),
    (0, tsoa_1.Tags)("Usuários")
], UsuarioController);
