<template>
	<div class="navbar" :style="{ backgroundColor: headerColor }">
		<div class="left-side">
			<logo-title />
			<n-breadcrumb style="margin-left: 40px">
				<n-breadcrumb-item v-for="item in router.currentRoute.value.matched" :key="item.path">
					<router-link :to="item.path">
						<span v-if="item.path === '/'" style="color: #fff">首页</span>
						<span v-else style="color: #fff">{{ item.meta.title }}</span>
					</router-link>
				</n-breadcrumb-item>
			</n-breadcrumb>
			<n-space align="center">
				<n-icon
					size="22"
					style="display: flex; align-items: center; margin-left: 10px"
					v-if="appStore.device === 'mobile'"
					@click="toggleDrawerMenu"
				>
					<MenuFoldOutlined />
				</n-icon>
			</n-space>
		</div>
		<div class="right-side">
			<li>
				<n-tooltip>
					<span>点击可以切换机构【数据查看范围】</span>
					<template #trigger>
						<span class="navbar-org" @click="selectAnInstitution">
							{{ orgData.code ? orgData.name : "未知机构" }} <n-icon size="15" style="margin-left: 5px"> <ChevronDown /> </n-icon
						></span>
					</template>
				</n-tooltip>
			</li>
			<li class="right-side">
				<n-tooltip>
					<span>点击可以切换科室【当前所在科室】</span>
					<template #trigger>
						<span class="navbar-org" @click="selectADepartment"
							>{{ userStore.userInfo.departName }} <n-icon size="15" style="margin-left: 5px"> <ChevronDown /> </n-icon
						></span>
					</template>
				</n-tooltip>
			</li>
			<li class="right-side">
				<span style="margin-left: 5px">{{ userStore.userInfo.name }}</span>
			</li>
			<li>
				<n-tooltip>
					<span>{{ theme === "light" ? "点击切换为暗黑模式" : "点击切换为亮色模式" }}</span>
					<template #trigger>
						<n-button
							:color="theme === 'dark' ? undefined : '#fff'"
							class="nav-btn"
							circle
							size="small"
							@click="handleToggleTheme"
						>
							<template #icon>
								<n-icon v-if="theme === 'dark'">
									<moon-sharp />
								</n-icon>
								<n-icon v-else>
									<Outline></Outline>
								</n-icon>
							</template>
						</n-button>
					</template>
				</n-tooltip>
			</li>
			<li>
				<n-tooltip>
					<span>{{ isFullscreen ? "点击退出全屏模式" : "点击切换全屏模式" }}</span>
					<template #trigger>
						<n-button
							:color="theme === 'dark' ? undefined : '#fff'"
							class="nav-btn"
							circle
							size="small"
							@click="toggleFullScreen"
						>
							<template #icon>
								<n-icon>
									<full-screen-minimize24-regular
										:style="{ color: theme === 'dark' ? undefined : themeVars.primaryColor }"
										v-if="isFullscreen"
									/>
									<full-screen-maximize24-regular
										:style="{ color: theme === 'dark' ? undefined : themeVars.primaryColor }"
										v-else
									/>
								</n-icon>
							</template>
						</n-button>
					</template>
				</n-tooltip>
			</li>
			<li>
				<n-tooltip>
					<span>页面配置</span>
					<template #trigger>
						<n-button :color="theme === 'dark' ? undefined : '#fff'" class="nav-btn" circle size="small" @click="setVisible">
							<template #icon>
								<n-icon>
									<setting-outlined :style="{ color: theme === 'dark' ? undefined : themeVars.primaryColor }" />
								</n-icon>
							</template>
						</n-button>
					</template>
				</n-tooltip>
			</li>
			<li>
				<n-dropdown trigger="click" :options="userHandleOptions" @select="dropdownSelect">
					<n-button :color="theme === 'dark' ? undefined : '#fff'" class="nav-btn" circle size="small">
						<template #icon>
							<n-icon>
								<user-outlined :style="{ color: theme === 'dark' ? undefined : themeVars.primaryColor }" />
							</n-icon>
						</template>
					</n-button>
				</n-dropdown>
			</li>
		</div>
		<org-switch ref="orgSwitchRef"></org-switch>
		<dept-switch ref="deptSwitchRef" />
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useThemeVars } from "naive-ui";
import { useFullscreen } from "@vueuse/core";
import { inject, watch, ref, computed } from "vue";
import { MoonSharp } from "@vicons/ionicons5";
import { FullScreenMaximize24Regular, FullScreenMinimize24Regular } from "@vicons/fluent";
import { MenuFoldOutlined, SettingOutlined, UserOutlined, ExportOutlined } from "@vicons/antd";
import OrgSwitch from "@/components/OrgSwitch/index.vue";
import DeptSwitch from "@/components/OrgSwitch/deptSwitch.vue";
import { getCurrOrgInfo } from "@/api/system/orgAdmin";
import useUserStore from "@/store/modules/user";
import useAppStore from "@/store/modules/app";
import useHandleTheme from "@/hooks/useHandleTheme";
import { renderIcon } from "@/utils/render";
import useUser from "@/hooks/useUser";
import LogoTitle from "@/components/LogoTitle/index.vue";
import Outline from "@/assets/images/outline.svg";

