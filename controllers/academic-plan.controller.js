const academicPlanService = require('../services/academic-plan.service')

class AcademicPlanController {
    async create(req, res, next) {
        try {
            const { plan_id, document, group, begin } = req.body
            const newAcademicPlan = await academicPlanService.create(
                plan_id,
                document,
                group,
                begin
            )
            res.json(newAcademicPlan.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const academicPlanAll =
                await academicPlanService.getAcademicPlanAll()
            res.json(academicPlanAll.rows)
        } catch (e) {
            next(e)
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id
            const post = await academicPlanService.getAcademicPlanById(id)
            res.json(post.rows)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AcademicPlanController()
