const { Project, Pledge } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const GetAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [Pledge]
    })
    res.send(projects)
  } catch (error) {
    throw error
  }
}

const CreateProject = async (req, res) => {
  try {
    const result = await Project.create({
      name: 'Untitled Project',
      startDate: '2025-01-01',
      endDate: '2025-01-30',
      goal: 0.0,
      campaign: '',
      description: '',
      tags: '',
      userId: req.body.user_id
    })
    res.send(result)
  } catch (error) {
    throw error
  }
}

const FindProjectsByUserId = async (req, res) => {
  const projects = await Project.findAll({
    where: { userId: req.params.user_id },
    include: [Pledge]
  })
  res.send(projects)
}

const FindProjectById = async (req, res) => {
  const project = await Project.findOne({
    where: { id: req.params.project_id },
    include: [Pledge]
  })
  res.send(project)
}

const UpdateProject = async (req, res) => {
  const project = await Project.findOne({
    where: { id: req.params.project_id }
  })
  await project.update({ ...req.body })
  res.send({ status: 'success', msg: 'Project Updated' })
}

export = {
  GetAllProjects,
  CreateProject,
  FindProjectById,
  FindProjectsByUserId,
  UpdateProject
}