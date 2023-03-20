<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
		<n-theme-editor>
			<n-global-style />
			<n-notification-provider>
				<n-message-provider>
					<n-dialog-provider>
						<router-view></router-view>
						<global-setting />
					</n-dialog-provider>
				</n-message-provider>
			</n-notification-provider>
		</n-theme-editor>
	</n-config-provider>
</template>

<script setup>
import { computed } from "vue";
import { zhCN, dateZhCN, NThemeEditor, darkTheme } from "naive-ui";
import useAppStore from "@/store/modules/app";
import { lighten } from "@/utils";
import GlobalSetting from "@/components/GlobalSetting/index.vue";
// import Loading from "@/components/Loading/index";
//
// let $loading = null;
// setTimeout(() => {
// 	$loading = Loading.load("数据加载中");
// 	console.log("---------", $loading);
// }, 3000);
//
// setTimeout(() => {
// 	$loading.close();
// }, 6000);

const appStore = useAppStore();
const theme = computed(() => (appStore.theme === "dark" ? darkTheme : null));

const themeOverrides = computed(() => {
	const appTheme = appStore.themeColor;
	const lightenStr = lighten(appStore.themeColor, 6);
	const darkStr = lighten(appStore.themeColor, 30);
	if (theme.value === null) {
		return {
			common: {
				bodyColor: "#EBEBEB",
				primaryColor: appTheme,
				primaryColorHover: lightenStr,
				primaryColorPressed: lightenStr,
				primaryColorSuppl: appTheme,
				successColor: "#42CC81",
				successColorHover: lighten("#42CC81", 6),
				successColorPressed: lighten("#42CC81", 6),
				successColorSuppl: lighten("#42CC81", 6),
				warningColor: "#FFAD00",
				warningColorHover: lighten("#FFAD00", 6),
				warningColorPressed: lighten("#FFAD00", 6),
				warningColorSuppl: lighten("#FFAD00", 6),
				errorColor: "#FF5B5A",
				errorColorHover: lighten("#FF5B5A", 6),
				errorColorPressed: lighten("#FF5B5A", 6),
				errorColorSuppl: lighten("#FF5B5A", 6),
				textColor1: "#2b2b2e",
				textColor2: "#616266",
				textColor3: "#999999",
				textColorDisabled: "#E0E0E0"
			},
			Menu: {
				itemColorActive: appTheme,
				itemTextColorActive: "#FFFFFF",
				itemIconColorActive: "#FFFFFF"
			}
		};
	}
	return {
		common: {
			bodyColor: "#29292c",
			primaryColor: darkStr,
			primaryColorHover: lightenStr,
			primaryColorPressed: lightenStr,
			successColor: darkStr,
			successColorHover: lightenStr,
			successColorPressed: lightenStr,
			primaryColorSuppl: darkStr
		}
	};
});
</script>

<style lang="less"></style>
