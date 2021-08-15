module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const loaiHopDongJoi = joi.object({
    ma: joi.string().pattern(/^[a-zA-Z0-9]{4,20}$/).required(),
    tenLoai: joi.string().required(),
    tenMenu: joi.string().required(),
    rank: joi.string().required(),
    ghiChu: joi.string().allow('')
  })
  const loaiHopDongSchema = joi2MongoSchema(loaiHopDongJoi, {
    ma: {
      unique: true,
      uppercase: true
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  loaiHopDongSchema.statics.validateObj = (obj, config = {}) => {
    return loaiHopDongJoi.validate(obj, config)
  }
  loaiHopDongSchema.statics.validateTaiLieu = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return loaiHopDongJoi.validate(obj, config)
  }
  const loaiHopDongModel = mongoose.model('LoaiHopDong', loaiHopDongSchema)
  loaiHopDongModel.syncIndexes()
  return loaiHopDongModel
}
