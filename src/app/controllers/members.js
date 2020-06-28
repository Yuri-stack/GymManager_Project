//Variáveis
const { age, date } = require('../../lib/utils.js')

module.exports = {

    //Função para o INDEX
    index(req, res){
        return res.render("members/index")
    },

    //Função que redireciona para a página de criação
    redirectCreate(req, res){
        return res.render('members/create') 
    },

    //Função para CREATE
    post(req, res){
                                                                                                         
        const keys = Object.keys(req.body)                  //a var KEY está pegando o nome dos campos(key) do formulário através do Constructor Object e dá função Keys

        for(key of keys){                                   //verificando se cada key está preenchidas
            if(req.body[key] == ""){                        //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send('Please, fill all fields')
            }
        }
    
        return
    },

    //Função para MOSTRAR
    show(req, res){

        return
    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        return
    },

    //Função para ATUALIZAR
    put(req, res){

        const keys = Object.keys(req.body)                  //a var KEY está pegando o nome dos campos(key) do formulário através do Constructor Object e dá função Keys

        for(key of keys){                                   //verificando se cada key está preenchidas
            if(req.body[key] == ""){                        //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send('Please, fill all fields')
            }
        }
    
        let { avatar_url, birth, name, services, gender } = req.body   //desestruturando o req.body
    
        return
    },

    //Função para APAGAR
    delete(req, res){

        return
    }
}