const Router = require('express')
const router = new Router()

router.post('/', require('../controllers/discipline.controller').create)
router.get('/', require('../controllers/discipline.controller').getAll)
router.get('/:id', require('../controllers/discipline.controller').getById)

module.exports = router
