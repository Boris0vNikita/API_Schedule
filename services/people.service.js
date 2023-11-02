const db = require('../db')

class PeopleService {
    async create(
        people_id,
        first_name,
        last_name,
        patronymic,
        mobile_phone,
        home_phone,
        email,
        pass,
        seniority,
        gender,
        birthdate,
        citizenship,
        image
    ) {
        // console.log(group_id, group_name, speciality, study_form)
        const newPeople = await db.query(
            `INSERT INTO ${process.env.POSTGRES_SCHEMA}.people (people_id, first_name, last_name, patronymic, mobile_phone, home_phone, email, pass, seniority, gender, birthdate, citizenship, image) VALUES($1, $2, $3, $4, $5, $6 , $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [
                people_id,
                first_name,
                last_name,
                patronymic,
                mobile_phone,
                home_phone,
                email,
                pass,
                seniority,
                gender,
                birthdate,
                citizenship,
                image,
            ]
        )
        return newPeople
    }

    async getPeopleAll() {
        const peopleAll = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.people;`
        )
        return peopleAll
    }

    // async getPeopleFio() {
    //     const peopleFio = await db.query(
    //         `select p.people_id ,concat(p.last_name,'.',' ',left(p.first_name,1),'.',left(p.patronymic,1),'.') as fio from ${process.env.POSTGRES_SCHEMA}.people p`
    //     )
    //     return peopleFio
    // }

    async getPeopleById(group_id) {
        const id = group_id
        const people = await db.query(
            `select * from ${process.env.POSTGRES_SCHEMA}.people where  people_id = $1`,
            [id]
        )
        return people
    }
}

module.exports = new PeopleService()
