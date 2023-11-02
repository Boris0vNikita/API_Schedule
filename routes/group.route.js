const Router = require('express')
const router = new Router()

router.post('/', require('../controllers/group.controller').create)
router.get('/', require('../controllers/group.controller').getAll)
router.get('/:id', require('../controllers/group.controller').getById)

module.exports = router
