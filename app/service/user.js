const Service = require('egg').Service;

const {objects} = require("../util/objects");
const {table} = require("../constant/dbConstant");

class UserService extends Service {

    constructor(param){
        super(param);
        this.mysql = this.app.mysql;
    }

    /**
     * 通过用户名称查询用户信息
     * @param username
     * @returns {Promise.<*>}
     */
    async findUserByUsername(username = "") {
        return await this.mysql.get(table.baseUser, {
            username: username
        });
    }

    /**
     * 添加用户信息
     * @param id        用户Id 添加是为空
     * @param typeId    用户所属类型
     * @param pId       用户管理者id
     * @param orgId     用户所属组织Id
     * @param token     用户加密令牌
     * @param username  用户登录名称
     * @param password  密码
     * @param nickname  昵称
     * @param realName      真实姓名
     * @param phoneNumber   电话号码
     * @param email         邮箱地址
     * @param createTime    用户创建时间
     * @param signature     用户个性签名
     * @param enable        用户是否有效,0:禁用,1:启用
     * @returns {Promise.<*>}
     */
    async addUser({id,typeId,pId,orgId,token,username,password,nickname,realName,
                      phoneNumber,email,createTime,signature,enable}) {

        return await this.mysql.insert(table.baseUser,
            {id,typeId,pId,orgId,token,username,password,
                nickname,realName,phoneNumber,email,createTime,signature,enable});
    }

    /**
     * 更新用户信息
     * @param id        修改用户编号不能为空
     * @param typeId    用户类型
     * @param pId       用户管理者编号
     * @param orgId     用户所属的组织编号
     * @param username  用户名称
     * @param nickname  昵称
     * @param realName  真实姓名
     * @param phoneNumber   电话号码
     * @param email         邮件地址
     * @param signature     个性签名
     * @param enable        用户是否有效,0:禁用,1:启用
     * @returns {Promise.<*>}
     */
    async updateUser({id,typeId,pId,orgId,username,nickname,realName,phoneNumber,email,signature,enable}) {

        return await this.mysql.update(table.baseUser,
            {id,typeId,pId,orgId,username, nickname,realName,phoneNumber,email,signature,enable});
    }

    async updateUserPwd({id,password}){

        return await this.mysql.update(table.baseUser,{id,password})

    }

    async findUserById(id){
        return await this.mysql.get(table.baseUser,{id:parseInt(id)});
    }

    async findLeadList(id){

        let dataList =  await this.mysql.select(table.baseUser,{where:{pId:id}})
        return dataList.map(item=>{
            item.password =null;
            item.token = null;
            return item;
        })
    }
}

module.exports = UserService;