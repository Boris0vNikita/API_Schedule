const db = require('../db')

class GroupService {
    async create(group_name, speciality, study_form) {
        const maxId = await db.query(
            `SELECT MAX(g.group_id) FROM ${process.env.POSTGRES_SCHEMA}."group" g`
        )

        const newGroup = await db.query(
            `INSERT INTO ${process.env.POSTGRES_SCHEMA}."group" (group_id, group_name, speciality, study_form) VALUES($1, $2, $3, $4) RETURNING *`,
            [maxId.rows[0].max + 1, group_name, speciality, study_form]
        )
        return newGroup
    }

    async getGroupAll() {
        const groupAll = await db.query(
            `SELECT group_id, group_name, speciality, study_form FROM ${process.env.POSTGRES_SCHEMA}."group";`
        )
        return groupAll
    }

    async getGroupById(group_id) {
        const group = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}."group" where group_id = $1`,
            [group_id]
        )
        return group
    }

    async getGroupByName(group_name) {
        const group = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}."group" where group_name = $1`,
            [group_name]
        )
        return group
    }
}

module.exports = new GroupService()
