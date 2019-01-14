const Service = require('egg').Service;

const {objects} = require("../util/objects");
const {table} = require("../constant/dbConstant");

/**
 * 组织管理香港
 */
class OrganizationService extends Service {

    constructor(params) {
        super(params);
        this.mysql = this.app.mysql;
    }

    /**
     * 更新组织token
     * @param id
     * @param token
     * @returns {Promise.<void>}
     */
    async updateOrganizationToken({id, token}) {

        this.mysql.update(table.organization, {id, token})
    }

    /**
     * 查询组织信息
     * @param ids
     * @returns {Promise.<*>}
     */
    async getOrganizationList(ids) {
        let where = {};
        if (objects.isNotBlank(ids))
            where['where'] = {id: ids.split(",")};
        return await this.mysql.select(table.organization, where)
    }

    /**
     * 添加或更新组织信息
     * @param id
     * @param pId
     * @param name
     * @param token
     * @param createTime
     * @param description
     * @param enable
     * @returns {Promise.<void>}
     */
    async addOrUpdateOrganization({id, pId, name, token, createTime, description, enable}) {

        if (objects.isNotBlank(id)) {
            //更新
            this.mysql.update(table.organization, {id, name, token, description, enable})
        } else {
            //添加
            this.mysql.insert(table.organization, {pId, name, token, createTime, description, enable})
        }
    }


}

module.exports = OrganizationService;