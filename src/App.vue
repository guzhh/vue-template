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
import { useAppStore } from "@/store";
import { lighten } from "@/utils";
import GlobalSetting from "@/components/GlobalSetting/index.vue";

const appStore = useAppStore();
const theme = computed(() => (appStore.theme === "dark" ? darkTheme : null));

const themeOverrides = computed(() => {
	const appTheme = appStore.themeColor;
	const lightenStr = lighten(appStore.themeColor, 6);
	const darkStr = lighten(appStore.themeColor, 30);
	if (theme.value === null) {
		return {
			common: {
				bodyColor: "rgb(242,243,245)",
				primaryColor: appTheme,
				primaryColorHover: lightenStr,
				primaryColorPressed: lightenStr,
				successColor: appTheme,
				successColorHover: lightenStr,
				successColorPressed: lightenStr
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
			successColorPressed: lightenStr
		}
	};
});
</script>

<style lang="less"></style>
