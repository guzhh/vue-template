import Joi from "joi";

/**
 * 验证 参数配置 数据 schema
 * @type {Joi.ObjectSchema<any>}
 */
export const paramConfigSchema = Joi.array().items(
	Joi.object({
		model: Joi.string()
			.required()
			.error(new Error("请输入参数配置字段model"))
			.invalid("orgCode")
			// eslint-disable-next-line consistent-return
			.error(errors => {
				if (errors[0].code.includes("any.invalid")) return new Error("参数配置字段model不能为orgCode");
				if (errors[0].code.includes("any.required") || errors[0].code.includes("string.base"))
					return new Error("请输入参数配置字段model");
			}),
		name: Joi.string().required().error(new Error("请输入参数配置字段title"))
	})
);
