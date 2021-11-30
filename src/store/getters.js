const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    buttons: state => state.user.buttons,
    roles: state => state.user.roles,
    routes: state => state.permission.routes,
    addRoutes: state => state.permission.addRoutes
}
export default getters