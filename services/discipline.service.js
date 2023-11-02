const db = require('../db')

class DisciplineService {
    async create(discipline_name) {
        console.log(discipline_name)
        const maxId = await db.query(
            `SELECT MAX(d.discipline_id) FROM ${process.env.POSTGRES_SCHEMA}.discipline d`
        )
        const newDiscipline = await db.query(
            `INSERT INTO ${process.env.POSTGRES_SCHEMA}.discipline (discipline_id, discipline_name) VALUES($1, $2) RETURNING *`,
            [maxId.rows[0].max + 1, discipline_name]
        )
        return newDiscipline
    }

    async getDisciplineAll() {
        const disciplineAll = await db.query(
            `SELECT discipline_id, discipline_name FROM ${process.env.POSTGRES_SCHEMA}.discipline;`
        )
        return disciplineAll
    }

    async getDisciplineById(discipline_id) {
        const id = discipline_id
        const discipline = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.discipline where discipline_id = $1`,
            [id]
        )
        return discipline
    }

    async getDisciplineByName(discipline_name) {
        if (!discipline_name) {
            return
        }
        const discipline = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.discipline where discipline_name = $1`,
            [discipline_name]
        )
        return discipline
    }
}

module.exports = new DisciplineService()
