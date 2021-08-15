module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const supplierJoi = joi.object({
    supplierName: joi.string().required(),
    supplierType: joi.array().items(joi.string()),
    phoneNumber: joi.string().required(),
    address: joi.string().required(),
    projectId: joi.string().required(),
    phaseId: joi.string().allow(''),
    deleted: joi.number().valid(0, 1).default(0)
  })
  const supplierSchema = joi2MongoSchema(supplierJoi, {
    projectId: {
      type: ObjectId,
      ref: 'Project'
    },
    phaseId: ObjectId,
    ref: 'Phase'
  }, {
  })
  supplierSchema.statics.validateObj = (obj, config = {}) => {
    return supplierJoi.validate(obj, config)
  }
  supplierSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return supplierJoi.validate(obj, config)
  }
  const supplierModel = mongoose.model('Supplier', supplierSchema)
  supplierModel.syncIndexes()
  return supplierModel
}
