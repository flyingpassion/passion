/**
 * 路由
 */
class ModelRouter {

    async loadRouter(router, controller) {
        router.post("/modelRouter/getModelList", controller.action.getModelList);
        router.post('/modelRouter/addOrUpdateModel', controller.action.addOrUpdateModel);
        router.post('/modelRouter/deleteModelByIds', controller.action.deleteModelByIds);
        router.post('/modelRouter/getModelOne', controller.action.getModelOne);

    }
}

/**
 ==========================================================================================
 ===========                                                                 ==============
 ======                              模板文件使用说明                             =========
 ===========                                                                 ==============
 ==========================================================================================

 Model               替换为 数据库模型名称，即数据库表对象

 modelRouter        替换为 一级路由


 ==========================================================================================
 ===========                                                                 ==============
 ======                              模板文件使用说明                             =========
 ===========                                                                 ==============
 ==========================================================================================
 */

module.exports = new ModelRouter();