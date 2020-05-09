const express = require('express')
const routes = express.Router()     //declarando que a variavel routes irá gerenciar as rotas

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res){
    return res.render('instructors/index')
})

routes.get('/members', function(req, res){
    return res.send('members')
})

module.exports = routes