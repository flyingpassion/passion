const Controller = require('egg').Controller;
const {secrets, objects, rules} = require("../util/objects");
const constant = require("../constant/constant");

class RoleController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.service = ctx.service;
        this.helper = ctx.helper;
    }

    /**
     * 获取角色列表信息
     * @returns {Promise.<void>}
     */
    async getRoleList() {
        try {
            let {ids = null} = this.ctx.request.body;

            let dataList = await this.service.role.getRoleList(ids);
            this.ctx.body = this.helper.webResult(0, this.ctx.__("getRoleListSuccess"), dataList)
        } catch (e) {
            this.logger.error("获取角色信息错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.__("getRoleListError"), e)
        }
    }

    /**
     * 添加或更新角色
     * @returns {Promise.<void>}
     */
    async addOrUpdateRole() {

        try {
            let {id = null, roleName, description = "", enable = constant.disable_zero} = this.ctx.request.body;

            //数据校验
            this.ctx.validate({roleName: 'string'}, {roleName: roleName});

            await this.service.role.addOrUpdateRole({id, roleName, createTime: "", description, enable});

            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("addOrUpdateRoleSuccess"))

        } catch (e) {
            console.error(e);
            this.logger.error("添加或更新用户角色失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.__("addOrUpdateRoleError"), e);
        }
    }

    /**
     * 删除角色
     * @returns {Promise.<void>}
     */
    async deleteRoleByIds() {
        try {

            let {ids} = this.ctx.request.body;
            this.ctx.validate({ids: 'string', allowEmpty: false}, {ids: ids});

            await this.service.role.deleteRoleByIds(ids);

            this.ctx.body = this.helper.webResult(0, this.ctx.gettext('deleteRoleSuccess'));

        } catch (e) {
            this.logger.error("删除角色失败", e.message);
            this.ctx.body = this.helper.webResult(this.ctx.gettext("deleteRoleError"), e);
        }
    }
}

module.exports = RoleController;