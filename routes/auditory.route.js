const Router = require('express')
const router = new Router()

router.post('/', require('../controllers/auditory.controller').create)
router.get('/', require('../controllers/auditory.controller').getAll)
router.get('/:id', require('../controllers/auditory.controller').getById)

module.exports = router
