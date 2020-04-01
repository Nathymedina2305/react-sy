//importando todas as funcionalidades do express
const express = require('express');
const cors = require('cors');
// exportando as rotas para ca
// coomo o routes é um arquivo e n um pacote 
//tenho que colocar o caminho relativo './'
const routes = require('./routes');

// minha rota
const app = express();

// antes de todas as requisições o express converte o meu json em algo comprensivel
app.use(cors());
app.use(express.json());
app.use(routes);

//minha rota
//app.get('/', (request, Response) => {
  //  return Response.send('Hello World');
//});

/**
 * Rota / Recurso
 */

 /**
  *  Métodos HTTP:
  * 
  * GET: Buscar/listar uma informação do back-end
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

  /**
   * Tipos de parâmetros:
   * 
   * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
   * Route Params: Parâmetros utilizados para identificar recursos
   * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
   */

   /**
    * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    * NoSQL: MongoDB, CouchDB, etc
    */

    /**
     * Driver: SELECT * FROM users
     * Query Builder: table('users').select('*').where()
     */

//porta
app.listen(3333);