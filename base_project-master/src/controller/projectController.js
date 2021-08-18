module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Project
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { projectRepo } = container.resolve('repo')
  const addProject = async (req, res) => {
    try {
      const body = req.body
      body.manager = req.user._id
      const {
        error,
        value
      } = await schemaValidator(body, 'Project')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await projectRepo.addProject(value)
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteProject = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await projectRepo.deleteProject(id)
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const deletedProject = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const check = await projectRepo.getProjectById(id)
        if (check.deleted === 0) {
          await projectRepo.deletedProject(id)
          res.status(httpCode.SUCCESS).send({ ok: true })
        }
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getProjectById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const data = await projectRepo.getProjectById(id)
        if (data.deleted === 0) {
          return res.status(httpCode.SUCCESS).send(data)
        }
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const updateProject = async (req, res) => {
    try {
      const { id } = req.params
      const project = req.body
      if (id) {
        const check = await projectRepo.getProjectById(id)
        if (check.deleted === 1) {
          return res.status(httpCode.BAD_REQUEST).end()
        }
      }
      const {
        error,
        value
      } = await schemaValidator(project, 'Project')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && project) {
        const sp = await projectRepo.updateProject(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getProject = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort,
      } = req.query
      page = +page || 1
      perPage = +perPage || 10
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const pipe = {
        deleted: 0
      }
      const data = await projectRepo.getProject(pipe, perPage, skip, sort)
      const total = await projectRepo.getCount(pipe)
      res.status(httpCode.SUCCESS).send({
        perPage,
        skip,
        sort,
        data,
        total,
        page
      })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  return {
    addProject,
    getProject,
    getProjectById,
    updateProject,
    deleteProject,
    deletedProject
  }
}
