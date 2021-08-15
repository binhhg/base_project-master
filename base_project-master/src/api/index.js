module.exports = (app, container) => {
  require('./loaiHopDongApi')(app, container)
  require('./projectApi')(app, container)
  require('./phaseApi')(app, container)
  require('./documentCatalogApi')(app, container)
  require('./supplierApi')(app, container)
  require('./materialApi')(app, container)
}
