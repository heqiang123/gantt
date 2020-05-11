const getters = {
  sidebar: state => state.app.sidebar,
  opened: state => state.app.sidebar.opened,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes,
  productionLength: state => state.fitting.productionBotData.length,
  workData: state => state.fitting.workData
}
export default getters
