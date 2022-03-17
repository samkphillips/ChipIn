const router = require('express').Router()

router.get('/', (req: any, res: any) => res.json({ message: 'Server Works' }))

module.exports = router