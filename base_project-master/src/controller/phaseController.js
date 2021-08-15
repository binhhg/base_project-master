module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Phase
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { phaseRepo } = container.resolve('repo')
  const addPhase = async (req, res) => {
    try {
      const body = req.body
      const {
        error,
        value
      } = await schemaValidator(body, 'Phase')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await phaseRepo.addPhase(value)
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deletePhase = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await phaseRepo.deletePhase(id)
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const deletedPhase = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const check = await phaseRepo.getPhaseById(id)
        if (check.deleted === 0) {
          await phaseRepo.deletedPhase(id)
          return res.status(httpCode.SUCCESS).send({ ok: true })
        }
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getPhaseById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const data = await phaseRepo.getPhaseById(id)
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
  const updatePhase = async (req, res) => {
    try {
      const { id } = req.params
      const phase = req.body
      if (id) {
        const check = await phaseRepo.getPhaseById(id)
        if (check.deleted === 1) {
          return res.status(httpCode.BAD_REQUEST).end()
        }
      }
      const {
        error,
        value
      } = await schemaValidator(phase, 'Phase')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && phase) {
        const sp = await phaseRepo.updatePhase(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getPhase = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort
      } = req.query
      page = +page || 1
      perPage = +perPage || 10
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const pipe = {
        deleted: 0
      }
      const data = await phaseRepo.getPhase(pipe, perPage, skip, sort)
      const total = await phaseRepo.getCount(pipe)
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
    addPhase,
    getPhase,
    getPhaseById,
    updatePhase,
    deletePhase,
    deletedPhase
  }
}
