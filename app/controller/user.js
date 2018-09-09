'use strict';

const Controller = require('egg').Controller;
const {secrets, objects, rules} = require("../util/objects");

const RuleUtil = {
    common: {
        username: {type: 'string'},
        password: {type: 'password'},
    },
    addUser: {
        username: {type: 'string'},
        password: {type: 'password'},
        email: {type: 'email', allowEmpty: false},
        phoneNumber: {type: 'string', required: false, allowEmpty: true},
        token: {type: "string"},
    },
    updateUser: {
        id: {type: 'id', allowEmpty: false},
        password: {type: 'password'},
        email: {type: 'email', allowEmpty: false},
        phoneNumber: {type: 'string', required: false, allowEmpty: true},
        token: {type: "string"},
    },
    updateUserPwd: {
        id: {type: 'id'},
        password: {type: 'password', compare: 'repwd'},
        compared: {type: 'password'}
    }
};

/**
 * 用户相关控制器
 */
class UserController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.service = ctx.service;
        this.helper = ctx.helper;
    }

    /**
     * 用户登录系统
     * @returns {Promise.<void>}
     */
    async userLogin() {

        try {
            let params = this.ctx.request.body;
            // let rule = rules.makeRules(params, [{
            //     username: {type: 'string'},
            //     password: {type: 'password'}
            // }]);
            this.ctx.validate(RuleUtil.common, params);
            let data = await this.service.user.findUserByUsername(params.username);
            //用户密码校验
            let pwd = secrets.getEncAse192(params.password, data.token);
            if (!Object.is(pwd, data.password)) {
                throw new Error();
            }

            //登陆成功之后，清空密码
            data.password = null;
            this.ctx.session.user = data;
            this.ctx.body = this.ctx.helper.webResult(0, this.ctx.gettext("userLoginSuccess"), data);

        } catch (e) {
            this.logger.error("用户登录发生错误", e.message);
            this.ctx.body = this.ctx.helper.webResult(1010, this.ctx.gettext("userLoginFail"), e);
        }
        return;
    }

    /**
     * 添加或者用更新用户信息
     * @returns {Promise.<void>}
     */
    async addUser() {

        try {

            let params = this.ctx.request.body;
            this.ctx.validate(RuleUtil.addUser, params);

            let exists = await this.service.user.findUserByUsername(params.username);
            if (objects.isNotBlank(exists)) {
                throw new Error(this.ctx.gettext("userExists"));
            }

            //密码加密，
            params.token = secrets.getHmac(params.token, secrets.md5(params.token));
            params.password = secrets.getEncAse192(params.password, params.token);

            this.service.user.addUser(params);

            this.ctx.body = this.ctx.helper.webResult(0, this.ctx.gettext("userAddSuccess"));
        } catch (e) {
            console.log(e);
            this.logger.error("用户信息添加失败，", e.message);
            this.ctx.body = this.ctx.helper.webResult(1011, this.ctx.gettext("userAddFail"), e);
        }
        return;
    }

    /**
     * 更新用户信息
     * @returns {Promise.<void>}
     */
    async updateUser() {

        try {

            let params = this.ctx.request.body;
            this.ctx.validate(RuleUtil.updateUser, params);

            //更新用户信息
            //密码加密
            params.token = secrets.getHmac(params.token, secrets.md5(params.token));
            params.password = secrets.getEncAse192(params.password, params.token);

            this.service.user.updateUser(params);
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext('userUpdateSuccess'))
        } catch (e) {
            this.logger.error("更新用户信息发生错误,详细错误信息", e.message);
            this.ctx.body = this.helper.webResult(1010, this.ctx.gettext('userUpdateFail'), e)
        }

    }

    /**
     * 更新用户密码
     * @returns {Promise.<void>}
     */
    async updateUserPwd() {

        try {
            //获取参数
            let params = this.ctx.request.body;
            //参数检验
            this.ctx.validate(RuleUtil.updateUserPwd, params);
            let user = await this.service.user.findUserById(params.id);

            params.password = secrets.getEncAse192(params.password, user.token);
            params.compared = secrets.getEncAse192(params.compared, user.token);

            params.repwd = secrets.getEncAse192(params.repwd, user.token);

            if (!Object.is(params.compared, user.password)) {
                this.ctx.body = this.helper.webResult(1010, this.ctx.gettext('pwdComparedError'));
                return;
            }
            this.service.user.updateUserPwd({id: params.id, password: params.password})

            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("updatePwdSuccess"));
        } catch (e) {
            this.logger.error("更新用户密码发生错误", e.message);
            this.ctx.body = this.helper.webResult(1010, this.ctx.gettext("updatePwdError"), e)
        }
        return
    }

    /**
     * 验证用户登录状态是否有效
     * @returns {Promise.<void>}
     */
    async userAuthority() {

        try {

            let user = this.ctx.session.user;
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("userAuthoritySuccess"), user)
        } catch (e) {
            this.logger.error("用户登录状态验证失败");
            this.ctx.body = this.helper.webResult(0, this.ctx.gettext("userAuthorityError"), e)
        }
        return;
    }

    /**
     *查询指定用户所管理其他用户信息
     *
     */
    async getLeadedList() {
        try {
            let {id} = this.ctx.request.body;
            this.ctx.validate({id: {type: 'id'}}, {id});
            let dataList = await this.service.user.findLeadList(id);
            this.ctx.body = this.helper.webResult(0, this.ctx.__("getLeadedSuccess"), dataList);
        } catch (e) {
            this.logger.error("查询被管理用户信息失败", e.message);
            this.ctx.body = this.helper.webResult(1010, this.ctx.gettext('getLeadedError'), e)
        }
    }
}

module.exports = UserController;
