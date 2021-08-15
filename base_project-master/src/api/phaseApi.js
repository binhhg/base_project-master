module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { phaseController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/phase`, phaseController.getPhase)
  app.get(`${basePath}/phase/:id`, phaseController.getPhaseById)
  app.put(`${basePath}/phase/:id`, phaseController.updatePhase)
  app.delete(`${basePath}/phase/:id`, phaseController.deletedPhase)
  app.post(`${basePath}/phase`, phaseController.addPhase)
}
