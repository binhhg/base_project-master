module.exports = container => {
  const { schemas } = container.resolve('models')
  const { LoaiHopDong } = schemas
  const addLoaiHopDong = (cate) => {
    const c = new LoaiHopDong(cate)
    return c.save()
  }
  const getLoaiHopDongById = (id) => {
    return LoaiHopDong.findById(id)
  }
  const deleteLoaiHopDong = (id) => {
    return LoaiHopDong.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updateLoaiHopDong = (id, n) => {
    return LoaiHopDong.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return LoaiHopDong.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return LoaiHopDong.countDocuments(pipe)
  }
  const getLoaiHopDongAgg = (pipe) => {
    return LoaiHopDong.aggregate(pipe)
  }
  const getLoaiHopDong = (pipe, limit, skip, sort) => {
    return LoaiHopDong.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getLoaiHopDongNoPaging = (pipe) => {
    return LoaiHopDong.find(pipe)
  }
  const removeLoaiHopDong = (pipe) => {
    return LoaiHopDong.deleteMany(pipe)
  }
  return {
    getLoaiHopDongNoPaging,
    removeLoaiHopDong,
    addLoaiHopDong,
    getLoaiHopDongAgg,
    getLoaiHopDongById,
    deleteLoaiHopDong,
    updateLoaiHopDong,
    checkIdExist,
    getCount,
    getLoaiHopDong
  }
}
