const connection = require('../database/connection');


module.exports = {
    async index(request, response){
        const atendentes = await connection('atendente').select('*');

    return response.json(atendentes);
    },

    
    async create(request, response){
  
        const {id_atend, nome, comissao} = request.body;
        const ver_atendente = await connection('atendente').select('nome').where('nome', '=', request.body.nome); //verifica se o usuario ja existe no banco

            if(ver_atendente == ""){

                await connection('atendente').insert({
                    id_atend,
                    nome,
                    comissao,
                })

                return response.json({id_atend});

            } else {
            return response.status(401).json({ error: 'Por favor, insira um nome diferente' });
            }    
    },

    async edit(request, response){
        const {id_atend} = request.params;
        const {nome, comissao} = request.body;
        const ver_nomeEditado = await connection('atendente').select('nome').where('nome', '=', request.body.nome);
      
            if(ver_nomeEditado == ""){

                await connection('atendente').update({
                    nome,
                    comissao,
                }).where({id_atend}, '=', 'id_atend');

                return response.status(204).send();

            } else{
                return response.status(401).json({ error: 'Por favor, insira um nome diferente' });
            }
    },

    async delete(request, response){
        const {id_atend} = request.params;

        await connection('atendente').where({id_atend}, '=', 'id_atend').delete();

    return response.status(204).send();    
    }
    
}