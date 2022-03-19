const { Pledge } = require('../models')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

const GetAllPledges = async (req, res) => {
  try {
    const pledges = await Pledge.findAll()
    res.send(pledges)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllPledges
}