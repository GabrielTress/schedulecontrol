const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


module.exports = {
    async index(request, response){
        const logins = await connection('login').select('*');

    return response.json(logins);
    },

    
    async create(request, response){

  
        const {id_login, nome, logon, senhaUser, email, telefone} = request.body;
        const adm = "False";
        const ver_logon = await connection('login').select('logon').where('logon', '=', request.body.logon); //verifica se o usuario ja existe no banco

        
        const senha = bcrypt.hashSync((request.body.senhaUser), salt);

            if(ver_logon == ""){

                await connection('login').insert({
                    id_login,
                    nome,
                    logon,
                    senha,
                    email,
                    telefone,
                    adm,
                })

                return response.json({id_login});

            } else {
            return response.status(401).json({ error: 'Por favor, insira um nome de usuário diferente' });
            }    
    },

    async edit(request, response){
        const {id_login} = request.params;
        const {nome, logon, senhaUser, email, telefone} = request.body;
        const ver_logonEditado = await connection('login').select('logon').where('logon', '=', request.body.logon);

        const senha = bcrypt.hashSync((request.body.senhaUser), salt);
      
            if(ver_logonEditado == ""){

                await connection('login').update({
                    nome,
                    logon,
                    senha,
                    email,
                    telefone,
                }).where({id_login}, '=', 'id_login');

                return response.status(204).send();

            } else{
                return response.status(401).json({ error: 'Por favor, insira um nome de usuário diferente' });
            }
    },

    async delete(request, response){
        const {id_login} = request.params;

        await connection('login').where({id_login}, '=', 'id_login').delete();

    return response.status(204).send();    
    }


    //query para validar senha no login

    //connection.query("SELECT * FROM usuarios WHERE nome = ?", [nomeDigitadoPeloUsuario],
    //function(err, rows) {
    //     if (err) {
    //        return (err);
    //    }
    //    if (bcrypt.hashSync(senhaDigitadaPeloUsuario, salt) === rows[0].senha) {
          //senha correta!
    //    }
    
}
    
