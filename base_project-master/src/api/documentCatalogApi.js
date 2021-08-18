module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { docCataController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/doccata`, docCataController.getDocCata)
  app.get(`${basePath}/doccata/:id`, docCataController.getDocCataById)
  app.put(`${basePath}/doccata/:id`, docCataController.updateDocCata)
  app.delete(`${basePath}/doccata/:id`, docCataController.deletedDocCata)
  app.post(`${basePath}/doccata`, docCataController.addDocCata)
}
