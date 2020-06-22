const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const produtos = await connection('produto').select('*');

        return response.json(produtos);
    },

    async create(request, response){
        const {id_prod, cod_bar, descricao, quantidade, valor} = request.body;
        const ver_descricao = await connection('produto').select('descricao').where('descricao', '=', request.body.descricao);

        if(ver_descricao == ""){
            await connection('produto').insert({
                id_prod,
                cod_bar,
                descricao,
                quantidade,
                valor,
            })

            return response.json({id_prod});
        } else {
            return response.status(401).json({ error: 'Essa descrição já existe no cadastro' });
        }    
    },

    async edit(request, response){
        const {id_prod} = request.params;
        const {cod_bar, descricao, quantidade, valor} = request.body;
      
            await connection('produto').update({
                cod_bar,
                descricao,
                quantidade,
                valor,
            }).where({id_prod}, '=', 'id_prod');
            return response.status(204).send();
    },

    async delete(request, response){
        const {id_prod} = request.params;

        await connection('produto').where({id_prod}, '=', 'id_prod').delete();

    return response.status(204).send();    
    }
}