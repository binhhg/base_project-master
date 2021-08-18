module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Material
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { materialRepo } = container.resolve('repo')
  const addMaterial = async (req, res) => {
    try {
      const thoauoc = req.body
      const {
        error,
        value
      } = await schemaValidator(thoauoc, 'Material')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await materialRepo.addMaterial(value)
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteMaterial = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await materialRepo.deleteMaterial(id)
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const deletedMaterial = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const check = await materialRepo.getMaterialById(id)
        if (check.deleted === 0) {
          await materialRepo.deletedMaterial(id)
          return res.status(httpCode.SUCCESS).send({ ok: true })
        }
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getMaterialById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const data = await materialRepo.getMaterialById(id)
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
  const updateMaterial = async (req, res) => {
    try {
      const { id } = req.params
      const material = req.body
      if (id) {
        const check = await materialRepo.getMaterialById(id)
        if (check.deleted === 1) {
          return res.status(httpCode.BAD_REQUEST).end()
        }
      }
      const {
        error,
        value
      } = await schemaValidator(material, 'Material')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && material) {
        const sp = await materialRepo.updateMaterial(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getMaterial = async (req, res) => {
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
      const data = await materialRepo.getMaterial(pipe, perPage, skip, sort)
      const total = await materialRepo.getCount(pipe)
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
    addMaterial,
    getMaterial,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
    deletedMaterial
  }
}
