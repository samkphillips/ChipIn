const router = require('express').Router()
const controller = require('../controllers/ProjectController')
// const middleware = require('../middleware')

router.get('/all', controller.GetAllProjects)
// router.post('/new', controller.CreateProject)
router.get('/search/id/:project_id', controller.FindProjectById)
router.get('/search/user/:user_id', controller.FindProjectsByUserId)

export = router