module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"airbnb-base",
		"plugin:prettier/recommended" // 添加 prettier 插件
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module"
	},
	globals: {
		defineProps: "readonly",
		defineEmits: "readonly",
		defineExpose: "readonly",
		withDefaults: "readonly",
		defineOptions: "readonly"
	},
	plugins: ["vue"],
	rules: {
		semi: [2, "always"], // 代码结尾必须添加分号
		"import/prefer-default-export": "off", // 关闭导出一个只能用export default 的限制
		"import/extensions": "off", // 解决eslint不识别 @ 别名
		"import/no-unresolved": "off", // 解决eslint不识别 @ 别名
		"import/no-extraneous-dependencies": "off", // 关闭内置模块审查
		"vue/multi-word-component-names": "off", // 关闭名称校验
		// 开发环境不对console进行审查
		"no-console": "off", // process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 允许使用自增自减符号
		"no-plusplus": ["off", { allowForLoopAfterthoughts: true }],
		// 允许修改函数的入参
		"no-param-reassign": [
			"error",
			{
				props: true,
				ignorePropertyModificationsFor: ["config", "app", "state", "row", "vnode", "ctx"]
			}
		],
		"newline-per-chained-call": "off", // 允许使用链式调用
		"no-nested-ternary": "off" // 允许嵌套三元表达式
	}
};