defineOptions({ name: "Navbar" });

const router = useRouter();
const orgSwitchRef = ref();
const deptSwitchRef = ref();
const appStore = useAppStore();
const userStore = useUserStore();
const { logout } = useUser();
// 全局公共CSS变量
const themeVars = useThemeVars();
const { theme, handleToggleTheme } = useHandleTheme(); // 主题调整
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen(); // 全屏

const headerColor = computed(() => {
	if (appStore.theme === "dark") {
		return themeVars.value.bodyColor;
	}
	return themeVars.value.primaryColor;
});

// const title = import.meta.env.VITE_SYSTEM_NAME; // 系统标题
const userHandleOptions = [
	{
		label: "用户中心",
		key: "userCenter",
		icon: renderIcon(UserOutlined)
	},
	{
		label: "用户设置",
		key: "userSettings",
		icon: renderIcon(SettingOutlined)
	},
	{
		label: "退出登录",
		key: "logout",
		icon: renderIcon(ExportOutlined)
	}
];

const orgData = ref({});

watch(
	() => userStore.currentOrgCode,
	newValue => {
		if (newValue) {
			getCurrOrgInfo({ orgCode: newValue }).then(res => {
				if (res.success && res.result) {
					orgData.value = res.result;
				} else {
					orgData.value = {};
				}
			});
		}
	},
	{ deep: true, immediate: true }
);

// 打开全局设置面板
const setVisible = () => {
	appStore.updateSettings({ globalSettings: true });
};

// 打开菜单选择器
const toggleDrawerMenu = inject("toggleDrawerMenu");

// 退出登录
const handleLogout = () => {
	logout();
};

const handleOptionsFun = {
	userCenter: () => {
		router.push({ name: "personal" });
	}, // 前往用户中心
	userSettings: () => {
		router.push({ name: "settings" });
	}, // 用户设置
	logout: handleLogout
};

// 用户下拉选择
const dropdownSelect = key => {
	handleOptionsFun[key]();
};

const selectAnInstitution = () => {
	orgSwitchRef.value.handleOrg();
};

const selectADepartment = () => {
	deptSwitchRef.value.handleDept();
};
</script>
<!--borderColor-->
<style scoped lang="less">
.navbar {
	display: flex;
	justify-content: space-between;
	height: 100%;
	//background-color: v-bind("themeVars.primaryColor");
	//border-bottom: 1px solid v-bind("themeVars.borderColor");
	box-sizing: border-box;
	color: #fff;
	//padding-left: v-bind(navbarLeftPadding);
}

::v-deep(.n-breadcrumb) {
	padding-top: 3px;
}

.navbar-org {
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	margin-left: 20px;
}

.left-side {
	display: flex;
	align-items: center;
	padding-left: 20px;

	img {
		//width: 25px;
		height: 25px;
		display: flex;
		align-items: center;
	}
}

.right-side {
	display: flex;
	padding-right: 20px;
	list-style: none;
	align-items: center;
	height: 100%;

	:deep(.locale-select) {
		border-radius: 20px;
	}

	li {
		display: flex;
		align-items: center;
		padding: 0 10px;
	}

	a {
		color: var(--color-text-1);
		text-decoration: none;
	}

	.nav-btn {
		border-color: rgb(var(--gray-2));
		color: rgb(var(--gray-8));
		font-size: 16px;
	}

	.trigger-btn,
	.ref-btn {
		position: absolute;
		bottom: 14px;
	}

	.trigger-btn {
		margin-left: 14px;
	}
}
</style>
