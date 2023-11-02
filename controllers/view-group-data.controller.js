const viewGroupDataService = require('../services/view-group-data.service')

class viewGroupDataController {
    async getDataGroupName(req, res, next) {
        try {
            const name = req.params.name
            const schedule = await viewGroupDataService.getDataGroup(name)
            res.json(schedule.rows)
        } catch (e) {
            next(e)
        }
    }
    async getDataGroupAll(req, res, next) {
        try {
            const schedule = await viewGroupDataService.getDataGroupAll()
            res.json(schedule.rows)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new viewGroupDataController()
