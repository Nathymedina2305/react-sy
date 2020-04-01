const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        . select('name')
        .first();

        // se o resultado da ong n existir por isso '!ong'
        // 400 algo deu errado
        if (!ong) {
            return response.status(400).json({ error: 'No ONF found with this ID'});
        }

        // caso contrario retorna em formatio json os dados da ong
        return response.json(ong);
    }
}