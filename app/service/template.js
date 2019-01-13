const Service = require('egg').Service;

const {objects} = require("../util/objects");
const {table} = require("../constant/dbConstant");

class ModelService extends Service {

    constructor(params) {
        super(params);
        this.mysql = this.app.mysql
    }

    /**
     * 获取modelAlias列表或者模糊配型名称
     * @param ids
     * @returns {Promise.<void>}
     */
    async getModelList(ids, keywords = null) {

        let where = {};
        if (objects.isNotBlank(ids) && objects.isNotBlank(keywords)) {
            let sql = `select * from ${table.tableName} where id in (${ids.split(",")}) and name like '%${keywords}%'`;
            return this.mysql.query(sql)
        } else if (objects.isNotBlank(ids) && objects.isBlank(keywords)) {
            Object.assign(where, {where: {id: ids.split(',')}});
        } else if (objects.isBlank(ids) && objects.isNotBlank(keywords)) {
            let sql = `select * from ${table.tableName} where name like '%${keywords}%'`;
            return this.mysql.query(sql);
        }

        return this.mysql.select(table.tableName, where);
    }

    /**
     * 获取单个modelAlias
     * @param id
     * @returns {Promise.<void>}
     */
    async getModelOne(id) {

        return this.mysql.get(table.tableName, {id: parseInt(id)});
    }


    async addOrUpdateModel({addOrUpdateParams}) {

        if (objects.isNotBlank(id)) {
            // 更新
            this.mysql.update(table.tableName, {updateParams})
        } else {
            //添加信息
            this.mysql.insert(table.tableName, {addParams})
        }
    }

    /**
     * 删除modelAlias
     * @param ids
     * @returns {Promise.<void>}
     */
    async deleteModelByIds(ids) {

        this.mysql.delete(table.tableName, {id: ids.split(",")})
    }
}

/**
 ==========================================================================================
 ===========                                                                 ==============
 ======                              模板文件使用说明                             =========
 ===========                                                                 ==============
 ==========================================================================================

 modelAlis           替换为函数功能描述的模型名称

 tableName           替换为 模型业务对应需要操作的数据库名称，详见constant/dbConstant.js

 Model               替换为 数据库模型名称，即数据库表对象

 addOrUpdateParams   替换为对应模型数据库表的全部数据列

 updateParams        替换为 可以更新的数据库字段，必须含主键

 addParams           替换为 添加纪录是数据库字段；主键设置自增时不能含主键列，反之必须存在


 ==========================================================================================
 ===========                                                                 ==============
 ======        推荐换结束上述内容之后，添加addOrUpdate模型函数对应的文档注释      =========
 ===========                                                                 ==============
 ==========================================================================================
 */


module.exports = ModelService;