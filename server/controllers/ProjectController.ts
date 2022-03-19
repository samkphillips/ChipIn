const { Project } = require('../models')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

const GetAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll()
    res.send(projects)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllProjects
}