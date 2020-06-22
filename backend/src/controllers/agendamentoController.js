const connection = require('../database/connection');
const RetornaDataHoraAtual = require('../funcoes');
const {parseISO, isBefore, isAfter, format} = require('date-fns');
const moment = require('moment');
const data_agendamento = RetornaDataHoraAtual();


module.exports = {
    async index(request, response){
        const agendamentos = await connection('agendamento')
            .join('pessoa', 'pessoa.id_pes', '=', 'agendamento.pessoa_id')
            .join('servico', 'servico.id_serv', '=', 'agendamento.servico_id')
            .join('atendente', 'atendente.id_atend', '=', 'agendamento.atendente_id')
            .select([
                'agendamento.*',
                'servico.nome as descricao',
                'atendente.nome as atendente',
                'servico.valor',
                'pessoa.nome',
                'pessoa.telefone',
                'pessoa.cidade' 
            ])
                .orderBy('agendamento.data_inicial', 'asc');

        return response.json(agendamentos);
    },

    async create(request, response){
        const {id_agend, pessoa_id, login_id, servico_id, data_inicial, atendente_id,} = request.body;

        //configuração da data final de acordo com a duração em minutos do serviço
        const duracaoSrv = await connection('servico').select('duracao').where('id_serv', '=', request.body.servico_id);
        const duracaoSrvBanco = duracaoSrv[0].duracao;
        const data_finalBase = moment(request.body.data_inicial, "YYYY-MM-DD HH:mm");
        data_finalBase.add(duracaoSrvBanco, 'minutes').minutes();
        const data_final = data_finalBase.format("YYYY-MM-DD HH:mm");


            //faz comparações para saber se as datas informadas, nao são anteriores ao momento atual
            const verificaDataInicialCreate = parseISO(request.body.data_inicial); //converte a string
            const verificaDataFinalCreate = parseISO(data_final); //converte a string
            const data_inicialAgendCreate = isBefore(verificaDataInicialCreate, new Date()); //verifica se a data inicial é antes do agendamento
            const data_finalAgendCreate = isAfter(verificaDataFinalCreate, verificaDataInicialCreate); //verifica se a data final é depois da inicial
            

            //formatar data inserida

            // const data_inicial_formatada = format(verificaDataInicialCreate, "dd/MM/yyyy HH:mm");
            // const data_final_formatada = format(verificaDataInicialCreate, "dd/MM/yyyy HH:mm");
            //data_incial1 = format(verificaDataInicialCreate, "dd/MM/yyyy HH:mm");
            //data_final1 = format(verificaDataFinalCreate, "dd/MM/yyyy HH:mm");


                //verifica se existem agendamentos no mesmo horario que o novo agendamento
                const buscaAgendaCreate = await connection('agendamento')
                .whereBetween('data_inicial', [request.body.data_inicial, data_final])
                .orWhereBetween('data_final', [request.body.data_inicial, data_final]);
        
                    //verifica se o atendente informado ja possui um agendamento
                    const verAgendaAtendenteCreate = await connection('agendamento')
                    .where('data_inicial', '>=', request.body.data_inicial)
                    .andWhere('data_final', '<=', data_final)
                    .andWhere('atendente_id', '=', request.body.atendente_id)

        
        if(buscaAgendaCreate.length == 0 || verAgendaAtendenteCreate.length == 0){ // verifica se o array de consulta esta vazio

            if(data_inicialAgendCreate == false && data_finalAgendCreate == true){ //verifica se os horarios são anteriores
        
                    await connection('agendamento').insert({
                        id_agend,
                        pessoa_id,
                        login_id,
                        servico_id,
                        data_inicial,
                        data_final,
                        data_agendamento,
                        atendente_id
                    })
                return response.json({id_agend});  
            } else{
                return response.status(401).json({ error: 'Não são permitidos agendamentos em dias ou horários anteriores'});
            } 
        } else{
            return response.status(401).json({ error: 'Já existem agendamentos nesses horários'});
        }         
    },
    
    async delete(request, response){
        const {id_agend} = request.params;

        await connection('agendamento').where({id_agend}, '=', 'id_agend').delete();

        return response.status(204).send();    
    }


}