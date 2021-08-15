module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { supplierController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/supplier`, supplierController.getSupplier)
  app.get(`${basePath}/supplier/:id`, supplierController.getSupplierById)
  app.put(`${basePath}/supplier/:id`, supplierController.updateSupplier)
  app.delete(`${basePath}/supplier/:id`, supplierController.deletedSupplier)
  app.post(`${basePath}/supplier`, supplierController.addSupplier)
}
