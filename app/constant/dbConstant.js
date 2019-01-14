const table = {
    baseUser: "t_baseuser",//系统用户相关
    organization: "t_organization",//系统组织机构
    role: "t_role",//用户角色
    permission: "t_permission",//用户权限
    group: "t_group",//分组
    userGroup: "t_user_group", //用户和分组的关系
    userPermission: "t_user_permission",//用户和权限关系
    userRole: "t_user_role",//用户和角色关系
    groupRole: "t_group_role",//分组和角色关系
    groupPermission: "t_group_permission",//分组和权限关系
    rolePermission: "t_role_permission",//角色和权限
    actionLog: "t_action_log",//用户操作日志
};

module.exports = {table,};