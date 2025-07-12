"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
const mysql2_1 = __importDefault(require("mysql2"));
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ifsp',
    database: 'biblioteca'
};
const mysqlConnection = mysql2_1.default.createConnection(dbConfig);
function executarComandoSQL(query, valores) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}
// mysqlConnection.connect((err)=>{
//     if(err){
//         console.error('Erro ao conectar ao bando de dados:', err);
//         throw err;
//     }
//     console.log('Conexão bem-sucedida com o bando de dados MySQL');
// })
