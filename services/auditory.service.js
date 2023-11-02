const db = require('../db')

class AuditoryService {
    //
    async create(
        name_auditory,
        count_computer,
        number_place,
        is_enable_projector,
        is_whiteboard
    ) {
        // const maxId = await db.query(
        //     `SELECT MAX(a.auditory_id) FROM ${process.env.POSTGRES_SCHEMA}.auditory a`
        // )
        const newAuditory = await db.query(
            `INSERT INTO ${process.env.POSTGRES_SCHEMA}.auditory (name_auditory, count_computer, number_place, is_enable_projector, is_whiteboard) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [
                // maxId.rows[0].max + 1,
                name_auditory,
                count_computer,
                number_place,
                is_enable_projector,
                is_whiteboard,
            ]
        )
        return newAuditory
    }

    async getAuditoryAll() {
        const auditoryAll = await db.query(
            `SELECT auditory_id, name_auditory, count_computer, number_place, is_enable_projector, is_whiteboard FROM ${process.env.POSTGRES_SCHEMA}.auditory;`
        )
        return auditoryAll
    }

    async getAuditoryByName(name_auditory) {
        const auditory = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.auditory a where name_auditory = $1`,
            [name_auditory]
        )
        return auditory
    }

    async getAuditoryById(auditory_id) {
        const id = auditory_id
        const auditory = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.auditory a where auditory_id = $1`,
            [id]
        )
        return auditory
    }
}

module.exports = new AuditoryService()
