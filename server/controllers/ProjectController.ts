const { Project } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const GetAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll()
    res.send(projects)
  } catch (error) {
    throw error
  }
}

const FindProjectsByUserId = async (req, res) => {
  const projects = await Project.findAll({
    where: { userId: req.params.user_id }
  })
  res.send(projects)
}

const FindProjectById = async (req, res) => {
  const project = await Project.findByPk(req.params.project_id)
  res.send(project)
}

module.exports = {
  GetAllProjects,
  FindProjectById,
  FindProjectsByUserId
}