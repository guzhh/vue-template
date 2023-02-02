import Joi from "joi";

/**
 * 验证 角色资源规则 数据 schema
 * @type {Joi.ObjectSchema<any>}
 */
export const authRoleSchema = Joi.object({
	roleId: Joi.number().required().error(new Error("请选择规则对应的角色")),
	resId: Joi.number().required().error(new Error("请选择规则对应的资源")),
	name: Joi.string().required().error(new Error("请输入角色资源规则名称")),
	ruleField: Joi.string().required().error(new Error("请输入角色资源规则字段")),
	ruleExpress: Joi.string().required().error(new Error("请输入角色资源规则表达式")),
	ruleVal: Joi.string().required().error(new Error("请输入角色资源规则值")),
	state: Joi.number().required().error(new Error("请选择角色资源规则状态"))
});
