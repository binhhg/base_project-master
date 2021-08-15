module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { documentCatalogController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/documentCatalog`, documentCatalogController.getDocCata)
  app.get(`${basePath}/documentCatalog/:id`, documentCatalogController.getDocCataById)
  app.put(`${basePath}/documentCatalog/:id`, documentCatalogController.updateDocCata)
  app.delete(`${basePath}/documentCatalog/:id`, documentCatalogController.deletedDocCata)
  app.post(`${basePath}/documentCatalog`, documentCatalogController.addDocCata)
}
