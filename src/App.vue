<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
		<n-theme-editor>
			<n-global-style />
			<n-notification-provider>
				<n-message-provider>
					<n-dialog-provider>
						<globle-tip></globle-tip>
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
import { lighten } from "@/utils";
import useAppStore from "@/store/modules/app";
import GlobalSetting from "@/components/GlobalSetting/index.vue";
import GlobleTip from "@/components/GlobleTip/index.vue";

const appStore = useAppStore();
const theme = computed(() => (appStore.theme === "dark" ? darkTheme : null));

const themeOverrides = computed(() => {
	const appTheme = appStore.themeColor;
	const lightenStr = lighten(appStore.themeColor, 15);
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
				invertedColor: appTheme,
				inputColorDisabled: null,
				textColorDisabled: "#2b2b2e"
			},
			Menu: {
				itemTextColorActive: lightenStr,
				itemTextColorActiveHover: lightenStr,
				itemTextColorChildActive: lightenStr,
				itemTextColorChildActiveHover: lightenStr,
				itemTextColorActiveHorizontal: lightenStr,
				itemTextColorActiveHoverHorizontal: lightenStr,
				itemTextColorChildActiveHorizontal: lightenStr,
				itemTextColorChildActiveHoverHorizontal: lightenStr,
				itemIconColorActive: lightenStr,
				itemIconColorActiveHover: lightenStr,
				itemIconColorChildActive: lightenStr,
				itemIconColorChildActiveHover: lightenStr,
				itemIconColorActiveHorizontal: lightenStr,
				itemIconColorActiveHoverHorizontal: lightenStr,
				itemIconColorChildActiveHorizontal: lightenStr,
				itemIconColorChildActiveHoverHorizontal: lightenStr,
				arrowColorActive: lightenStr,
				arrowColorActiveHover: lightenStr,
				arrowColorChildActive: lightenStr,
				arrowColorChildActiveHover: lightenStr,
				itemColorActiveInverted: lightenStr,
				itemColorActiveHoverInverted: lightenStr,
				itemColorActiveCollapsedInverted: lightenStr,
				groupTextColorInverted: "#fff",
				itemTextColorInverted: "#fff",
				itemIconColorInverted: "#fff",
				itemIconColorCollapsedInverted: "#fff",
				itemTextColorHorizontalInverted: "#fff",
				itemIconColorHorizontalInverted: "#fff",
				arrowColorInverted: "#fff"
			},
			Layout: {
				siderColorInverted: appTheme // "#384CE3",
			},
			Card: {
				borderRadius: "6px",
				paddingSmall: "15px 15px 15px"
			},
			Radio: {
				dotColorDisabled: appTheme,
				textColorDisabled: "#2b2b2e"
			},
			Input: {
				colorDisabled: null
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
