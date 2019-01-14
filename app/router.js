'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const userRouter = require("./router/userRouter");
const organizationRouter = require("./router/organizationRouter");
const roleRouter = require("./router/roleRouter");
const permissionRouter = require("./router/permissionRouter");

const groupRouter = require("./router/groupRouter");
//const groupRouter = require("./router/groupRouter");


module.exports = async (app) => {


    const {router, controller} = app;

    //用户相关路由
    await userRouter.loadRouter(router, controller);
    //组织相关
    await organizationRouter.loadRouter(router, controller);

    //角色相关
    await roleRouter.loadRouter(router, controller);

    //用户权限
    await permissionRouter.loadRouter(router, controller);

    //
    await groupRouter.loadRouter(router, controller);
    // await groupRouter.loadRouter(router, controller);


};
