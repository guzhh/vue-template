// 资源类型
export const typeFlagOptions = [
	{ label: "菜单", value: 1, type: "success" },
	{ label: "按钮", value: 2, type: "error" },
	{ label: "扩展页面", value: 3, type: "warning" }
];

// 一些是否选项
export const ifcacheOptions = [
	{ label: "否", value: 0, type: "error" },
	{ label: "是", value: 1, type: "success" }
];

export const lintTypeOptions = [
	{ label: "外部链接", value: 1, type: "success" },
	{ label: "内嵌链接", value: 2, type: "error" },
	{ label: "非链接", value: 3, type: "warning" }
];

export const disableEnableOption = [
	{ label: "禁用", value: 0, type: "error" },
	{ label: "启用", value: 1, type: "success" }
];

// 子系统管理、 科室管理、机构管理状态
export const ifDeletedOption = [
	{ label: "未删除", value: 0, type: "success" },
	{ label: "已删除", value: 1, type: "error" }
];

// 用户管理用户在线状态
export const ifOnLineOption = [
	{ label: "离线", value: 0, type: "error" },
	{ label: "在线", value: 1, type: "success" }
];

// 用户管理用户状态
export const stateJudgeOption = [
	{ label: "启用", value: 1, type: "success" },
	{ label: "禁用", value: 2, type: "warning" },
	{ label: "删除", value: 3, type: "error" },
	{ label: "锁定", value: 4, type: "warning" }
];
