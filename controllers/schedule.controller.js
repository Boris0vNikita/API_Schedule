const scheduleService = require('../services/schedule.service')

class ScheduleController {
    async create(req, res, next) {
        try {
            const {
                group,
                auditory,
                tutor,
                time_start,
                time_end,
                weekday,
                discipline,
                is_temp,
                semestr,
                academic_plan,
                date,
                week_num,
            } = req.body
            const newGroup = await scheduleService.create(
                group,
                auditory,
                tutor,
                time_start,
                time_end,
                weekday,
                discipline,
                is_temp,
                semestr,
                academic_plan,
                date,
                week_num
            )
            res.json(newGroup.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        const scheduleAll = await scheduleService.getScheduleAll()
        res.json(scheduleAll.rows)
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id
            const schedule = await scheduleService.getScheduleById(id)
            res.json(schedule.rows)
        } catch (e) {
            next(e)
        }
    }

    async parseSchedule(req, res, next) {
        try {
            const schedule = await scheduleService.parseSchedule(req.body)
            res.json('парсинг успешен')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ScheduleController()
