const groupService = require('../services/group.service')

class GroupController {
    async create(req, res, next) {
        try {
            const { group_name, speciality, study_form } = req.body
            const newGroup = await groupService.create(
                group_name,
                speciality,
                study_form
            )
            res.json(newGroup.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const groupAll = await groupService.getGroupAll()
            res.json(groupAll.rows)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id
            const post = await groupService.getGroupById(id)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }

    async getByName(req, res, next) {
        try {
            const name = req.params.name
            const post = await groupService.getGroupByName(name)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GroupController()
