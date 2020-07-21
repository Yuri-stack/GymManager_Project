const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    //Função para selecionar todos os instrutores
    all( callback ){

        db.query(`
        SELECT instructors.* , count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructor_id = instructors.id)
        GROUP BY instructors.id
        ORDER BY total_students DESC`, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })

    },

    //Função para criar um novo Instrutor
    create( data, callback ){                       //data aqui é o req.body

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
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]
        
        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])               //estamos retornando o instrutor criado
            
        })

    },

    //Função para retornar um Instrutor específico
    find( id, callback ){

        db.query(`
            SELECT * FROM instructors WHERE id = $1`, [id], function(err, results){
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
        })

    },

    //Função para atualizar um Instrutor
    update( data, callback ){

        const query = `
            UPDATE instructors SET 
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                services = ($5)
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    //Função para apagar um Instrutor
    delete( id, callback ){

        db.query(`DELETE FROM instructors WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    }
    
}