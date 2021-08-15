module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { projectController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/project`, projectController.getProject)
  app.get(`${basePath}/project/:id`, projectController.getProjectById)
  app.put(`${basePath}/project/:id`, projectController.updateProject)
  app.delete(`${basePath}/project/:id`, projectController.deletedProject)
  app.post(`${basePath}/project`, projectController.addProject)
}
