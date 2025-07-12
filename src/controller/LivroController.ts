// import { Request, Response } from "express";
// import { LivroService } from "../service/LivroService";
// const livroService = LivroService.getInstance();

// export function CadastrarLivro(req:Request, res:Response){
//     try{
//         const NovoLivro = livroService.CadastrarLivro(req.body);
//         res.status(201).json({
//             mensagem:"Livro adicionado!",
//             Livro:NovoLivro
//         });
//     }catch(error:unknown){
//         let message:string = "Não foi possível cadastrar o livro"
//         if(error instanceof Error){
//             message = error.message;
//         }
//          res.status(500).json({ status: "Erro", message })
//     }
// }

// export function MostrarTodosLivrosPorISBN(req:Request,res:Response):void{
//     try{
//         let isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         res.status(200).json(livroService.ListaLivrosPorISBN(isbn));
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }
// export function MostrarLivrosFiltrados(req: Request, res: Response): void {
//   try {
//     const { titulo, autor, editora, categoria_id } = req.query;

//     const query = {
//       titulo: typeof titulo === "string" ? titulo : undefined,
//       autor: typeof autor === "string" ? autor : undefined,
//       editora: typeof editora === "string" ? editora : undefined,
//       categoria_id: categoria_id ? parseInt(categoria_id as string) : undefined,
//     };

//     const livros = livroService.ListaLivrosFiltrados(query);
//     res.status(200).json(livros);
//   } catch (e: unknown) {
//     res.status(400).json({ status: "Erro interno", message: (e as Error).message });
//   }
// }
// export function AtualizaLivro(req:Request, res:Response):void{
//     try{
//         const isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const LivroAtualizado = livroService.AtualizaLivros(isbn,req.body);
//         res.status(200).json(LivroAtualizado);
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }

// export function DeletaLivroPorISBN(req:Request, res:Response):void{
//     try{
//         const isbn = req.params.isbn;
//         if (typeof isbn !== 'string' || isbn.trim() === '') {
//             res.status(400).json({ status: "Erro", message: "ISBN Inválido" });
//             return;
//         }
//         const resultado = livroService.DeleteLivroPorisbn(isbn);
//         res.status(200).json({
//             status:"Deletado com sucesso",
//             deletado : resultado
//         });
//     }catch(e:unknown){
//         res.status(400).json({status:"Erro interno",
//             message:(e as Error).message})
//     }
// }