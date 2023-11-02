const auditoryService = require('../services/auditory.service')

class AuditoryController {
    async create(req, res, next) {
        try {
            const {
                name_auditory,
                count_computer,
                number_place,
                is_enable_projector,
                is_whiteboard,
            } = req.body
            const newAuditory = await auditoryService.create(
                name_auditory,
                count_computer,
                number_place,
                is_enable_projector,
                is_whiteboard
            )
            res.json(newAuditory.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const auditoryAll = await auditoryService.getAuditoryAll()
            res.json(auditoryAll.rows)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id
            const post = await auditoryService.getAuditoryById(id)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }
    async getByName(req, res, next) {
        try {
            const name = req.params.name
            const post = await auditoryService.getAuditoryByName(name)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuditoryController()
