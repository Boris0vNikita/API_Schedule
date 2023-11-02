const Router = require('express')
const router = new Router()

router.post('/', require('../controllers/people.controller').create)
router.get('/', require('../controllers/people.controller').getAll)
router.get('/:id', require('../controllers/people.controller').getById)

module.exports = router
