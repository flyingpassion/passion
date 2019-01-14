/**
 * 用户角色路由
 */
class RoleRouter {

    async loadRouter(router, controller) {
        router.post("/role/getRoleList", controller.role.getRoleList);
        router.post('/role/addOrUpdateRole', controller.role.addOrUpdateRole);
        router.post('/role/deleteRoleByIds', controller.role.deleteRoleByIds);

    }
}

module.exports = new RoleRouter()