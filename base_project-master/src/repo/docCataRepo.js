module.exports = (container) => {
  const { schemas } = container.resolve('models')
  const { DocCata } = schemas
  const addDocCata = (cata) => {
    const ca = new DocCata(cata)
    return ca.save()
  }
  const getDocCataById = (id) => {
    return DocCata.findById(id)
  }
  const deleteDocCata = (id) => {
    return DocCata.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const deletedDocCata = (id) => {
    return DocCata.findByIdAndUpdate(id, { deleted: 1 }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const updateDocCata = (id, n) => {
    return DocCata.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return DocCata.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return DocCata.countDocuments(pipe)
  }
  const getDocCataAgg = (pipe) => {
    return DocCata.aggregate(pipe)
  }
  const getDocCata = (pipe, limit, skip, sort) => {
    return DocCata.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getDocCataNoPaging = (pipe) => {
    return DocCata.find(pipe)
  }
  const removeDocCata = (pipe) => {
    return DocCata.deleteMany(pipe)
  }
  return {
    addDocCata,
    getDocCataById,
    deleteDocCata,
    deletedDocCata,
    updateDocCata,
    checkIdExist,
    getCount,
    getDocCataAgg,
    getDocCata,
    getDocCataNoPaging,
    removeDocCata
  }
}
