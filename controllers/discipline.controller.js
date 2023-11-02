const disciplineService = require('../services/discipline.service')

class DisciplineController {
    async create(req, res, next) {
        try {
            const { discipline_name } = req.body
            const newDiscipline = await disciplineService.create(
                discipline_name
            )
            res.json(newDiscipline.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const disciplineAll = await disciplineService.getDisciplineAll()
            res.json(disciplineAll.rows)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id
            const post = await disciplineService.getDisciplineById(id)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }

    async getByName(req, res, next) {
        try {
            const name = req.params.name
            const post = await disciplineService.getDisciplineByName(name)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DisciplineController()
