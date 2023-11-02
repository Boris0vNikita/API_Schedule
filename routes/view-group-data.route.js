const Router = require('express')
const router = new Router()

router.get(
    '/',
    require('../controllers/view-group-data.controller').getDataGroupAll
)
router.get(
    '/:name',
    require('../controllers/view-group-data.controller').getDataGroupName
)

module.exports = router
