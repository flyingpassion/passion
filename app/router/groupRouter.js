/**
 * 用户角色路由
 */
class GroupRouter {

    async loadRouter(router, controller) {
        router.post("/group/getGroupList", controller.group.getGroupList);
        router.post('/group/addOrUpdateGroup', controller.group.addOrUpdateGroup);
        router.post('/group/deleteGroupByIds', controller.group.deleteGroupByIds);
        router.post('/group/getGroupOne', controller.group.getGroupOne);

    }
}

module.exports = new GroupRouter();