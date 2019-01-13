
-- 创建数据库脚本

drop database if exists `passion_authority`;

create database `passion_authority` 
CHARACTER set utf8 
COLLATE utf8_general_ci;


use `passion_authority`;



-- 用户信息
drop table if exists t_baseuser;
create table t_baseuser(
	`id` bigint primary key  AUTO_INCREMENT COMMENT '用户唯一的编号',
	`typeId` bigint COMMENT '用户类型编号',
	`pId` bigint comment '用户根编号', 
	`orgId` bigint comment '用户所属的组织编号',
	`token` varchar(256) default '123456' COMMENT '用户令牌，私钥',
	`username` varchar(100) COMMENT '用户登陆名称',
	`password` varchar(256) COMMENT '用户密码',
	`nickname` varchar(100) COMMENT '用户昵称',
	`realName` varchar(30) default'' COMMENT '用户真实姓名',
	`phoneNumber` varchar(20) default '' COMMENT '用户电话号码',
	`email` varchar(50) default '' COMMENT '用户邮箱',
	`createTime` varchar(64) default '' COMMENT '用户信息注册时间',
	`signature` varchar(256) default '' COMMENT '用户个性签名',
	`enable` int(5) default 0 comment '用户是否有效,0:禁用,1:启用'
)comment="权限管理系统的用户信息";

-- 组织信息
drop table if exists t_organization ;
create table t_organization (
	`id` bigint primary key  AUTO_INCREMENT comment '组织编号',
	`pId` bigint not null comment '父组织编号',
	`name` varchar(30) default '' comment '组织名称',
	`token` varchar(100) default 0 comment '组织令牌',
	`createTime` varchar(64) default '' comment '类型创建时间',
	`description` varchar(100) comment '类型描述信息',
	`enable` int(4) default 0 comment '0:不可用,1:可用'
)comment='组织信息';

-- 角色表
drop table if exists t_role;
create table t_role (
	`id` bigint primary key AUTO_INCREMENT comment '角色编号',
	-- `pId` bigint not null comment '父级角色编号',
	`roleName` varchar(30) comment '角色名称',
	`createTime` varchar(64) comment '创建时间',
	`description` varchar(200) comment '角色描述信息',
	`enable` int(4) default 0 comment '0:不可用,1:可用'
)comment= '用户角色表';

-- 权限信息表
drop table if exists t_permission;
create table t_permission(
	`id` bigint primary key AUTO_INCREMENT comment '权限编号',
	`name` varchar(100) default '' comment '权限名称',
	`description` varchar(200) default '' comment '权限描述信息',
	`enable` int(4) default 0 comment '0:不可用,1:可用'
) comment='权限信息表';

-- 权限组表
drop table if exists t_group;
create table t_group(
	`id` bigint primary key AUTO_INCREMENT comment '组编号',
	`name` varchar(64) default '' comment '组名称',
	`createTime` varchar(64) default '' comment '创建时间',
	`description` varchar(100) default '' comment '组名称',
	`enable` int(4) default 0 comment '0:不可用,1:可用'
)comment="权限组表";

-- 用户和组关系表
drop table if exists t_user_group;
create table t_user_group(
	`id` bigint primary key AUTO_INCREMENT comment '用户和分组关系编号',
	`userId` bigint not null comment '用户编号',
	`groupId` bigint not null comment '组所在的编号'
)comment='用户分和分组的关系表';
-- 用户权限表
drop table if exists t_user_permission;
create table t_user_permission(
	`id` bigint primary key AUTO_INCREMENT comment '用户和权限关系',
	`userId` bigint not null comment '用户编号',
	`permissionId` bigint not null comment '权限编号'
)comment='用户权限关系表';

-- 用户和角色关系
drop table if exists t_user_role;
create table t_user_role (
	`id` bigint primary key AUTO_INCREMENT comment '用户和角色编号',
	`userId` bigint not null comment '用户编号',
	`roleId` bigint not null comment '角色编号'
)comment='用户和角色关系表';

-- 组和角色关系
drop table if exists t_group_role;
create table t_group_role (
	`id` bigint primary key AUTO_INCREMENT comment '组和角色编号',
	`groupId` bigint not null comment '组编号',
	`roleId` bigint not null comment '角色编号'
)comment='组和角色关系表';

-- 组和权限关系
drop table if exists t_group_permission;
create table t_group_permission (
	`id` bigint primary key AUTO_INCREMENT comment '组和权限编号',
	`groupId` bigint not null comment '组编号',
	`permissionId` bigint not null comment '权限编号'
)comment='组和权限关系表';

-- 角色和权限关系
drop table if exists t_role_permission;
create table t_role_permission (
	`id` bigint primary key AUTO_INCREMENT comment '角色和权限编号',
	`roleId` bigint not null comment '角色编号',
	`permissionId` bigint not null comment '权限编号'
)comment='角色和权限关系表';

-- 操作日志信息
drop table if exists t_action_log;
create table t_action_log (
	`id` bigint primary key AUTO_INCREMENT comment '操作日志信息编号',
	`content` varchar(200) not null comment '操作内容',
	`userId` bigint not null comment '用户编号',
	`time` varchar(64) default '' comment '操作时间',
	`url` varchar(256) default '' comment '请求URL'
)comment='系统操作日志';
