module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const phaseJoi = joi.object({
    projectId: joi.string().required(),
    phaseId: joi.string().allow(''),
    startDate: joi.number().required(),
    phaseName: joi.string().required(),
    content: joi.string().required(),
    manager: joi.string().required(),
    endDate: joi.number().allow(''),
    deleted: joi.number().valid(0, 1).default(0)
  })
  const phaseSchema = joi2MongoSchema(phaseJoi, {
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
  phaseSchema.statics.validateObj = (obj, config = {}) => {
    return phaseJoi.validate(obj, config)
  }
  phaseSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return phaseJoi.validate(obj, config)
  }
  const phaseModel = mongoose.model('Phase', phaseSchema)
  phaseModel.syncIndexes()
  return phaseModel
}
