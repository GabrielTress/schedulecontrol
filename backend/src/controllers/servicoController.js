const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const servicos = await connection('servico').select('*');

        return response.json(servicos);
    },

    async create(request, response){
        const{id_serv, nome, valor, duracao} = request.body;
        const ver_nome = await connection('servico').select('nome').where('nome', '=', request.body.nome);


        if(ver_nome == ""){

            await connection('servico').insert({
                id_serv,
                nome,
                valor,
                duracao,
            })
            return response.json({id_serv});

        } else {

            return response.status(401).json({ error: 'Essa descrição já existe no cadastro'});
        }
    },

    async edit(request, response){
        const {id_serv} = request.params;
        const {nome, valor, duracao} = request.body;
        const ver_nomeEditado = await connection('servico').select('nome').where('nome', '=', request.body.nome);
      
            if(ver_nomeEditado == ""){

                await connection('servico').update({
                    nome,
                    valor,
                    duracao,
                }).where({id_serv}, '=', 'id_serv');
                return response.status(204).send();

            } else{
                return response.status(401).json({ error: 'Essa descrição já existe no cadastro'});
            }    
    },

    async delete(request, response){
        const {id_serv} = request.params;

        await connection('servico').where({id_serv}, '=', 'id_serv').delete();

        return response.status(204).send();    
    }

}