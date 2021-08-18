module.exports = (container) => {
  const loaiHopDongController = require('./loaiHopDongController')(container)
  const projectController = require('./projectController')(container)
  const phaseController = require('./phaseController')(container)
  const docCataController = require('./docCataController')(container)
  const supplierController = require('./supplierController')(container)
  const materialController = require('./materialController')(container)
  return { loaiHopDongController, projectController, phaseController, docCataController, supplierController, materialController }
}
