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
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
let CursoController = class CursoController extends tsoa_1.Controller {
    categoriaCursoService = CursoService_1.CursoService.getInstance();
    async ListarTodasCategorias(fail, success) {
        try {
            return await this.categoriaCursoService.SelectTodasCursos();
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.CursoController = CursoController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "ListarTodasCategorias", null);
exports.CursoController = CursoController = __decorate([
    (0, tsoa_1.Route)("catalogos/cursos"),
    (0, tsoa_1.Tags)("Cursos")
], CursoController);
// export function ListaTodosCurso (req:Request, res:Response){
//     try{
//         res.status(200).json(cursoService.ListaCursos())
//     }catch(e:unknown){
//         res.status(400).json({status:"Error",
//             message:(e as Error).message})
//     }
// }
