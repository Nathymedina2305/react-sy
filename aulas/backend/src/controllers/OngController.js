// com o crypto podemos gerar um texto aleatorio
const crypto = require('crypto');

// importando a conexão do bd
const connection = require('../database/connection');

// vai exportaar um objeto com metodos
module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf} = request.body;
    
    /**
     * Com o const id, pego o texto gerado aleatoriamente pelo crypto, transformo em numero
     * e depois para um numero hexadecimal
     */
    const id = crypto.randomBytes(4).toString('HEX');
    
    // irei conectar com a tabela ongs e inserir dados
    // o await, ocorre: quando o node chegar nessa parte ele vai esperar esse codigo finalizar para
    // então emitir uma resposta/continuar
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    // so irei devolver o id
    return response.json({ id });  
    }
}