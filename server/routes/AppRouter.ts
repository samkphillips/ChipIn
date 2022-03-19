const router = require('express').Router()
const UserRouter = require('./UserRouter')
const ProjectRouter = require('./ProjectRouter')
const PledgeRouter = require('./PledgeRouter')

//just to check, remove before shipping
router.get('/', (req: any, res: any) => res.json({ message: 'Server Works' }))

router.use('/user', UserRouter)
router.use('/project', ProjectRouter)
router.use('/pledge', PledgeRouter)

// module.exports = router
export = router