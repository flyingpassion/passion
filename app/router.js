'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const userRouter = require("./router/userRouter");


module.exports = async (app) => {


    const {router, controller} = app;

    await userRouter.loadRouter(router, controller);

};
