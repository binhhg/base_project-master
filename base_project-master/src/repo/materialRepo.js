module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Material } = schemas
  const addMaterial = (cate) => {
    const c = new Material(cate)
    return c.save()
  }
  const getMaterialById = (id) => {
    return Material.findById(id)
  }
  const deleteMaterial = (id) => {
    return Material.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const deletedMaterial = (id) => {
    return Material.findByIdAndUpdate(id, { deleted: 1 }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const updateMaterial = (id, n) => {
    return Material.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Material.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Material.countDocuments(pipe)
  }
  const getMaterialAgg = (pipe) => {
    return Material.aggregate(pipe)
  }
  const getMaterial = (pipe, limit, skip, sort) => {
    return Material.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getMaterialNoPaging = (pipe) => {
    return Material.find(pipe)
  }
  const removeMaterial = (pipe) => {
    return Material.deleteMany(pipe)
  }
  return {
    getMaterialNoPaging,
    removeMaterial,
    addMaterial,
    getMaterialAgg,
    getMaterialById,
    deleteMaterial,
    deletedMaterial,
    updateMaterial,
    checkIdExist,
    getCount,
    getMaterial
  }
}
