/**
 * 用户角色路由
 */
class PermissionRouter {

    async loadRouter(router, controller) {
        router.post("/permission/getPermissionList", controller.permission.getPermissionList);
        router.post('/permission/addOrUpdatePermission', controller.permission.addOrUpdatePermission);
        router.post('/permission/deletePermissionByIds', controller.permission.deletePermissionByIds);
        router.post('/permission/getPermissionOne', controller.permission.getPermissionOne);

    }
}

module.exports = new PermissionRouter();