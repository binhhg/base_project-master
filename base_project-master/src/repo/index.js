const repo = (container) => {
  const loaiHopDongRepo = require('./loaiHopDongRepo')(container)
  const projectRepo = require('./projectRepo')(container)
  const phaseRepo = require('./phaseRepo')(container)
  const docCataRepo = require('./docCataRepo')(container)
  const supplierRepo = require('./supplierRepo')(container)
  const materialRepo = require('./materialRepo')(container)
  return { loaiHopDongRepo, projectRepo, phaseRepo, docCataRepo, supplierRepo, materialRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}

module.exports = { connect }
