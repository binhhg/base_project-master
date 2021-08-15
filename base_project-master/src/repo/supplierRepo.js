module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Supplier } = schemas
  const addSupplier = (cate) => {
    const c = new Supplier(cate)
    return c.save()
  }
  const getSupplierById = (id) => {
    return Supplier.findById(id)
  }
  const deleteSupplier = (id) => {
    return Supplier.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const deletedSupplier = (id) => {
    return Supplier.findByIdAndUpdate(id, { deleted: 1 }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const updateSupplier = (id, n) => {
    return Supplier.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Supplier.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Supplier.countDocuments(pipe)
  }
  const getSupplierAgg = (pipe) => {
    return Supplier.aggregate(pipe)
  }
  const getSupplier = (pipe, limit, skip, sort) => {
    return Supplier.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getSupplierNoPaging = (pipe) => {
    return Supplier.find(pipe)
  }
  const removeSupplier = (pipe) => {
    return Supplier.deleteMany(pipe)
  }
  return {
    getSupplierNoPaging,
    removeSupplier,
    addSupplier,
    getSupplierAgg,
    getSupplierById,
    deleteSupplier,
    deletedSupplier,
    updateSupplier,
    checkIdExist,
    getCount,
    getSupplier
  }
}
