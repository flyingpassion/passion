const Controller = require('egg').Controller;
const {secrets, objects, rules} = require("../util/objects");
const constant = require("../constant/constant");

class OrganizationController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.service = ctx.service;
        this.helper = ctx.helper;
    }

    /**
     * 更新组织令牌
     * @returns {Promise.<void>}
     */
    async updateOrganizationToken() {

        try {
            let params = this.ctx.request.body;
            //#参数校验
            await this.service.organization.updateOrganizationToken({id: params.id, token: params.token});
            this.ctx.body = this.helper.webResult(0, this.ctx.__("updateOrganizationTokenSuccess"));
        } catch (e) {
            this.logger.error("更新组织token错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.__("updateOrganizationTokenError"), e);
        }
    }

    /**
     * 获取组织列表信息
     * @returns {Promise.<void>}
     */
    async getOrganizationList() {
        try {
            let params = this.ctx.request.body;
            params = params.ids || null;
            let dataList = await this.service.organization.getOrganizationList(params);

            this.ctx.body = this.helper.webResult(0, dataList, this.ctx.gettext("getOrganizationListSuccess"))
        } catch (e) {
            console.error(e)
            this.logger.error("获取组织列表时，发生错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.gettext('getOrganizationListError'), e)
        }
    }

    /**
     * 添加或者更新组织信息
     * @returns {Promise.<void>}
     */
    async addOrUpdateOrganization() {
        try {

            let params = this.ctx.request.body;

            //参数校验
            this.logger.info("参数", params);

            let enable = objects.isBlank(params.token) ? constant.disable_zero : constant.enable_one;
            await this.service.organization.addOrUpdateOrganization({
                id: params.id,
                pId: params.pId,
                name: params.name,
                token: params.token,
                createTime: params.createTime || "",
                description: params.description,
                enable: enable
            });

            this.ctx.body = this.helper.webResult(0, this.ctx.gettext('addOrUpdateOrganizationSuccess'))
        } catch (e) {
            console.error(e);
            this.logger.error("添加或更新组织发生错误", e.message);
            this.ctx.body = this.helper.webResult(-1, this.ctx.gettext("addOrUpdateOrganizationError"))
        }


    }
}

module.exports = OrganizationController;