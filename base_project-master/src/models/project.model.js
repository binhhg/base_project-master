module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const { ObjectId } = mongoose.Types
  const projectJoi = joi.object({
    name: joi.string().required(),
    manager: joi.string().required(),
    status: joi.number().valid(0, 1).default(0),
    deleted: joi.number().valid(0, 1).default(0)
  })
  const projectSchema = joi2MongoSchema(projectJoi, {
    manager: {
      type: ObjectId
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  projectSchema.statics.validateObj = (obj, config = {}) => {
    return projectJoi.validate(obj, config)
  }
  projectSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return projectJoi.validate(obj, config)
  }
  const projectModel = mongoose.model('Project', projectSchema)
  projectModel.syncIndexes()
  return projectModel
}
