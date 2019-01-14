const Service = require('egg').Service;

const {objects} = require("../util/objects");
const {table} = require("../constant/dbConstant");

class RoleService extends Service {

    constructor(params) {
        super(params)
        this.mysql = this.app.mysql
    }

    /**
     * 获取用户角色信息列表
     * @param ids
     * @returns {Promise.<void>}
     */
    async getRoleList(ids) {

        let where = {};
        if (objects.isNotBlank(ids)) {
            Object.assign(where, {where: {id: ids.split(',')}})
        }

        return this.mysql.select(table.role, where);

    }

    /**
     * 添加 或更新角色信息
     * @param id        用户编号
     * @param roleName  角色名称
     * @param createTime创建时间，不支持更新
     * @param description 描述信息
     * @param enable    是否启用，1：启用，0:不启用
     * @returns {Promise.<void>}
     */
    async addOrUpdateRole({id, roleName, createTime, description, enable}) {

        if (objects.isNotBlank(id)) {
            // 更新
            this.mysql.update(table.role, {id, roleName, description, enable})
        } else {
            //添加信息
            this.mysql.insert(table.role, {roleName, createTime, description, enable})
        }
    }
    /**
     * 删除角色
     * @param ids
     * @returns {Promise.<void>}
     */
    async deleteRoleByIds(ids) {

        this.mysql.delete(table.role, {id: ids.split(",")})
    }
}


module.exports = RoleService;