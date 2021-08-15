const joi = require('@hapi/joi')
const mongoose = require('mongoose')
const typeMapping = {
  string: String,
  array: Array,
  number: Number,
  boolean: Boolean,
  object: Object
}

const joi2MongoSchema = (joiSchema, special = {}, schemaOnly = {}, joiOnly = {}) => {
  /*
  * @param {joiSchema} schema joi
  * @param {special} cấu hình đặc biệt của 1 field của schema ví dụ index, unique,....
  * @param {schemaOnly} 1 số field mà chỉ có ở db mà k có ở schema
  *
  *
  * */
  const { $_terms: { keys } } = joiSchema
  let schemaObj = {}
  keys.forEach(i => {
    const { key, schema: { type } } = i
    if (joiOnly[key]) {
      return
    }
    if (type === 'array' && special[key]) {
      schemaObj[key] = special[key]
    } else {
      schemaObj[key] = {
        type: typeMapping[type],
        ...(special[key] || {})
      }
    }
  })
  schemaObj = { ...schemaObj, ...schemaOnly }
  return mongoose.Schema(schemaObj)
}
// kphai cai nay dau
module.exports = container => {
  container.registerValue('ObjectId', mongoose.Types.ObjectId)
  const LoaiHopDong = require('./loaiHopDong.model')(joi, mongoose, { joi2MongoSchema })
  const Project = require('./project.model')(joi, mongoose, { joi2MongoSchema })
  const Phase = require('./phase.model')(joi, mongoose, { joi2MongoSchema })
  const DocCata = require('./docCata.model')(joi, mongoose, { joi2MongoSchema })
  const Supplier = require('./supplier.model')(joi, mongoose, { joi2MongoSchema })
  const Material = require('./material.model')(joi, mongoose, { joi2MongoSchema })
  const schemas = { LoaiHopDong, Project, Phase, DocCata, Supplier, Material }
  const schemaValidator = (obj, type) => {
    const schema = schemas[type]
    if (schema) {
      return schema.validateObj(obj, {
        allowUnknown: true,
        stripUnknown: true
      })
    }
    return { error: `${type} not found.` }
  }
  return {
    schemas,
    schemaValidator
  }
}
