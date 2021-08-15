module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const materialJoi = joi.object({
    productName: joi.string().required(),
    unit: joi.string().required(),
    price: joi.number().required(),
    supplierId: joi.string().required(),
    projectId: joi.string().required(),
    phaseId: joi.string().allow(''),
    deleted: joi.number().valid(0, 1).default(0)
  })
  const materialSchema = joi2MongoSchema(materialJoi, {
    supplierId: {
      type: ObjectId,
      ref: 'Supplier'
    },
    projectId: {
      type: ObjectId,
      ref: 'Project'
    },
    phaseId: {
      type: ObjectId,
      ref: 'Phase'
    }
  }, {
  })
  materialSchema.statics.validateObj = (obj, config = {}) => {
    return materialJoi.validate(obj, config)
  }
  materialSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return materialJoi.validate(obj, config)
  }
  const materialModel = mongoose.model('Material', materialSchema)
  materialModel.syncIndexes()
  return materialModel
}
