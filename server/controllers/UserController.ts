const { User } = require('../models')
const middleware = require('../middleware')

const LogUserIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const CreateNewUser = async (req, res) => {
  try {
    const { email, username, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({ email, username, passwordDigest })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const ChangePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        req.body.oldPassword
      ))
    ) {
      const { newPassword } = req.body
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      res.send({ status: 'success', msg: 'Password Updated' })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const DeleteUserAccount = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      await User.destroy({ where: { email: req.body.email } })
      return res.send({ msg: `User Deleted with email ${req.body.email}` })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  CreateNewUser,
  LogUserIn,
  ChangePassword,
  DeleteUserAccount,
  CheckSession
}
