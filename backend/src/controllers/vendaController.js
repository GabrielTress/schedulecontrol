const connection = require('../database/connection');
const RetornaDataHoraAtual = require('../funcoes');

module.exports = {
    async index(request, response){
        const vendas = await connection('venda', 'produto')
            .join('pessoa', 'pessoa.id_pes', '=', 'venda.pessoa_id')
            .join('produto', 'produto.id_prod', '=', 'venda.produto_id')
            .select([
                'venda.*',
                'produto.descricao',
                'pessoa.nome',
                'pessoa.telefone',
                'pessoa.cidade'   
    ]);

        return response.json(vendas);
    },

    async create(request, response){
        const{id_vend, produto_id, pessoa_id, quantidade, status} = request.body;

        //busca valor do produto
        const arrayValor = await connection('produto').select('valor').where('id_prod', '=', request.body.produto_id);
        const valor = arrayValor[0].valor;

        const total = quantidade * valor;
        const data_venda = RetornaDataHoraAtual();


        //const valor = removeArrayValor.valor; 
        
            //verificação de estoque
           const arrayEstoque = await connection('produto').select('quantidade').where('id_prod', '=', request.body.produto_id);
           const qtdEstoque = arrayEstoque[0].quantidade;


            if(qtdEstoque >= request.body.quantidade){

                await connection('venda').insert({
                    id_vend,
                    produto_id,
                    pessoa_id,
                    quantidade,
                    valor,
                    data_venda,
                    status,
                    total,
                })
                        // atualização do estoque de acordo com a venda.
                        await connection('produto').where('id_prod', '=', request.body.produto_id)
                             .update('quantidade', (qtdEstoque - request.body.quantidade));

                return response.json({id_vend});
                

            } else {
                
                return response.status(401).json({ error: 'Quantidade de venda não está disponível em estoque' });
              }    
    }

}