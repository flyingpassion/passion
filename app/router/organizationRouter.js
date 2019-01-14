class organizationRouter {

    async loadRouter(router, controller) {
        //设置获取组织列表路由
        router.post('/organization/getOrganizationList', controller.organization.getOrganizationList);
        router.post('/organization/addOrUpdateOrganization', controller.organization.addOrUpdateOrganization);
        router.post('/organization/updateOrganizationToken', controller.organization.updateOrganizationToken);

    }
}

module.exports = new organizationRouter();