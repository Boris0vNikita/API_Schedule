const db = require('../db')

class ViewGroupDataService {
    async getDataGroupAll() {
        const groupAll = await db.query(
            `select * from ${process.env.POSTGRES_SCHEMA}.jsonData`
        )
        return groupAll
    }

    async getDataGroup(group_name) {
        console.log(group_name)
        const name = group_name
        const group = await db.query(
            `select * from ${process.env.POSTGRES_SCHEMA}.jsonData j where  j.group_name = $1`,
            [name]
        )
        return group
    }
}

module.exports = new ViewGroupDataService()
