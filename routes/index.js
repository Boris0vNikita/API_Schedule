const Router = require('express')
const router = new Router()

router.use('/discipline', require('./discipline.route'))
router.use('/plane', require('./academic-plane.route'))
router.use('/auditory', require('./auditory.route'))
router.use('/group', require('./group.route'))
router.use('/people', require('./people.route'))
router.use('/schedule', require('./schedule.route'))
router.use('/view', require('./view-group-data.route'))

router.use('/', function (_, res) {
    res.render('main.hbs', {
        message: 'Welcome to API',
    })
})

module.exports = router
