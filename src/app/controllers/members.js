//Variáveis
const Member = require('../models/Member')
const { date } = require('../../lib/utils.js')

module.exports = {

    //Função para o INDEX
    index(req, res){

        let { filter, page, limit } = req.query

        page = page || 1                    //se houver o parametro PAGE, recebe o próprio paramemetro, senão recebe 1
        limit = limit || 3                  //se houver o parametro LIMIT, recebe o próprio paramemetro, senão recebe 2
        let offset = limit * (page - 1)     //vamos pegar o num da PAGE menos 1 e multiplicar pelo LIMIT para trazer os registros de 2 em 2

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members){      //essa callback é a mesma callback que mandamos para o Model, aqui só estamos enviando dessa maneira para mostrar outra forma 

                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }
                
                return res.render("members/index", { members, pagination, filter })
            }
        }

        Member.paginate(params)

    },

    //Função que redireciona para a página de criação
    redirectCreate(req, res){

        Member.instructorSelectOptions(function(options){
            return res.render('members/create', { instructorOptions: options }) 
        })
        
    },

    //Função para CREATE
    post(req, res){

        const keys = Object.keys(req.body)                  //a var KEY está pegando o nome dos campos(key) do formulário através do Constructor Object e dá função Keys

        for(key of keys){                                   //verificando se cada key está preenchidas
            if(req.body[key] == ""){                        //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send('Please, fill all fields')
            }
        }
                                                                                                         
        Member.create(req.body, function(member){           //aqui o member é o resultado da operação
            return res.redirect(`/members/${ member.id }`)
        })
    },

    //Função para MOSTRAR
    show(req, res){

        Member.find( req.params.id, function( member ){
            if(!member) return res.send("Member not found")

            member.birth = date(member.birth).birthDay      //aqui ajustamos os dados para mostrar

            return res.render("members/show", { member })
        })
    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        Member.find( req.params.id, function( member ){
            if(!member) return res.send("Member not found")

            member.birth = date(member.birth).iso                      //aqui ajustamos os dados para mostrar

            Member.instructorSelectOptions(function(options){
                return res.render('members/edit', { member, instructorOptions: options }) 
            })
        })
    },

    //Função para ATUALIZAR
    put(req, res){

        const keys = Object.keys(req.body)                  //a var KEY está pegando o nome dos campos(key) do formulário através do Constructor Object e dá função Keys

        for(key of keys){                                   //verificando se cada key está preenchidas
            if(req.body[key] == ""){                        //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send('Please, fill all fields')
            }
        }

        Member.update(req.body, function(){
            return res.redirect(`/members/${req.body.id}`)
        })
    
    },

    //Função para APAGAR
    delete(req, res){

        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    }
    
}