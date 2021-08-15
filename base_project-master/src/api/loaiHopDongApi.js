module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { loaiHopDongController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/loaiHopDong`, loaiHopDongController.getLoaiHopDong)
  app.get(`${basePath}/loaiHopDong/:id`, loaiHopDongController.getLoaiHopDongById)
  app.put(`${basePath}/loaiHopDong/:id`, loaiHopDongController.updateLoaiHopDong)
  app.delete(`${basePath}/loaiHopDong/:id`, loaiHopDongController.deleteLoaiHopDong)
  app.post(`${basePath}/loaiHopDong`, loaiHopDongController.addLoaiHopDong)
}
