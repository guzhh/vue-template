// 应用主题预设颜色
export const appThemeList = [
	"#465CFF",
	"#18a058",
	"#409eff",
	"#F5222D",
	"#722ED1",
	"#ee4f12",
	"#0096c7",
	"#ff9801",
	"#ff3d68",
	"#01c1d4",
	"#71efa3",
	"#171010",
	"#78dec7",
	"#1768ac",
	"#43c628",
	"#ead41e",
	"#22bd7c",
	"#9727bf",
	"#165DFF",
	"#D03050FF"
];

export default {
	theme: "light", // 主题
	sideTheme: "white", // 菜单栏主题 'dark' | 'white'
	colorWeak: true, // 色弱模式
	navbar: true, // 是否开启头部标题栏
	menu: true, // 是否有菜单栏
	hideMenu: false, // 是否隐藏菜单
	menuCollapse: false, // 默认是否折叠菜单栏
	footer: true, // 是否显示
	themeColor: appThemeList[0], // 系统主题色
	menuWidth: 180, // 菜单宽度
	menuCollapsedWidth: 60, // 菜单折叠后宽度
	globalSettings: false, // 是否显示 全局设置
	tabBar: true, // 是否开启多页签
	device: "desktop", // 当前界面模式 desktop || mobile
	tableSize: "mini" // table size medium / small / mini
};
