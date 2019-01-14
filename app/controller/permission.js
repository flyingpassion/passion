const Controller = require('egg').Controller;
const {secrets, objects, rules} = require("../util/objects");
const constant = require("../constant/constant");

class PermissionController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.service = ctx.service;
        this.helper = ctx.helper;
    }

    /**
     * 获取权限列表信息
     * @returns {Promise.<void>}
     */
    async getPermissionList() {
        try {
            let {ids = null, keywords = null} = this.ctx.request.body;

            let dataList = await this.service.permission.getPermissionList(ids, keywords);
            this.ctx.body = this.helper.webResult(0, this.ctx.__("getPermissionListSuccess"), dataList)
        } catch (e) {
            this.logger.error("获取权限信息错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.__("getPermissionListError"), e)
        }
    }

    /**
     * 获取单个权限数据
     * @returns {Promise.<void>}
     */
    async getPermissionOne() {

        try {
            let {id} = this.ctx.request.body;

            this.ctx.validate({id: "string"}, {id});

            let data = await this.service.permission.getPermissionOne(id);

            this.ctx.body = this.ctx.helper.webResult(0, this.ctx.__("getPermissionOneSuccess"), data)
        } catch (e) {
            console.error(e)
            this.logger.error("删除权限错误", e.message);
            this.ctx.body = this.ctx.helper.webResult(this.ctx.__("getPermissionOneSuccess"), e)
        }
        return;
    }

    /**
     * 添加或更新权限
     * @returns {Promise.<void>}
     */
    async addOrUpdatePermission() {

        try {
            let {id = null, name, description = "", enable = constant.disable_zero} = this.ctx.request.body;

            //数据校验
            this.ctx.validate({name: 'string'}, {name: name});

            await this.service.permission.addOrUpdatePermission({id, name, description, enable});

            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("addOrUpdatePermissionSuccess"))

        } catch (e) {
            this.logger.error("添加或更新用户权限失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.__("addOrUpdatePermissionError"), e);
        }
    }

    /**
     * 删除权限
     * @returns {Promise.<void>}
     */
    async deletePermissionByIds() {
        try {

            let {ids} = this.ctx.request.body;
            this.ctx.validate({ids: 'string', allowEmpty: false}, {ids: ids});

            await this.service.permission.deletePermissionByIds(ids);

            this.ctx.body = this.helper.webResult(0, this.ctx.gettext('deletePermissionSuccess'));

        } catch (e) {
            this.logger.error("删除角色失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.gettext("deletePermissionError"), e);
        }
    }
}

module.exports = PermissionController;