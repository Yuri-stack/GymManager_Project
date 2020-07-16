const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para selecionar todos os membros
    all( callback ){

        db.query(`SELECT * FROM members ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })

    },

    //Função para criar um novo Membro
    create( data, callback ){                       //data aqui é o req.body

        const query = `
            INSERT INTO members (
                name,
                avatar_url, 
                gender,
                email,
                birth,
                blood,
                weight,
                height
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height
        ]
        
        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])               //estamos retornando o membro criado
            
        })

    },

    //Função para retornar um Membro específico
    find( id, callback ){

        db.query(`
            SELECT * FROM members WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
        })

    },

    //Função para atualizar um Membro
    update( data, callback ){

        const query = `
            UPDATE members SET 
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                email = ($5),
                blood = ($6),
                weight = ($7),
                height = ($8)
            WHERE id = $9
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.blood,
            data.weight,
            data.height,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    //Função para apagar um Membro
    delete( id, callback ){

        db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
    
}