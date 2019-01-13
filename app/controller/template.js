const Controller = require('egg').Controller;
const {secrets, objects, rules} = require("../util/objects");
const constant = require("../constant/constant");

class ModelController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.service = ctx.service;
        this.helper = ctx.helper;
    }

    /**
     * 获取modelAlias列表信息
     * @returns {Promise.<void>}
     */
    async getModelList() {
        try {
            let {ids = null, keywords = null} = this.ctx.request.body;

            let dataList = await this.service.serviceName.getModelList(ids, keywords);
            this.ctx.body = this.helper.webResult(0, this.ctx.__("getModelListSuccess"), dataList)
        } catch (e) {
            this.logger.error("获取modelAlias信息错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.__("getModelListError"), e)
        }
        return;
    }

    /**
     * 获取单个modelAlias数据
     * @returns {Promise.<void>}
     */
    async getModelOne() {

        try {
            let {id} = this.ctx.request.body;

            this.ctx.validate({id: "string"}, {id});

            let data = await this.service.serviceName.getModelOne(id);
            this.ctx.body = this.ctx.helper.webResult(0, this.ctx.__("getModelOneSuccess"), data)
        } catch (e) {
            console.error(e)
            this.logger.error("删除modelAlias错误", e.message);
            this.ctx.body = this.ctx.helper.webResult(this.ctx.__("getModelOneSuccess"), e)
        }
        return;
    }

    /**
     * 添加或更新modelAlias
     * @returns {Promise.<void>}
     */
    async addOrUpdateModel() {

        try {
            let {id = null, name, description = "", enable = constant.disable_zero} = this.ctx.request.body;

            //数据校验
            this.ctx.validate({name: 'string'}, {name: name});

            await this.service.serviceName.addOrUpdateModel({id, name, description, enable});
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("addOrUpdateModelSuccess"))
        } catch (e) {
            this.logger.error("添加或更新modelAlias失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.__("addOrUpdateModelError"), e);
        }
        return;
    }

    /**
     * 删除modelAlias
     * @returns {Promise.<void>}
     */
    async deleteModelByIds() {
        try {

            let {ids} = this.ctx.request.body;
            this.ctx.validate({ids: 'string', allowEmpty: false}, {ids: ids});

            await this.service.serviceName.deleteModelByIds(ids);
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext('deleteModelSuccess'));
        } catch (e) {
            this.logger.error("删除modelAlias失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.gettext("deleteModelError"), e);
        }
        return;
    }
}

/**
 ==========================================================================================
 ===========                                                                 ==============
 ======                              模板文件使用说明                             =========
 ===========                                                                 ==============
 ==========================================================================================

 Model 替换为数据库模型名称

 serviceName 替换为业务层对应文件名称

 modelAlias 替换为日志注释的内容

 ==========================================================================================
 ===========                                                                 ==============
 ======                              模板文件使用说明                             =========
 ===========                                                                 ==============
 ==========================================================================================
 */


module.exports = ModelController;