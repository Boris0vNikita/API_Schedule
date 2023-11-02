const db = require('../db')

const ApiError = require('../exceptions/api.error')
const cutWord = require('../utils/cutWord')
//const academicPlanService = require('../services/academic-plan.service')
const disciplineService = require('../services/discipline.service')
const auditoryService = require('../services/auditory.service')
const groupService = require('../services/group.service')
const fioPeopleService = require('../services/view-fio-people.service')

class ScheduleService {
    async create(
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
    ) {
        console.log(
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
        // const maxId = await db.query(
        //     `SELECT MAX(s.schedule_id) FROM ${process.env.POSTGRES_SCHEMA}.schedule s`
        // )
        const newSchedule = await db.query(
            `INSERT INTO ${process.env.POSTGRES_SCHEMA}.schedule ("group", auditory, tutor, time_start, time_end, weekday, discipline, is_temp, semestr, academic_plan, "date", week_num) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ,$12) RETURNING *`,
            [
                //maxId.rows[0].max + 1,
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
            ]
        )
        return newSchedule
    }

    async getScheduleAll() {
        const scheduleAll = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.schedule;`
        )
        return scheduleAll
    }

    async getScheduleById(schedule_id) {
        // if (schedule_id == 2) {
        //     throw ApiError.BadRequest('id такой есть')
        // }
        const schedule = await db.query(
            `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.schedule where schedule_id = $1`,
            [schedule_id]
        )
        return schedule
    }

    async parseSchedule(data) {
        for (const property in data) {
            const group_name = property
            let groupId = ''
            let title_day = ''
            let time_start = ''
            let time_end = ''
            let idDiscipline = 1
            let idAuditory = 1

            let idTutor = ''
            let is_temp = 0
            if (!group_name) {
            } else {
                //Сравнение введенной группы с наименованием из базы
                const groupName = await groupService.getGroupByName(group_name)
                if (!groupName.rows[0]) {
                    //Создание группы если таковой нет
                    const newGroup = await groupService.create(group_name, 1, 1)
                    //Взяли ID созданного объекта
                    groupId = newGroup.rows[0].group_id
                }
                //Если есть совпадение
                else {
                    groupId = groupName.rows[0].group_id
                }
            }

            for (const weekday of data[property].days) {
                for (const day in weekday) {
                    title_day = day
                    // console.log(title_day)
                    for (const prop of weekday[day]) {
                        time_start = prop['время_начала']
                        time_end = prop['время_окончания']
                        const lessons = prop['занятие_неделя']
                        is_temp = 0
                        if (!lessons) {
                            is_temp = 0
                        } else {
                            is_temp = 1
                            for (const les of lessons) {
                                console.log(les)
                                const discipline_name = les['дисциплина']
                                idDiscipline = await this.parseDiscilpline(
                                    discipline_name
                                )

                                const auditory = les['аудитория']
                                idAuditory = await this.parseAuditory(auditory)

                                const tutor = les['преподаватель']

                                //ПОИСК преподавателей, если совпал с базой данных берет его ID
                                const cutFio = cutWord(tutor)
                                const fioData =
                                    await fioPeopleService.getFioPeople(
                                        cutFio.trim()
                                    )
                                if (fioData && fioData.rows[0]) {
                                    if (cutFio == fioData.rows[0].fio) {
                                        idTutor = fioData.rows[0].people_id
                                        console.log(
                                            `id совпадения преподавателя ${fioData.rows[0].people_id}`
                                        )
                                    }
                                }
                            }
                            const date = '2023-10-11'
                            await this.create(
                                groupId,
                                (idAuditory = 1), //undefined
                                (idTutor = 1), // не успевает сравнить id тк валиться раньше
                                time_start,
                                time_end,
                                title_day,
                                (idDiscipline = 1), //undefined
                                is_temp,
                                1,
                                1,
                                date,
                                1
                            )
                        }
                    }
                    //insert
                }
            }
        }
    }

    async parseDiscilpline(discipline_name) {
        //ДИСЦИПЛИНА
        if (!discipline_name) {
            //тут undefined
        } else {
            let disciplineId = ''
            //Сравнение введенной дисциплины с наименованием из базы
            const discipline = await disciplineService.getDisciplineByName(
                discipline_name
            )
            if (!discipline.rows[0]) {
                //Создание группы если таковой нет
                const newDiscipline = await disciplineService.create(
                    discipline_name
                )
                //Взяли ID созданного объекта
                disciplineId = newDiscipline.rows[0].discipline_id
            }
            //Если есть совпадение
            else {
                disciplineId = discipline.rows[0].discipline_id
            }
            return disciplineId
        }
    }

    async parseAuditory(name_auditory) {
        //АУДИТОРИЯ
        if (!name_auditory) {
            //тут undefined
        } else {
            let auditoryId = ''
            //Сравнение введенной дисциплины с наименованием из базы
            const auditory = await auditoryService.getAuditoryByName(
                name_auditory
            )
            if (!auditory.rows[0]) {
                //Создание группы если таковой нет
                const newAuditory = await auditoryService.create(
                    name_auditory,
                    10,
                    10,
                    1,
                    1
                )
                //Взяли ID созданного объекта
                auditoryId = newAuditory.rows[0].auditory_id
            }
            //Если есть совпадение
            else {
                auditoryId = auditory.rows[0].auditory_id
            }
            return auditoryId
        }
    }

    // async parseTutor(tutor) {
    //     //// //ПРЕПОДАВАТЕЛИ
    //     if (!tutor) {
    //         //тут undefined
    //     } else {
    //         let tutorId = ''
    //         console.log(tutor)
    //         //Сравнение введенной дисциплины с наименованием из базы
    //         const discipline = await disciplineService.getDisciplineByName(
    //             discipline_name
    //         )
    //         if (!discipline.rows[0]) {
    //             //Создание группы если таковой нет
    //             const newDiscipline = await disciplineService.create(
    //                 discipline_name
    //             )
    //             //Взяли ID созданного объекта
    //             disciplineId = newDiscipline.rows[0].discipline_id
    //         }
    //         //Если есть совпадение
    //         else {
    //             disciplineId = discipline.rows[0].discipline_id
    //         }
    //     }
    // }
}

module.exports = new ScheduleService()
