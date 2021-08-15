module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      LoaiHopDong
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { loaiHopDongRepo } = container.resolve('repo')
  const addLoaiHopDong = async (req, res) => {
    try {
      const thoauoc = req.body
      const {
        error,
        value
      } = await schemaValidator(thoauoc, 'LoaiHopDong')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      const sp = await loaiHopDongRepo.addLoaiHopDong(value)
      res.status(httpCode.CREATED).send(sp)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  const deleteLoaiHopDong = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        await loaiHopDongRepo.deleteLoaiHopDong(id)
        res.status(httpCode.SUCCESS).send({ ok: true })
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getLoaiHopDongById = async (req, res) => {
    try {
      const { id } = req.params
      if (id) {
        const loaiHopDong = await loaiHopDongRepo.getLoaiHopDongById(id)
        res.status(httpCode.SUCCESS).send(loaiHopDong)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const updateLoaiHopDong = async (req, res) => {
    try {
      const { id } = req.params
      const loaiHopDong = req.body
      const {
        error,
        value
      } = await schemaValidator(loaiHopDong, 'LoaiHopDong')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).send({ msg: error.message })
      }
      if (id && loaiHopDong) {
        const sp = await loaiHopDongRepo.updateLoaiHopDong(id, value)
        res.status(httpCode.SUCCESS).send(sp)
      } else {
        res.status(httpCode.BAD_REQUEST).end()
      }
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).send({ ok: false })
    }
  }
  const getLoaiHopDong = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort,
        //ids
      } = req.query
      page = +page || 1
      perPage = +perPage || 10
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      // const search = { ...req.query }
      // if (ids) {
      //   if (ids.constructor === Array) {
      //     search.id = { $in: ids }
      //   } else if (ids.constructor === String) {
      //     search.id = { $in: ids.split(',') }
      //   }
      // }
      // delete search.ids
      // delete search.page
      // delete search.perPage
      // delete search.sort
      const pipe = {}

      // Object.keys(search).forEach(i => {
      //   const vl = search[i]
      //   const pathType = (LoaiHopDong.schema.path(i) || {}).instance || ''
      //   if (pathType.toLowerCase() === 'objectid') {
      //     pipe[i] = ObjectId(vl)
      //   } else if (pathType === 'Number') {
      //     pipe[i] = +vl
      //   } else if (pathType === 'String' && vl.constructor === String) {
      //     pipe[i] = new RegExp(vl, 'gi')
      //   } else {
      //     pipe[i] = vl
      //   }
      // })
      const data = await loaiHopDongRepo.getLoaiHopDong(pipe, perPage, skip, sort)
      const total = await loaiHopDongRepo.getCount(pipe)
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
    addLoaiHopDong,
    getLoaiHopDong,
    getLoaiHopDongById,
    updateLoaiHopDong,
    deleteLoaiHopDong
  }
}
