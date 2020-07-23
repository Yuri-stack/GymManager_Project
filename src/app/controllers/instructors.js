//Variáveis
const Instructor = require('../models/Instructor')
const { age, date } = require('../../lib/utils')

module.exports = {

    //Função para o INDEX
    index(req, res){

        const { filter } = req.query

        if(filter){
            Instructor.findBy(filter, function(instructors){
                return res.render("instructors/index", { instructors, filter })
            })
        }else{
            Instructor.all(function(instructors){
                return res.render("instructors/index", { instructors })
            })
        }

    },

    //Função que redireciona para a página de criação
    redirectCreate(req, res){
        return res.render('instructors/create') 
    },

    //Função para CREATE
    post(req, res){

        const keys = Object.keys(req.body)                  //a var KEY está pegando o nome dos campos(key) do formulário através do Constructor Object e dá função Keys

        for(key of keys){                                   //verificando se cada key está preenchidas
            if(req.body[key] == ""){                        //é o mesmo que fazer req.body.(cada item do vetor) == ""
                return res.send('Please, fill all fields')
            }
        }
                                                                                                         
        Instructor.create(req.body, function(instructor){           //aqui o instructor é o resultado da operação
            return res.redirect(`/instructors/${ instructor.id }`)
        })
    },

    //Função para MOSTRAR
    show(req, res){

        Instructor.find( req.params.id, function( instructor ){
            if(!instructor) return res.send("Instructor not found")

            instructor.age = age(instructor.birth)                      //aqui ajustamos os dados para mostrar
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },

    //Função para CARREGAR INFORMAÇÕES PARA EDITAR
    edit(req, res){

        Instructor.find( req.params.id, function( instructor ){
            if(!instructor) return res.send("Instructor not found")

            instructor.birth = date(instructor.birth).iso                      //aqui ajustamos os dados para mostrar

            return res.render("instructors/edit", { instructor })
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

        Instructor.update(req.body, function(){
            return res.redirect(`/instructors/${req.body.id}`)
        })
    
    },

    //Função para APAGAR
    delete(req, res){

        Instructor.delete(req.body.id, function(){
            return res.redirect(`/instructors`)
        })
    }
}