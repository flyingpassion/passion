/**
 * 用户相关路由信息配置
 */
class userRouter{

    /**
     * 执行路由配置信息加载
     * @param router
     * @param controller
     * @returns {Promise.<void>}
     */
    async loadRouter(router,controller){
        //用户登录的路由定义
        router.post("/user/userLogin",controller.user.userLogin);
        //用户登录状态验证
        router.post("/user/userAuthority",controller.user.userAuthority);
        //修改用户密码
        router.post("/user/updateUserPwd",controller.user.updateUserPwd);
        //添加或修改用户信息
        router.post("/user/addUser",controller.user.addUser);
        //更新用户
        router.post("/user/updateUser",controller.user.updateUser);
        //查询当前用户所管理的的用户列表
        router.post("/user/getLeadedList",controller.user.getLeadedList);
    }
}

module.exports=new userRouter();