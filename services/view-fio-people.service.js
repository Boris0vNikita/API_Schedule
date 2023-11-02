const db = require('../db')

class ViewFioPeopleService {
    async getFioPeopleAll() {
        const fioAll = await db.query(
            `select * from ${process.env.POSTGRES_SCHEMA}.fioPeople`
        )
        return fioAll
    }

    async getFioPeople(fio) {
        if (!fio) {
            return
        }
        const fios = await db.query(
            `select * from ${process.env.POSTGRES_SCHEMA}.data_fio d where d.fio = $1  limit 1`,
            [fio]
        )
        return fios
    }
}

module.exports = new ViewFioPeopleService()
