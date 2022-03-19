const router = require('express').Router()
const controller = require('../controllers/PledgeController')
// const middleware = require('../middleware')

router.get('/all', controller.GetAllPledges)

export = router