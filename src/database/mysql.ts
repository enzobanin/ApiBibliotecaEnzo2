import mysql, {Connection, QueryError} from 'mysql2';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ifsp',
    database: 'biblioteca'
}

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

export function executarComandoSQL(query:string, valores:any[]): Promise<any>{
    return new Promise((resolve, reject)=> {
        mysqlConnection.query(query,valores,(err,resultado)=>{
            if(err){
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