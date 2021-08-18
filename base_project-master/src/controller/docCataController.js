module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const { schemas: { DocCata }, schemaValidator } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { docCataRepo } = container.resolve('repo')
  const addDocCata = async (req, res) => {
    try {
      const body = req.body
      body.createdBy = req.user._id
      const { error, value } = await schemaValidator(body, 'DocCata')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const data = await docCataRepo.addDocCata(value)
      res.status(httpCode.CREATED).send(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteDocCata = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await docCataRepo.deleteDocCata(id)
        return res.status(httpCode.SUCCESS).send({ ok: true })
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const deletedDocCata = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const check = await docCataRepo.getDocCataById(id)
        if (check.deleted === 0) {
          await docCataRepo.deletedDocCata(id)
          return res.status(httpCode.SUCCESS).send({ ok: true })
        }
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getDocCataById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const data = await docCataRepo.getDocCataById(id)
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
  const updateDocCata = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      if (id) {
        const check = await docCataRepo.getDocCataById(id)
        if (check.deleted === 1) {
          return res.status(httpCode.BAD_REQUEST).end()
        }
      }
      const { error, value } = await schemaValidator(body, 'DocCata')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (body) {
        const data = await docCataRepo.updateDocCata(id, value)
        res.status(httpCode.SUCCESS).send(data)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getDocCata = async (req, res) => {
    try {
      let { page, perPage, sort } = req.query
      page = +page || 1
      perPage = +perPage || 1
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const pipe = {
        deleted: 0
      }
      const data = await docCataRepo.getDocCata(pipe, perPage, skip, sort)
      const total = await docCataRepo.getCount(pipe)
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
    addDocCata,
    getDocCataById,
    getDocCata,
    updateDocCata,
    deleteDocCata,
    deletedDocCata
  }
}
