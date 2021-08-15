module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const documentCatalog = joi.object({
    name: joi.string().required(),
    author: joi.string().required(),
    note: joi.string().allow(''),
    path: joi.string().required(),
    projectId: joi.string().required(),
    phaseId: joi.string().allow(''),
    deleted: joi.number().valid(0, 1).default(0)
  })
  const docCataSchema = joi2MongoSchema(documentCatalog, {
    projectId: {
      type: ObjectId,
      ref: 'Project'
    },
    phaseId: {
      type: ObjectId,
      ref: 'Phase'
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    },
    createdBy: {
      type: ObjectId
    }
  })
  docCataSchema.statics.validateObj = (obj, config = {}) => {
    return documentCatalog.validate(obj, config)
  }
  docCataSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return documentCatalog.validate(obj, config)
  }
  const docCataModel = mongoose.model('DocumentCatalog', docCataSchema)
  docCataModel.syncIndexes()
  return docCataModel
}
