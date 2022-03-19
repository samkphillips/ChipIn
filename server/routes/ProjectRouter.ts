const router = require('express').Router()
const controller = require('../controllers/ProjectController')
// const middleware = require('../middleware')

router.get('/all', controller.GetAllProjects)

export = router