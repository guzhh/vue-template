<template>
	<div class="navbar">
		<div class="left-side">
			<n-space align="center">
				<!--				<n-h5 :style="{ margin: 0, fontSize: '18px' }">{{ title }}</n-h5>-->
				<n-icon
					size="22"
					style="display: flex; align-items: center"
					v-if="appStore.device === 'mobile'"
					@click="toggleDrawerMenu"
				>
					<MenuFoldOutlined />
				</n-icon>
			</n-space>
			<n-breadcrumb>
				<n-breadcrumb-item v-for="item in router.currentRoute.value.matched" :key="item.path">
					<router-link :to="item.path">
						<n-button text v-if="item.path === '/'" size="tiny">
							<template #icon>
								<n-icon>
									<!--                  HomeOutlined-->
									<home-outlined />
									<!--									<component :is="item.meta.icon" />-->
								</n-icon>
							</template>
							首页
						</n-button>
						<n-button text v-else size="tiny">
							<template #icon>
								<n-icon>
									<component :is="item.meta.icon" />
								</n-icon>
							</template>
							{{ item.meta.title }}
						</n-button>
					</router-link>
				</n-breadcrumb-item>
			</n-breadcrumb>
		</div>
		<!--    router.currentRoute.matched-->
		<ul class="right-side">
			<li>
				<n-tooltip>
					<span>点击可以切换机构</span>
					<template #trigger>
						<span class="navbar-org" @click="selectAnInstitution">
							{{ orgData.code ? orgData.name : "未知机构" }} <n-icon size="15" style="margin-left: 5px"> <ChevronDown /> </n-icon
						></span>
						<!--						<n-button circle size="small">-->
						<!--							<template #icon>-->
						<!--								<n-icon>-->
						<!--									<search-outlined />-->
						<!--								</n-icon>-->
						<!--							</template>-->
						<!--						</n-button>-->
					</template>
				</n-tooltip>
			</li>
			<li>
				<n-tooltip>
					<span>{{ theme === "light" ? "点击切换为暗黑模式" : "点击切换为亮色模式" }}</span>
					<template #trigger>
						<n-button class="nav-btn" circle size="small" @click="handleToggleTheme">
							<template #icon>
								<n-icon v-if="theme === 'dark'">
									<moon-sharp />
								</n-icon>
								<n-icon v-else>
									<sunny-outline />
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
						<n-button n-button class="nav-btn" circle size="small" @click="toggleFullScreen">
							<template #icon>
								<n-icon>
									<full-screen-minimize24-regular v-if="isFullscreen" />
									<full-screen-maximize24-regular v-else />
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
						<n-button n-button class="nav-btn" circle size="small" @click="setVisible">
							<template #icon>
								<n-icon>
									<setting-outlined />
								</n-icon>
							</template>
						</n-button>
					</template>
				</n-tooltip>
			</li>
			<li>
				<n-dropdown trigger="click" :options="userHandleOptions" @select="dropdownSelect">
					<n-avatar
						round
						:size="32"
						:style="{ marginRight: '8px', cursor: 'pointer' }"
						src="http://aw.vueadminwork.com/assets/img_avatar.1d4c4a34.gif"
					/>
					<!--          http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png-->
				</n-dropdown>
			</li>
		</ul>
		<org-switch ref="orgSwitchRef"></org-switch>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useThemeVars } from "naive-ui";
import { useFullscreen } from "@vueuse/core";
import { inject, computed, watch, ref } from "vue";
import { SunnyOutline, MoonSharp } from "@vicons/ionicons5";
import { FullScreenMaximize24Regular, FullScreenMinimize24Regular } from "@vicons/fluent";
import { MenuFoldOutlined, SettingOutlined, UserOutlined, ExportOutlined } from "@vicons/antd";
import OrgSwitch from "@/components/OrgSwitch/index.vue";
import { getOrgInfoByCode } from "@/api/system/orgAdmin";
import { useAppStore, useUserStore } from "@/store";
import useHandleTheme from "@/hooks/useHandleTheme";
import { renderIcon } from "@/utils/render";
import useUser from "@/hooks/useUser";

defineOptions({ name: "Navbar" });

const router = useRouter();
const orgSwitchRef = ref();
const appStore = useAppStore();
const userStore = useUserStore();
const { logout } = useUser();
const { theme, handleToggleTheme } = useHandleTheme(); // 主题调整
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen(); // 全屏
const navbarLeftPadding = computed(() => {
	if (!appStore.menu || appStore.hideMenu) {
		return "0px";
	}
	if (appStore.menuCollapse) {
		return `${appStore.menuCollapsedWidth}px`;
	}
	return `${appStore.menuWidth}px`;
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
			getOrgInfoByCode({ orgCode: newValue }).then(res => {
				if (res.success) {
					orgData.value = res.result;
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

// 全局公共CSS变量
const themeVars = useThemeVars();
</script>
<!--borderColor-->
<style scoped lang="less">
.navbar {
	display: flex;
	justify-content: space-between;
	height: 100%;
	background-color: v-bind("themeVars.cardColor");
	border-bottom: 1px solid v-bind("themeVars.borderColor");
	box-sizing: border-box;
	padding-left: v-bind(navbarLeftPadding);
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
