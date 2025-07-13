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
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EstoqueEntradaDto_1 = require("../model/dto/EstoqueEntradaDto");
let EstoqueController = class EstoqueController extends tsoa_1.Controller {
    estoqueService = EstoqueService_1.EstoqueService.getInstance();
    async CadastrarExemplar(dto, fail, success) {
        try {
            const exemplar = await this.estoqueService.InsertExemplar(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Exemplar adicionado: ", exemplar));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaExemplarDisponivel(fail, success) {
        try {
            return await this.estoqueService.ListaExemplarComDisponibilidae();
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async ListaExemplarPorISBN(fail, success, isbn) {
        try {
            return await this.estoqueService.ListaExemplarPorISBN(isbn);
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async AtualizaExemplarPorISBN(fail, success, isbn, dto) {
        try {
            const exemplarAtualizado = await this.estoqueService.UpdateEstoque(isbn, dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Exemplar atualizado: ", exemplarAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async DeletaExemplarPorISBN(fail, success, isbn) {
        try {
            const resultado = await this.estoqueService.DeleteExemplarPorISBN(isbn);
            if (resultado) {
                return success(201, new BasicResponseDto_1.BasicResponseDto("Exemplar deletado: ", resultado));
            }
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueEntradaDto_1.EstoqueEntradaDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "CadastrarExemplar", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "ListaExemplarDisponivel", null);
__decorate([
    (0, tsoa_1.Get)("isbn"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "ListaExemplarPorISBN", null);
__decorate([
    (0, tsoa_1.Put)("isbn"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, EstoqueEntradaDto_1.EstoqueEntradaDto]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "AtualizaExemplarPorISBN", null);
__decorate([
    (0, tsoa_1.Delete)("isbn"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "DeletaExemplarPorISBN", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("estoque"),
    (0, tsoa_1.Tags)("Estoque")
], EstoqueController);
// export function InserirExemplar(req:Request, res:Response){
//     try{
//         const novoExemplar = estoqueService.InsereNovoExemplar(req.body);
//         res.status(201).json({
//             status:"Exemplar Adicionado com sucesso",
//             Exemplar: novoExemplar
//         });
//     }catch(error:unknown){
//         let message:string = "Não foi possível cadastrar o exemplar"
//         if(error instanceof Error){
//             console.error("Erro ao cadastrar exemplar", error.message);
//             message = error.message;
//         }
//          res.status(400).json({ status: "Erro", message })
//     }
// }
// export function ListaExemplarPorDisponibilidade(req:Request,res:Response):void{
//     try{
//         res.status(200).json(estoqueService.ListaExemplarComDisponibilidade());
//     }catch(e:unknown){
//         res.status(400).json({status:"Operação Invalida",
//             message:(e as Error).message})
//     }
// }
// export function ListaExemplarPorISBN(req:Request, res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         res.status(200).json(estoqueService.ListaExemplarPorISBN(isbn));
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
// export function AtualizaDisponibilidadePorISBN(req:Request, res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const exemplarAtualizado =estoqueService.AtualizaDisponibilidade(isbn,req.body)
//         res.status(201).json({
//             status:"Exemplar Atualizado com sucesso",
//             ExemplarAtualizado: exemplarAtualizado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
// export function DeletaExemplarPorISBN(req:Request, res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const exemplarDeletado = estoqueService.DeleteExemplarPorISBN(isbn)
//         res.status(201).json({
//             status:"Exemplar Deletado com sucesso",
//             ExemplarDeletado: exemplarDeletado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
