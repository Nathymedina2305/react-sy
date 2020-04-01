// exportando a conexão do bd
const connection = require('../database/connection');

// exportar um objeto
module.exports = {
    async index(request, response){
        // paginação caso o page n exista sera o numero 1
        const { page = 1 } = request.query;

        // me retorna a posiçao da array
        // é um contador
        const [count] = await connection('incidents').count();

        // o limit limita q venha somente 5 registros
        // o offset ao chegar no 5 registro ele faz um calculo para ir para o proximo registro e segue assima 
        // para cada pagina
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        // a resposta de quanto incidentes tem será colocada no header do insomnia
        response.header('X-Total-Count', count['count(*)']);    

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // uma array, vai ser guardado na variavel id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id })
    },

    // coloque o ong_id pois preciso saber se a ong q criou o caso está deletando o seu e n o de outro
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //onde esse 'id' é igual o q eu acabei de declarar
        // select apena a coluna ong_id
        // como sei q vai ser somente um registro usamos o first, q retorna apenas um resultado
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        // esse 401 é codigo padrão de n autorizado
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'})
        }

        // se deu tudo certo sera deletado do bd esse incidente
        await connection('incidents').where('id', id).delete();

        // o 204 é quando vamos retornar uma resposta para nosso frontend q n tem 
        //conteudo o status pode ser 204
        // send serve para enviar a resposta sem corpo
        return response.status(204).send();
    }
}