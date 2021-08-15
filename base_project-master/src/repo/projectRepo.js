module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Project } = schemas
  const addProject = (cate) => {
    const c = new Project(cate)
    return c.save()
  }
  const getProjectById = (id) => {
    return Project.findById(id)
  }
  const deleteProject = (id) => {
    return Project.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const deletedProject = (id) => {
    return Project.findByIdAndUpdate(id, { deleted: 1 }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const updateProject = (id, n) => {
    return Project.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Project.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Project.countDocuments(pipe)
  }
  const getProjectAgg = (pipe) => {
    return Project.aggregate(pipe)
  }
  const getProject = (pipe, limit, skip, sort) => {
    return Project.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getProjectNoPaging = (pipe) => {
    return Project.find(pipe)
  }
  const removeProject = (pipe) => {
    return Project.deleteMany(pipe)
  }
  return {
    getProjectNoPaging,
    removeProject,
    addProject,
    getProjectAgg,
    getProjectById,
    deleteProject,
    deletedProject,
    updateProject,
    checkIdExist,
    getCount,
    getProject
  }
}
