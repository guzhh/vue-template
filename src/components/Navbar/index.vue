<template>
	<div class="navbar" :style="{ backgroundColor: headerColor }">
		<div class="left-side">
			<logo-title />
			<n-breadcrumb style="margin-left: 20px">
				<n-breadcrumb-item v-if="router.currentRoute.value.matched.map(item => item.path).indexOf('/user') === 0">
					<router-link to="/">
						<span :style="{ color: handleTextColor }">首页</span>
					</router-link>
				</n-breadcrumb-item>
				<n-breadcrumb-item v-for="item in router.currentRoute.value.matched" :key="item.path">
					<router-link :to="item.path">
						<span v-if="item.path === '/'" :style="{ color: handleTextColor }">首页</span>
						<span v-else :style="{ color: handleTextColor }">{{ item.meta.title }}</span>
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
						<span class="navbar-org" @click="selectAnInstitution" :style="{ color: handleTextColor }">
							{{ orgData.code ? orgData.name : "未知机构" }} <n-icon size="15" style="margin-left: 5px"> <ChevronDown /> </n-icon
						></span>
					</template>
				</n-tooltip>
			</li>
			<li class="right-side">
				<n-tooltip>
					<span>点击可以切换科室【当前所在科室】</span>
					<template #trigger>
						<span class="navbar-org" :style="{ color: handleTextColor }" @click="selectADepartment"
							>{{ userInfo.departName }} <n-icon size="15" style="margin-left: 5px"> <ChevronDown /> </n-icon
						></span>
					</template>
				</n-tooltip>
			</li>
			<li class="right-side">
				<span style="margin-left: 5px" :style="{ color: handleTextColor }">{{ userInfo.name }}</span>
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
					<span>版本发布记录</span>
					<template #trigger>
						<n-button :color="theme === 'dark' ? undefined : '#fff'" class="nav-btn" circle size="small" @click="handleVersion">
							<template #icon>
								<svg
									t="1699494877456"
									class="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="12678"
									width="200"
									height="200"
								>
									<path
										d="M782.848 728.576m-185.856 0a185.856 185.856 0 1 0 371.712 0 185.856 185.856 0 1 0-371.712 0Z"
										fill="#FFE200"
										p-id="12679"
									></path>
									<path
										d="M194.56 166.4H128c-16.896 0-30.72-13.824-30.72-30.72s13.824-30.72 30.72-30.72h66.56c16.896 0 30.72 13.824 30.72 30.72s-13.824 30.72-30.72 30.72z"
										fill="#FFE200"
										p-id="12680"
									></path>
									<path
										d="M301.056 856.576c-5.632 0-11.264-1.536-16.896-5.12-10.752-7.168-21.504-14.336-31.232-22.528-16.384-12.8-31.744-27.136-46.08-42.496-11.776-12.288-10.752-31.744 1.536-43.52s31.744-10.752 43.52 1.536c12.288 12.8 25.088 25.088 39.424 35.84 8.704 6.656 17.408 13.312 26.624 18.944 14.336 9.216 18.432 28.16 9.216 42.496-6.144 9.728-15.872 14.848-26.112 14.848zM507.904 917.504c-30.72 0-61.44-3.584-91.648-10.24-15.36-3.584-30.72-7.68-45.056-13.312-15.872-5.632-24.576-23.04-18.944-39.424 5.632-15.872 23.04-24.576 39.424-18.944 12.8 4.608 25.6 8.192 38.4 11.264 25.6 5.632 51.712 8.704 77.824 8.704 16.896 0 30.72 13.824 30.72 30.72s-13.824 31.232-30.72 31.232zM596.992 907.264c-13.824 0-26.624-9.728-29.696-23.552-4.096-16.384 6.144-33.28 22.528-36.864 20.48-4.608 39.936-11.776 59.392-19.968 45.568-19.968 87.04-50.176 120.32-87.552 57.344-64 88.576-146.944 88.576-232.96 0-51.2-10.752-100.864-32.256-146.944-7.168-15.36-0.512-33.792 14.848-40.96 15.36-7.168 33.792-0.512 40.96 14.848 25.088 54.272 37.888 112.64 37.888 173.056 0 101.376-36.864 198.656-104.448 273.92-38.912 43.52-88.064 79.36-141.312 102.912-22.528 9.728-46.08 17.92-69.632 23.552-2.56 0-4.608 0.512-7.168 0.512zM164.352 700.928c-11.264 0-22.528-6.656-27.648-17.408-26.624-55.808-39.936-115.2-39.936-177.152 0-67.072 16.384-133.632 47.616-192 43.008-81.408 113.152-146.944 197.632-184.32C394.24 107.008 450.56 95.232 508.416 95.232c79.872 0 156.672 23.04 223.232 66.048 32.256 20.992 61.44 46.08 87.04 75.264 11.264 12.8 9.728 32.256-3.072 43.52s-32.256 9.728-43.52-3.072c-21.504-24.576-46.592-46.592-74.24-64-56.832-36.864-122.368-55.808-189.952-55.808-49.152 0-96.768 10.24-141.312 29.696-71.68 31.744-131.584 87.552-168.448 156.672-26.624 50.176-40.448 106.496-40.448 163.328 0 52.736 11.264 103.424 33.792 150.528 7.168 15.36 1.024 33.792-14.336 40.96-4.096 1.536-8.192 2.56-12.8 2.56z"
										fill="#4E63DD"
										p-id="12681"
									></path>
									<path
										d="M512 739.328c-16.896 0-30.72-13.824-30.72-30.72V495.616c0-16.896 13.824-30.72 30.72-30.72s30.72 13.824 30.72 30.72v212.992c0 16.896-13.824 30.72-30.72 30.72zM470.528 332.8c4.608-25.6 28.672-42.496 54.272-38.4 25.6 4.608 42.496 28.672 38.4 54.272-4.608 25.6-76.288 111.104-62.976 88.576 25.6-45.056-34.304-78.848-29.696-104.448z"
										fill="#4E63DD"
										p-id="12682"
									></path>
								</svg>
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
import { License } from "@vicons/tabler";
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
const userInfo = computed(() => {
	return userStore.userInfo;
});
const { logout } = useUser();
// 全局公共CSS变量
const themeVars = useThemeVars();
const { theme, handleToggleTheme } = useHandleTheme(); // 主题调整
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen(); // 全屏

const headerColor = computed(() => {
	if (appStore.theme === "dark" || appStore.sideTheme === "dark") {
		return themeVars.value.baseColor;
	}
	return themeVars.value.primaryColor;
});

const handleTextColor = computed(() => {
	if (appStore.theme !== "dark" && appStore.sideTheme === "dark") {
		return themeVars.value.textColor2;
	}
	return "#fff";
});
const handleVersion = () => {
	router.push({ name: "systemVersion" });
};

// const title = import.meta.env.VITE_SYSTEM_NAME; // 系统标题
const userHandleOptions = [
	{
		label: "许可证",
		key: "license",
		icon: renderIcon(License)
	},
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
	logout: handleLogout,
	license: () => {
		window.$globleTip.open();
	}
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
	//padding-left: 20px;

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
