module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { materialController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/material`, materialController.getMaterial)
  app.get(`${basePath}/material/:id`, materialController.getMaterialById)
  app.put(`${basePath}/material/:id`, materialController.updateMaterial)
  app.delete(`${basePath}/material/:id`, materialController.deletedMaterial)
  app.post(`${basePath}/material`, materialController.addMaterial)
}
