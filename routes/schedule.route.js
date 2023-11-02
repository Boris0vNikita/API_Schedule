const Router = require('express')
const router = new Router()

router.post('/', require('../controllers/schedule.controller').create)
router.get('/', require('../controllers/schedule.controller').getAll)
router.get('/:id', require('../controllers/schedule.controller').getById)
router.post(
    '/parse',
    require('../controllers/schedule.controller').parseSchedule
)

module.exports = router
