module.exports = (container) => {
  const loaiHopDongController = require('./loaiHopDongController')(container)
  const projectController = require('./projectController')(container)
  const phaseController = require('./phaseController')(container)
  const documentCatalogController = require('./docCataController')(container)
  const supplierController = require('./supplierController')(container)
  const materialController = require('./materialController')(container)
  return { loaiHopDongController, projectController, phaseController, documentCatalogController, supplierController, materialController }
}
