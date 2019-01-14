const Controller = require('egg').Controller;
const {secrets, objects, rules} = require("../util/objects");
const constant = require("../constant/constant");

class GroupController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.service = ctx.service;
        this.helper = ctx.helper;
    }

    /**
     * 获取分组列表信息
     * @returns {Promise.<void>}
     */
    async getGroupList() {
        try {
            let {ids = null, keywords = null} = this.ctx.request.body;

            let dataList = await this.service.group.getGroupList(ids, keywords);
            this.ctx.body = this.helper.webResult(0, this.ctx.__("getGroupListSuccess"), dataList)
        } catch (e) {
            this.logger.error("获取分组信息错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.__("getGroupListError"), e)
        }
        return;
    }

    /**
     * 获取单个分组数据
     * @returns {Promise.<void>}
     */
    async getGroupOne() {

        try {
            let {id} = this.ctx.request.body;

            this.ctx.validate({id: "string"}, {id});

            let data = await this.service.group.getGroupOne(id);
            this.ctx.body = this.ctx.helper.webResult(0, this.ctx.__("getGroupOneSuccess"), data)
        } catch (e) {
            console.error(e)
            this.logger.error("删除分组错误", e.message);
            this.ctx.body = this.ctx.helper.webResult(this.ctx.__("getGroupOneSuccess"), e)
        }
        return;
    }

    /**
     * 添加或更新分组
     * @returns {Promise.<void>}
     */
    async addOrUpdateGroup() {

        try {
            let {id = null, name, description = "", createTime = "", enable = constant.disable_zero} = this.ctx.request.body;

            //数据校验
            this.ctx.validate({name: 'string'}, {name: name});

            await this.service.group.addOrUpdateGroup({id, name, createTime, description, enable});
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("addOrUpdateGroupSuccess"))
        } catch (e) {
            this.logger.error("添加或更新分组失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.__("addOrUpdateGroupError"), e);
        }
        return;
    }

    /**
     * 删除分组
     * @returns {Promise.<void>}
     */
    async deleteGroupByIds() {
        try {

            let {ids} = this.ctx.request.body;
            this.ctx.validate({ids: 'string', allowEmpty: false}, {ids: ids});

            await this.service.group.deleteGroupByIds(ids);
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext('deleteGroupSuccess'));
        } catch (e) {
            this.logger.error("删除分组失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.gettext("deleteGroupError"), e);
        }
        return;
    }
}

module.exports = GroupController;