const db = require('../db')

class AcademicPlanService {
    async create(plan_id, document, group, begin) {
        const newAcademicPlan = await db.query(
            `INSERT INTO ${process.env.POSTGRES_SCHEMA}.academic_plan (plan_id, "document", "group", "begin") VALUES($1, $2, $3, $4) RETURNING *`,
            [plan_id, document, group, begin]
        )
        return newAcademicPlan
    }

    async getAcademicPlanAll() {
        const academicPlanAll = await db.query(
            `SELECT plan_id, "document", "group", "begin" FROM ${process.env.POSTGRES_SCHEMA}.academic_plan;`
        )
        return academicPlanAll
    }

    async getAcademicPlanById(plan_id) {
        const id = plan_id
        const academicPlan = await db.query(
            `select * from ${process.env.POSTGRES_SCHEMA}.academic_plan ap where plan_id = $1`,
            [id]
        )
        return academicPlan
    }
}

module.exports = new AcademicPlanService()
