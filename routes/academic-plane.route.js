const Router = require('express')
const router = new Router()

router.post('/', require('../controllers/academic-plan.controller').create)
router.get('/', require('../controllers/academic-plan.controller').getAll)
router.get('/:id', require('../controllers/academic-plan.controller').getById)

module.exports = router
