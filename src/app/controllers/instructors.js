//Variáveis
const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {

    //Função para o INDEX
    index(req, res){
        return res.render("instructors/index")
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
    
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url, 
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]
        
        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error!")
            
            return res.redirect(`/instructors/${results.rows[0].id}`)
        })
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