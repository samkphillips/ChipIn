const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.post('/login', controller.LogUserIn)
router.post('/register', controller.CreateNewUser)
router.put(
  '/changepassword',
  middleware.stripToken,
  middleware.verifyToken,
  controller.ChangePassword
)
router.delete(
  '/destroyuser',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUserAccount
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

// module.exports = router
export = router
