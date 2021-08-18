module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Supplier
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { supplierRepo } = container.resolve('repo')
  const addSupplier = async (req, res) => {
    try {
      const thoauoc = req.body
      const {
        error,
        value
      } = await schemaValidator(thoauoc, 'Supplier')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await supplierRepo.addSupplier(value)
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteSupplier = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await supplierRepo.deleteSupplier(id)
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const deletedSupplier = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const check = await supplierRepo.getSupplierById(id)
        if (check.deleted === 0) {
          await supplierRepo.deletedSupplier(id)
          return res.status(httpCode.SUCCESS).send({ ok: true })
        }
      }
      res.status(httpCode.BAD_REQUEST).end()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }

  const getSupplierById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const data = await supplierRepo.getSupplierById(id)
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
  const updateSupplier = async (req, res) => {
    try {
      const { id } = req.params
      const supplier = req.body
      if (id) {
        const check = await supplierRepo.getSupplierById(id)
        if (check.deleted === 1) {
          return res.status(httpCode.BAD_REQUEST).end()
        }
      }
      const {
        error,
        value
      } = await schemaValidator(supplier, 'Supplier')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && supplier) {
        const sp = await supplierRepo.updateSupplier(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getSupplier = async (req, res) => {
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
      const data = await supplierRepo.getSupplier(pipe, perPage, skip, sort)
      const total = await supplierRepo.getCount(pipe)
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
    addSupplier,
    getSupplier,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    deletedSupplier
  }
}
