const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const pessoas = await connection('pessoa').select('*');

        return response.json(pessoas);
    },

    async create(request, response){
        const {id_pes, nome, email, telefone, cidade, uf} = request.body;

        const ver_nome = await connection('pessoa').select('nome').where('nome', '=', request.body.nome); //verifica se o usuario ja existe no banco

            if(ver_nome == ""){

                await connection('pessoa').insert({
                    id_pes,
                    nome,
                    email,
                    telefone,
                    cidade,
                    uf,
                })

                return response.json({id_pes});

            } else {
            return response.status(401).json({ error: 'Esse nome já existe no cadastro' });
        }
    },

    async edit(request, response){
        const {id_pes} = request.params;
        const {nome, email, telefone, cidade, uf} = request.body;
        const ver_nome = await connection('pessoa').select('nome').where('nome', '=', request.body.nome);

        if(ver_nome == ""){

            await connection('pessoa').update({
                nome,
                email,
                telefone,
                cidade,
                uf,
            }).where({id_pes}, '=', 'id_pes');
            return response.status(204).send();
        } else{
            return response.status(401).json({ error: 'Esse nome já existe no cadastro' });
        }
    },

    async delete(request, response){
        const {id_pes} = request.params;

        await connection('pessoa').where({id_pes}, '=', 'id_pes').delete();

    return response.status(204).send();    
    }
}

