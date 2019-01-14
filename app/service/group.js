const Service = require('egg').Service;

const {objects} = require("../util/objects");
const {table} = require("../constant/dbConstant");

class GroupService extends Service {

    constructor(params) {
        super(params);
        this.mysql = this.app.mysql
    }

    /**
     * @descGetList
     * @param ids
     * @returns {Promise.<void>}
     */
    async getGroupList(ids, keywords = null) {

        let where = {};
        if (objects.isNotBlank(ids) && objects.isNotBlank(keywords)) {
            let sql = `select * from ${table.group} where id in (${ids.split(",")}) and name like '%${keywords}%'`;
            return this.mysql.query(sql)
        } else if (objects.isNotBlank(ids) && objects.isBlank(keywords)) {
            Object.assign(where, {where: {id: ids.split(',')}});
        } else if (objects.isBlank(ids) && objects.isNotBlank(keywords)) {
            let sql = `select * from ${table.group} where name like '%${keywords}%'`;
            return this.mysql.query(sql);
        }

        return this.mysql.select(table.group, where);
    }

    /**
     * @descGetOne
     * @param id
     * @returns {Promise.<void>}
     */
    async getGroupOne(id) {

        return this.mysql.get(table.group, {id: parseInt(id)});
    }

    /**
     * 添加或这个更新分组
     * @param id
     * @param name
     * @param createTime
     * @param description
     * @param enable
     * @returns {Promise.<void>}
     */
    async addOrUpdateGroup({id, name, createTime, description, enable}) {

        if (objects.isNotBlank(id)) {
            // 更新
            this.mysql.update(table.group, {id, name, description, enable})
        } else {
            //添加信息
            this.mysql.insert(table.group, {name, createTime, description, enable})
        }
    }

    /**
     * @descDelete
     * @param ids
     * @returns {Promise.<void>}
     */
    async deleteGroupByIds(ids) {

        this.mysql.delete(table.group, {id: ids.split(",")})
    }
}


module.exports = GroupService;