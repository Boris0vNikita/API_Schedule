const peopleService = require('../services/people.service')

class PeopleController {
    async create(req, res, next) {
        try {
            const {
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
            } = req.body
            const newPeople = await peopleService.create(
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
            )
            res.json(newPeople.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const peopleAll = await peopleService.getPeopleAll()
            res.json(peopleAll.rows)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id
            const post = await peopleService.getPeopleById(id)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PeopleController()
