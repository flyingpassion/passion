const Service = require('egg').Service;

const {objects} = require("../util/objects");
const {table} = require("../constant/dbConstant");

class PermissionService extends Service {

    constructor(params) {
        super(params);
        this.mysql = this.app.mysql
    }

    /**
     * 获取用户权限信息列表
     * @param ids
     * @returns {Promise.<void>}
     */
    async getPermissionList(ids, keywords) {

        let where = {};
        if (objects.isNotBlank(ids) && objects.isNotBlank(keywords)) {
            let sql = `select * from t_permission where id in (${ids.split(",")}) and name like '%${keywords}%'`;
            return this.mysql.query(sql)
        } else if (objects.isNotBlank(ids) && objects.isBlank(keywords)) {
            Object.assign(where, {where: {id: ids.split(',')}});
        } else if (objects.isBlank(ids) && objects.isNotBlank(keywords)) {
            let sql = `select * from t_permission where name like '%${keywords}%'`;
            return this.mysql.query(sql);
        }
        return this.mysql.select(table.permission, where);
    }

    /**
     * 添加 或更新权限信息
     * @param id        用户编号
     * @param name  权限名称
     * @param createTime创建时间，不支持更新
     * @param description 描述信息
     * @param enable    是否启用，1：启用，0:不启用
     * @returns {Promise.<void>}
     */
    async addOrUpdatePermission({id, name, description, enable}) {

        if (objects.isNotBlank(id)) {
            // 更新
            this.mysql.update(table.permission, {id, name, description, enable})
        } else {
            //添加信息
            this.mysql.insert(table.permission, {name, description, enable})
        }
    }

    /**
     * 删除权限信息
     * @param ids
     * @returns {Promise.<void>}
     */
    async deletePermissionByIds(ids) {

        this.mysql.delete(table.permission, {id: ids.split(",")})
    }

    /**
     * 获取单个权限信息
     * @param id
     * @returns {Promise.<void>}
     */
    async getPermissionOne(id) {

        return await this.mysql.get(table.permission, {id: parseInt(id)});
    }
}


module.exports = PermissionService;