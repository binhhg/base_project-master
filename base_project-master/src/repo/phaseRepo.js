module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Phase } = schemas
  const addPhase = (cate) => {
    const c = new Phase(cate)
    return c.save()
  }
  const getPhaseById = (id) => {
    return Phase.findById(id)
  }
  const deletePhase = (id) => {
    return Phase.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const deletedPhase = (id) => {
    return Phase.findByIdAndUpdate(id, { deleted: 1 }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const updatePhase = (id, n) => {
    return Phase.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Phase.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Phase.countDocuments(pipe)
  }
  const getPhaseAgg = (pipe) => {
    return Phase.aggregate(pipe)
  }
  const getPhase = (pipe, limit, skip, sort) => {
    return Phase.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getPhaseNoPaging = (pipe) => {
    return Phase.find(pipe)
  }
  const removePhase = (pipe) => {
    return Phase.deleteMany(pipe)
  }
  return {
    getPhaseNoPaging,
    removePhase,
    addPhase,
    getPhaseAgg,
    getPhaseById,
    deletePhase,
    deletedPhase,
    updatePhase,
    checkIdExist,
    getCount,
    getPhase
  }
}
