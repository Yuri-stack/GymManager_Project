//Variáveis
const fs = require('fs')                        //fs é um módulo que permite para interagir com o sistema de arquivos 
const data = require('../data.json')
const { date } = require('../utils')        //desistruturando o objeto e pegando somente o age e date
const Intl = require('intl')                    //importando o INTL para arrumar a data

//Função para o INDEX
exports.index = function(req, res){
    return res.render("members/index", { members : data.members })
}

//Função que redireciona para a página de criação
exports.redirectCreate = function(req, res){
    return res.render('members/create')
}

//Função para CREATE
exports.post = function(req, res){              //Post é o nome da função, mas poderia ser qualquer outro
                                                        //usando o metodo Post temos que pegar as info através do Req.Body
    const keys = Object.keys(req.body)                  //a var KEY está pegando o nome dos campos(key) do formulário através do Constructor Object e dá função Keys

    for(key of keys){                                   //verificando se cada key está preenchidas
        if(req.body[key] == ""){                        //é o mesmo que fazer req.body.(cada item do vetor) == ""
            return res.send('Please, fill all fields')
        }
    }

    let id = 1
    birth = Date.parse(req.body.birth)                          //transforma o campo req.body.birth em um campo Date
    const lastMember = data.members[data.members.length - 1]    //pega o último item do array 

    if(lastMember){
        id = lastMember.id + 1                          //pega o id do último item do array         
    }

    data.members.push({                             //aqui add os dados enviados pelo req.body para dentro do array chamado Members
        ...req.body,
        id,
        birth
    })                     

    // fs.writeFile("data.json", JSON.stringify(req.body), function(){}    //a forma inline da função abaixo 
    
    fs.writeFile(                                       //writeFile é um metodo do file system(fs) para escrever arquivos, que no caso serve para salvar as info.
                "data.json",                            //primeiro parametro pede o nome do arquivo a ser gerado                       
                JSON.stringify(data, null, 2),          //segundo parametro pede o tipo do arquivo, usamos o constructor JSON com o metodo stringify para transformar as info carregadas no data.json em JSON. Dentro do stringify o 2º é o null por enquanto, e o 3º é o espaçamento entre as linhas do Array
                function(err){                          //terceiro parametro pede uma CallBack, função que executa após certo tempo e é passada como parametro dentro de outra função 
        if(err) return res.send("Write file error!")    //no caso, usamos a CallBack para verificar se algum erro ocorreu, assim o processo do Programa não trava.

        return res.redirect(`/members/${id}`)
    })
}

//Função para MOSTRAR
exports.show = function(req, res){

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember) return res.send('Member not found')

    const member = {
        ...foundMember,                                         //usando o operador Spread Operator onde ele armazena os outros campo do foundMember que não serão alterados
        birth: date(foundMember.birth).birthDay,                //passando a data de nascimento em forma de timestamp para a função age(timestamp)
    }

    return res.render('members/show', { member : member })
}

//Função para CARREGAR INFORMAÇÕES PARA EDITAR
exports.edit = function(req,res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if(!foundMember) return res.send('Member not found')

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso  //chamanda a função e passando como paramentro o nasc. do instrutor
    }

    return res.render('members/edit', { member })

}

//Função para ATUALIZAR
exports.put = function(req, res){

    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){  //vai procurar o instrutor e a posição dele no array
        if(id == member.id){
            index = foundIndex
            return true

            /* 
                verificamos se o instrutor procurado existe, e se existe pegamos seus dados e 
                também atualizamos a variavel index com a posição desse instrutor no array 
            */

        }
    })

    if(!foundMember) return res.send('Member not found')

    const member = {
        ...foundMember,                 //usando o operador Spread Operator onde ele armazena os campos do foundMember que não serão alterados
        ...req.body,                        //usando o operador Spread Operator onde ele armazena os dados vindo do req.body
        birth: Date.parse(req.body.birth),  //chamanda a função e passando como paramentro o nasc. do instrutor pego pelo req.body
        id: Number(req.body.id)
    }

    data.members[index] = member    
    /* pegamos as informações que foram alteradas e as que não foram relacionadas 
    ao instrutor e atualizamos os dados desse instrutor na posição dele */

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error')

        return res.redirect(`/members/${id}`)
    })

}

//Função para APAGAR
exports.delete = function(req, res){

    const { id } = req.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")

        return res.redirect("/members")
    })

    /* Para cada instrutor dentro do array, o método Filter faz um filtro verificando se 
        o ID informado pelo req.body é diferente do ID que o método está verificando no Array.
     
        Quando o ID é diferente, ele é armazenado na constante filteredMembers e quando 
        for igual, ou seja, é o ID do instrutor que queremos apagar ele é retirado do Array.
     */

}
